// components/executive/RiskTimelinePanel.tsx
"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";
import { getRiskIndexSeries, TimePoint } from "@/lib/executive/forecast";
import { awardXp } from "@/lib/gamification/xp";
import { parseWithGlossaryInline } from "@/lib/glossary/parser";

type ChartProps = {
  history: TimePoint[];
};

function MiniRiskArea({ history }: ChartProps) {
  const values = history.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);

  const padding = 12;
  const width = 280;
  const height = 120;

  const scaleX = (i: number) =>
    padding + (i / Math.max(1, history.length - 1)) * (width - 2 * padding);

  const scaleY = (v: number) =>
    height -
    padding -
    ((v - min) / (max - min || 1)) * (height - 2 * padding);

  // Generate Line + Area Path
  const line = history
    .map((p, i) => `${i === 0 ? "M" : "L"} ${scaleX(i)} ${scaleY(p.value)}`)
    .join(" ");

  const area =
    line +
    ` L ${scaleX(history.length - 1)} ${height - padding}` +
    ` L ${scaleX(0)} ${height - padding} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-32 select-none">
      {/* X-Axis */}
      <line
        x1={padding}
        y1={height - padding}
        x2={width - padding}
        y2={height - padding}
        stroke="rgba(255,255,255,0.15)"
        strokeWidth={1}
      />

      {/* Area */}
      <path d={area} fill="rgba(251,191,36,0.15)" />

      {/* Line */}
      <path d={line} stroke="#FACC15" strokeWidth={2} fill="none" />
    </svg>
  );
}

export default function RiskTimelinePanel() {
  const series = getRiskIndexSeries();

  const last = series.history.at(-1) ?? {
    value: 0,
  };

  const percentLabel = `${last.value}${series.unit || "%"}`;

  const textColor =
    last.value >= 70 ? "text-red-400" :
    last.value >= 40 ? "text-yellow-300" :
    "text-aems-neon";

  return (
    <AEMSSection title="Risikoindex – Entwicklung">
      <AEMSCard
        className="p-5 hover:scale-[1.01] transition-transform cursor-pointer"
        onClick={() => awardXp("executive_risk_timeline_open")}
        aria-label="Risikoindex Verlauf öffnen"
      >
        {/* Current Risk */}
        <div className="mb-4">
          <div className="text-xs text-gray-400">Aktueller Risikoindex</div>
          <div className={`text-2xl font-bold ${textColor}`}>
            {percentLabel}
          </div>
        </div>

        {/* Chart */}
        <MiniRiskArea history={series.history} />

        {/* Explanation */}
        <p className="mt-3 text-xs text-gray-300 leading-relaxed">
          {parseWithGlossaryInline(
            "Der Risikoindex zeigt die zeitliche Entwicklung zentraler Belastungsfaktoren. Eine steigende Kurve signalisiert erhöhten Handlungsbedarf in Beschaffung, Lastmanagement oder CO₂-Optimierung."
          )}
        </p>

        {/* Executive Callout */}
        <div className="text-[10px] text-aems-soft mt-2">
          {parseWithGlossaryInline("Tipp: Nutze den Forecast oder starte eine Simulation zur Risikoabsicherung.")}
        </div>
      </AEMSCard>
    </AEMSSection>
  );
}
