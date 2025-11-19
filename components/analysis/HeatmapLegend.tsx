"use client";

import React, { useState } from "react";

export default function HeatmapLegend() {
  const [hover, setHover] = useState<"neg" | "mid" | "pos" | null>(null);

  const showTooltip = hover !== null;

  return (
    <div className="relative mt-6 select-none" role="presentation">

      {/* Tooltip */}
      <div
        className={`
          absolute -top-20 left-1/2 -translate-x-1/2 
          w-64 p-3 rounded-xl z-50 pointer-events-none
          bg-black/85 backdrop-blur-md 
          border border-aems-neon/40 shadow-lg
          text-sm text-gray-200 transition-all duration-200
          ${showTooltip ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
        `}
        aria-hidden={!showTooltip}
      >
        {hover === "neg" && (
          <>
            <strong className="text-aems-neon">Negativer Einfluss</strong>
            <p className="text-xs text-gray-400 mt-1">
              Werte unter 0 bedeuten gegenläufige oder dämpfende Effekte.
            </p>
          </>
        )}

        {hover === "mid" && (
          <>
            <strong className="text-aems-neon">Neutral / schwach</strong>
            <p className="text-xs text-gray-400 mt-1">
              Im Übergangsbereich wirken Faktoren nur moderat oder kaum.
            </p>
          </>
        )}

        {hover === "pos" && (
          <>
            <strong className="text-aems-neon">Positiver Einfluss</strong>
            <p className="text-xs text-gray-400 mt-1">
              Hohe Werte bedeuten verstärkende Effekte — Faktoren steigen gemeinsam.
            </p>
          </>
        )}
      </div>

      {/* LEGEND */}
      <div className="flex items-center gap-3">

        {/* NEGATIV */}
        <span
          className="text-gray-300 text-xs cursor-help"
          onMouseEnter={() => setHover("neg")}
          onMouseLeave={() => setHover(null)}
          onTouchStart={() => setHover("neg")}
        >
          negativ
        </span>

        {/* GRADIENT */}
        <div
          className="
            flex-1 h-3 rounded-full shadow-inner cursor-help relative
            bg-gradient-to-r from-red-600 via-aems-soft to-aems-neon
          "
          onMouseEnter={() => setHover("mid")}
          onMouseLeave={() => setHover(null)}
          onTouchStart={() => setHover("mid")}
        >
          {/* Mittel-Markierung */}
          <div className="absolute left-1/2 top-0 h-full w-[2px] bg-white/40" />
        </div>

        {/* POSITIV */}
        <span
          className="text-gray-300 text-xs cursor-help"
          onMouseEnter={() => setHover("pos")}
          onMouseLeave={() => setHover(null)}
          onTouchStart={() => setHover("pos")}
        >
          positiv
        </span>
      </div>
    </div>
  );
}
