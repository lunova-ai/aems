"use client";

import React, { useMemo } from "react";

export default function HeatmapTooltip({
  visible,
  x,
  y,
  value,
  row,
  col
}: {
  visible: boolean;
  x: number;
  y: number;
  value: number;
  row: string;
  col: string;
}) {
  // ---- Kein Tooltip rendern bei invisible ----
  if (!visible) return null;

  // ---- Einfluss-Label ----
  const pct = (value * 100).toFixed(0);
  const influenceLabel =
    value > 0 ? "verstärkend" : value < 0 ? "dämpfend" : "neutral";

  const colorClass = useMemo(() => {
    if (value > 0.6) return "text-aems-neon";
    if (value > 0.3) return "text-aems-soft";
    if (value < -0.6) return "text-red-400";
    if (value < -0.3) return "text-red-500";
    return "text-gray-200";
  }, [value]);

  // --- SSR/No-window safeguard ---
  const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 2000;
  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 1200;

  // ---- Tooltip Position sicher clampen ----
  const posX = Math.min(x + 20, viewportWidth - 180);
  const posY = Math.min(y + 20, viewportHeight - 90);

  return (
    <div
      className={`
        fixed z-50 pointer-events-none
        px-3 py-2 rounded-lg shadow-xl 
        bg-black/80 backdrop-blur-md 
        border border-aems-neon/40 
        transition-all duration-150 
        opacity-100 translate-y-0 
        animate-fadeIn
      `}
      style={{
        top: posY,
        left: posX,
        maxWidth: 170
      }}
    >
      {/* Titel */}
      <div className="font-semibold text-white mb-1 leading-none">
        {row} → {col}
      </div>

      {/* Einflusswert */}
      <div className={`${colorClass} font-semibold leading-tight`}>
        Einfluss: {pct}%
      </div>

      {/* Qualitatives Label */}
      <div className="text-[11px] text-gray-300 mt-[2px] leading-none">
        ({influenceLabel})
      </div>
    </div>
  );
}

