"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";

import { rootCauseTree, RootCauseNode } from "@/lib/analysis/rootCause";
import { parseWithGlossaryInline } from "@/lib/glossary/parser";
import { awardXp } from "@/lib/gamification/xp";

/* ---------------------------------------------------------
 * KNOTENFARBEN – visuelle Kodierung nach Einflussstärke
 * --------------------------------------------------------- */
function getNodeColor(v: number) {
  if (v > 0.6) return "#00E7B3";      // stark
  if (v > 0.3) return "#12C7A5";      // mittel
  return "rgba(255,255,255,0.4)";     // schwach
}

type NodeItemProps = {
  node: RootCauseNode;
  depth: number;
  path: string;
};

/* ---------------------------------------------------------
 * NODE ITEM – Ein einzelner Knoten im Hierarchie-Baum
 * --------------------------------------------------------- */
function NodeItem({ node, depth, path }: NodeItemProps) {
  const [hover, setHover] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const hasChildren = node.children.length > 0;
  const color = getNodeColor(node.value);

  const toggleExpand = useCallback(() => {
    if (hasChildren) setExpanded((prev) => !prev);
  }, [hasChildren]);

  const handleClick = useCallback(() => {
    awardXp("rootcause_node_click");
  }, []);

  /* Keyboard Support: ENTER / SPACE toggeln */
  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
      toggleExpand();
    }
  };

  return (
    <div className="mb-2" role="treeitem" aria-level={depth + 1}>
      {/* ----- HOVER ROW ----- */}
      <div
        className="
          flex items-center gap-3 group cursor-pointer 
          px-2 py-1 rounded-lg transition relative
          focus:outline-none focus:ring-2 focus:ring-aems-neon/40
        "
        style={{ marginLeft: depth * 20 }}
        onClick={handleClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-expanded={hasChildren ? expanded : undefined}
        aria-label={`${node.name} – ${(node.value * 100).toFixed(0)}% Einfluss`}
      >

        {/* Expand Button */}
        {hasChildren ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand();
            }}
            className="
              w-4 h-4 flex items-center justify-center
              text-xs text-gray-400 hover:text-aems-neon transition
              focus:outline-none
            "
            aria-label={expanded ? "Einklappen" : "Ausklappen"}
          >
            {expanded ? "▾" : "▸"}
          </button>
        ) : (
          <div className="w-4" />
        )}

        {/* Circle */}
        <div
          className="w-3 h-3 rounded-full shrink-0"
          style={{ background: color }}
        />

        {/* Label */}
        <span className="text-white text-sm group-hover:text-aems-neon transition">
          {parseWithGlossaryInline(node.name)}
          <span className="text-gray-500 text-xs ml-1">
            ({(node.value * 100).toFixed(0)}%)
          </span>
        </span>

        {/* Tooltip */}
        {hover && (
          <div
            className="
              absolute left-6 top-7 z-40 w-72 p-3
              rounded-xl bg-black/80 backdrop-blur-md 
              border border-aems-neon/30 
              text-gray-200 text-sm shadow-xl animate-fadeIn
            "
          >
            <div className="text-aems-neon font-semibold mb-1">
              {parseWithGlossaryInline(node.name)}
            </div>

            <div className="text-gray-300">
              Einflussstärke:{" "}
              <strong className="text-white">
                {(node.value * 100).toFixed(0)}%
              </strong>
            </div>

            <div className="text-[11px] text-gray-400 mt-1">
              Dieser Faktor wirkt direkt oder indirekt im Systemzusammenhang.
            </div>

            <Link
              href={`/analysis?focus=${encodeURIComponent(node.name)}`}
              className="text-aems-neon underline text-xs mt-2 inline-block"
            >
              Mehr in der Analyse anzeigen →
            </Link>
          </div>
        )}
      </div>

      {/* ----- CHILDREN ----- */}
      {hasChildren && expanded && (
        <div>
          {node.children.map((child, index) => (
            <NodeItem
              key={`${path}/${index}-${child.name}`}
              node={child}
              depth={depth + 1}
              path={`${path}/${index}-${child.name}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------
 * ROOT COMPONENT
 * --------------------------------------------------------- */
export default function RootCauseHierarchicalTree() {
  return (
    <div className="py-4" role="tree">
      <NodeItem node={rootCauseTree} depth={0} path={rootCauseTree.name} />
    </div>
  );
}


