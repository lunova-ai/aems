// components/executive/CostForecastPanel.tsx
"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";
import { getCostPerMWhSeries, TimePoint } from "@/lib/executive/forecast";

type ChartProps = {
  history: TimePoint[];
  forecast: TimePoint[];
};

function MiniLineChartCost({ history, forecast }: ChartProps) {
  const all = [...history, ...forecast];
  const values = all.map((p) => p.value);

  const min = Math.min(...values);
  const max = Math.max(...values);

  const padding = 10;
  const width = 260;
  const height = 120;

  const scaleX = (idx: number) =>
    padding + (idx / (all.length - 1)) * (width - 2 * padding);

  const scaleY = (val: number) =>
    height - padding - ((val - min) / (max - min || 1)) * (height - 2 * padding);

  const historyPoints = history
    .map((p, i) => `${scaleX(i)},${scaleY(p.value)}`)
    .join(" ");

  const start = history.length - 1;

  const forecastPoints = forecast
    .map((p, i) => `${scaleX(start + i)},${scaleY(p.value)}`)
    .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-32">
      <line
        x1={padding}
        y1={height - padding}
        x2={width - padding}
        y2={height - padding}
        stroke="rgba(255,255,255,0.15)"
        strokeWidth={1}
      />

      <polyline
        points={historyPoints}
        fill="none"
        stroke="#F97373"
        strokeWidth={2}
      />

      <polyline
        points={forecastPoints}
        fill="none"
        stroke="#FDBA74"
        strokeWidth={2}
        strokeDasharray="4 3"
      />
    </svg>
  );
}

export default function CostForecastPanel() {
  const series = getCostPerMWhSeries();

  const last = series.history[series.history.length - 1];
  const forecastLast = series.forecast[series.forecast.length - 1];

  return (
    <AEMSSection title="Kosten pro MWh – Verlauf & Forecast">
      <AEMSCard className="p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <div className="text-xs text-gray-400">Aktueller Wert</div>
            <div className="text-2xl font-bold text-white">
              {last.value}
              <span className="text-sm text-gray-400 ml-1">{series.unit}</span>
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-400">Prognose (3 Perioden)</div>
            <div className="text-xl font-semibold text-red-400">
              {forecastLast.value} {series.unit}
            </div>
          </div>
        </div>

        <MiniLineChartCost history={series.history} forecast={series.forecast} />

        <p className="mt-3 text-xs text-gray-400">
          Diese Kurve zeigt, wie sich deine Energiekosten entwickeln und wohin sie
          sich mit hoher Wahrscheinlichkeit bewegen. Ideal für Budgetplanung &
          Risikomanagement.
        </p>
      </AEMSCard>
    </AEMSSection>
  );
}


