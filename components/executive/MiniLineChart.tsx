"use client";

import React from "react";

export type TimePoint = {
  value: number;
  timestamp?: string | number;
};

type MiniLineChartProps = {
  history: TimePoint[];
  forecast?: TimePoint[];
  colorHistory?: string;
  colorForecast?: string;
  width?: number;
  height?: number;
};

export default function MiniLineChart({
  history,
  forecast = [],
  colorHistory = "#00E7B3",
  colorForecast = "#12C7A5",
  width = 260,
  height = 120,
}: MiniLineChartProps) {
  // --- Fallback: wenn es keine Daten gibt ---
  if (!history.length) {
    return (
      <div className="text-xs text-gray-500">
        Keine Daten verfügbar.
      </div>
    );
  }

  const padding = 10;

  const all = [...history, ...forecast];
  const values = all.map((p) => p.value);

  const min = Math.min(...values);
  const max = Math.max(...values);

  const scaleX = (idx: number, total: number) =>
    padding + (idx / Math.max(1, total - 1)) * (width - 2 * padding);

  const scaleY = (v: number) =>
    height -
    padding -
    ((v - min) / Math.max(1, max - min)) * (height - 2 * padding);

  // --- HISTORY PATH ---
  const historyPoints = history
    .map((p, i) => `${scaleX(i, history.length)},${scaleY(p.value)}`)
    .join(" ");

  // --- FORECAST PATH ---
  const startIndex = history.length - 1;

  const forecastPoints = forecast
    .map((p, i) => `${scaleX(startIndex + i, all.length)},${scaleY(p.value)}`)
    .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-32">
      {/* AXIS */}
      <line
        x1={padding}
        y1={height - padding}
        x2={width - padding}
        y2={height - padding}
        stroke="rgba(255,255,255,0.15)"
        strokeWidth={1}
      />

      {/* HISTORY */}
      <polyline
        points={historyPoints}
        fill="none"
        stroke={colorHistory}
        strokeWidth={2}
      />

      {/* FORECAST */}
      {forecast.length > 0 && (
        <polyline
          points={forecastPoints}
          fill="none"
          stroke={colorForecast}
          strokeWidth={2}
          strokeDasharray="4 3"
        />
      )}
    </svg>
  );
}
