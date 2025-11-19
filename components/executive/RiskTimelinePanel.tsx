// components/executive/RiskTimelinePanel.tsx
"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";
import { getRiskIndexSeries, TimePoint } from "@/lib/executive/forecast";

type ChartProps = {
  history: TimePoint[];
};

function MiniRiskArea({ history }: ChartProps) {
  const values = history.map((p) => p.value);

  const min = Math.min(...values);
  const max = Math.max(...values);

  const padding = 10;
  const width = 260;
  const height = 120;

  const scaleX = (idx: number) =>
    padding + (idx / (history.length - 1)) * (width - 2 * padding);

  const scaleY = (val: number) =>
    height - padding - ((val - min) / (max - min || 1)) * (height - 2 * padding);

  const points = history
    .map((p, i) => `${scaleX(i)},${scaleY(p.value)}`)
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
        points={points}
        fill="none"
        stroke="#FACC15"
        strokeWidth={2}
      />
    </svg>
  );
}

export default function RiskTimelinePanel() {
  const series = getRiskIndexSeries();
  const last = series.history[series.history.length - 1];

  return (
    <AEMSSection title="Risikoindex – Entwicklung">
      <AEMSCard className="p-5">
        <div className="mb-4">
          <div className="text-xs text-gray-400">Aktueller Risikoindex</div>
          <div className="text-2xl font-bold text-yellow-300">
            {last.value}
            <span className="text-sm text-gray-400 ml-1">{series.unit}</span>
          </div>
        </div>

        <MiniRiskArea history={series.history} />

        <p className="mt-3 text-xs text-gray-400">
          Der Risikoindex bündelt wesentliche Risikofaktoren. Eine steigende Linie
          ist ein klares Signal für operative Anpassungsmaßnahmen und strategische
          Resilienzsteigerung.
        </p>
      </AEMSCard>
    </AEMSSection>
  );
}
