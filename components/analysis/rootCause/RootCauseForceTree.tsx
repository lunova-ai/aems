"use client";

import React, { useRef, useEffect, useState } from "react";
import { rootCauseTree, RootCauseNode } from "@/lib/analysis/rootCause";
import { parseWithGlossaryInline } from "@/lib/glossary/parser";
import { awardXp } from "@/lib/gamification/xp";

// ---------- TYPES ----------
type Node = {
  id: string;
  value: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  children: Node[];
};

// ---------- TREE FLATTEN ----------
function flattenTree(root: RootCauseNode): Node[] {
  const nodes: Node[] = [];

  function walk(node: RootCauseNode, parent: Node | null) {
    const n: Node = {
      id: node.name,
      value: node.value,
      x: Math.random() * 400 + 200,
      y: Math.random() * 200 + 100,
      vx: 0,
      vy: 0,
      children: []
    };

    nodes.push(n);
    if (parent) parent.children.push(n);

    node.children.forEach((c) => walk(c, n));
  }

  walk(root, null);
  return nodes;
}

export default function RootCauseForceTree() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | null>(null);

  // feste Node-Struktur
  const [nodes] = useState<Node[]>(() => flattenTree(rootCauseTree));

  // aktueller Hover-Node (für Tooltip in React)
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  // ID im Canvas-Loop (damit Animations-Effect nicht bei jedem Hover neu startet)
  const hoveredIdRef = useRef<string | null>(null);

  // ---------- ANIMATION ----------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const repelForce = 0.015;
    const linkForce = 0.025;

    function step() {
      // PHYSICS — REPULSION + LINK ATTRACTION
      nodes.forEach((a) => {
        nodes.forEach((b) => {
          if (a === b) return;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy) + 0.001;

          a.vx += (dx / dist) * (repelForce / dist);
          a.vy += (dy / dist) * (repelForce / dist);
        });

        a.children.forEach((c) => {
          const dx = c.x - a.x;
          const dy = c.y - a.y;

          a.vx += dx * linkForce;
          a.vy += dy * linkForce;

          c.vx -= dx * linkForce;
          c.vy -= dy * linkForce;
        });
      });

      // MOVE
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.vx *= 0.88;
        n.vy *= 0.88;

        // Canvas boundaries
        n.x = Math.max(30, Math.min(width - 30, n.x));
        n.y = Math.max(30, Math.min(height - 30, n.y));
      });

      // RENDER
      ctx.clearRect(0, 0, width, height);

      // LINKS
      nodes.forEach((n) => {
        n.children.forEach((c) => {
          ctx.strokeStyle = "rgba(0, 231, 179, 0.25)";
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(c.x, c.y);
          ctx.stroke();
        });
      });

      // NODES
      nodes.forEach((n) => {
        const size = 10 + n.value * 16;
        const isHovered = hoveredIdRef.current === n.id;

        ctx.beginPath();
        ctx.arc(n.x, n.y, size, 0, Math.PI * 2);

        ctx.fillStyle = isHovered
          ? "#00E7B3"
          : n.value > 0.6
          ? "#00E7B3"
          : n.value > 0.3
          ? "#12C7A5"
          : "rgba(255,255,255,0.4)";

        ctx.fill();

        // Label
        ctx.fillStyle = "white";
        ctx.font = "11px sans-serif";
        ctx.fillText(n.id, n.x + size + 4, n.y + 4);
      });

      frameRef.current = requestAnimationFrame(step);
    }

    frameRef.current = requestAnimationFrame(step);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [nodes]);

  // ---------- HOVER ----------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function handleMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      let found: Node | null = null;

      nodes.forEach((n) => {
        const size = 10 + n.value * 16;
        const dx = mx - n.x;
        const dy = my - n.y;
        if (dx * dx + dy * dy <= size * size) {
          found = n;
        }
      });

      if (found) {
        if (hoveredIdRef.current !== found.id) {
          hoveredIdRef.current = found.id;
          setHoveredNode(found);
          awardXp("rootcause_node_hover");
        }
      } else if (hoveredIdRef.current) {
        hoveredIdRef.current = null;
        setHoveredNode(null);
      }
    }

    canvas.addEventListener("mousemove", handleMove);
    return () => canvas.removeEventListener("mousemove", handleMove);
  }, [nodes]);

  // ---------- RENDER ----------
  return (
    <div className="relative flex justify-center">

      {/* Tooltip */}
      {hoveredNode && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 px-4 py-3 rounded-xl bg-black/80 border border-aems-neon/40 text-sm text-gray-200 backdrop-blur-md shadow-xl z-20">
          <div className="font-semibold text-aems-neon mb-1">
            {parseWithGlossaryInline(hoveredNode.id)}
          </div>
          <div>
            Einflussstärke:{" "}
            <span className="text-white font-bold">
              {(hoveredNode.value * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      )}

      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="bg-white/5 rounded-xl border border-white/10"
      />
    </div>
  );
}

