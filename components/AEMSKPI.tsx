"use client";

import React, { useState } from "react";

export default function AEMSKPI({
  label,
  value,
  status,
  trend,          // optional: "up" | "down" | "stable"
  info,           // optional: Tooltip-Text
}: {
  label: string;
  value: number;
  status?: string;
  trend?: "up" | "down" | "stable";
  info?: string;
}) {
  const [hover, setHover] = useState(false);

  // Farbskala für Werte
  const getColor = (v: number) => {
    if (v >= 70) return "text-aems-neon";        // gut
    if (v >= 40) return "text-yellow-400";        // mittel
    return "text-red-400";                        // kritisch
  };

  const trendIcons: Record<string, string> = {
    up: "▲",
    down: "▼",
    stable: "●",
  };

  return (
    <div
      className="flex flex-col gap-2 relative cursor-default"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Label */}
      <span className="text-sm text-gray-300">{label}</span>

      {/* Wert & Trend */}
      <span className={`text-4xl font-bold ${getColor(value)}`}>
        {value}%
        {trend && (
          <span
            className="ml-2 text-sm opacity-80"
            aria-label="Trendindikator"
          >
            {trendIcons[trend]}
          </span>
        )}
      </span>

      {/* Status */}
      {status && (
        <span className="text-xs uppercase tracking-wide text-gray-400">
          {status}
        </span>
      )}

      {/* Tooltip */}
      {hover && info && (
        <div
          className="
            absolute left-0 top-12 z-40 
            px-3 py-2 w-56
            rounded-xl bg-black/80 backdrop-blur-md 
            border border-aems-neon/30 shadow-xl 
            text-xs text-gray-200 animate-fadeIn
          "
        >
          {info}
        </div>
      )}
    </div>
  );
}
