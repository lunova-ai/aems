"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";
import ProgressRing from "@/components/ProgressRing";

type ForecastPoint = {
  label: string;
  value: number;
};

const history: ForecastPoint[] = [
  { label: "T-6", value: 176 },
  { label: "T-5", value: 178 },
  { label: "T-4", value: 181 },
  { label: "T-3", value: 183 },
  { label: "T-2", value: 185 },
  { label: "T-1", value: 187 },
  { label: "T0", value: 188 },
];

const forecast: ForecastPoint[] = [
  { label: "T+1", value: 189 },
  { label: "T+2", value: 191 },
  { label: "T+3", value: 193 },
];

export default function SmartForecastEngine() {
  const confidence = 0.56;

  const all = [...history, ...forecast];
  const min = Math.min(...all.map((p) => p.value));
  const max = Math.max(...all.map((p) => p.value));
  const width = 260;
  const height = 80;
  const padding = 10;

  const scaleX = (idx: number) =>
    padding + (idx / (all.length - 1)) * (width - 2 * padding);
  const scaleY = (val: number) =>
    height - padding - ((val - min) / (max - min || 1)) * (height - 2 * padding);

  const historyPoints = history
    .map((p, i) => `${scaleX(i)},${scaleY(p.value)}`)
    .join(" ");

  const forecastOffset = history.length - 1;
  const forecastPoints = forecast
    .map((p, i) => `${scaleX(forecastOffset + i)},${scaleY(p.value)}`)
    .join(" ");

  return (
    <AEMSSection title="Smart Forecast Engine – Kurzfristige Erwartung">
      <AEMSCard className="p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-xs text-gray-400 mb-1">
              Kurzfristiger Kostenverlauf (Strom/Gas gemischt, €/MWh)
            </div>
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full md:w-80 h-20 bg-white/5 rounded-lg"
            >
              <line
                x1={padding}
                y1={height - padding}
                x2={width - padding}
                y2={height - padding}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth={1}
              />
              <polyline
                points={historyPoints}
                fill="none"
                stroke="#00E7B3"
                strokeWidth={2}
              />
              <polyline
                points={forecastPoints}
                fill="none"
                stroke="#F97373"
                strokeWidth={2}
                strokeDasharray="4 3"
              />
            </svg>
          </div>
          <div className="flex items-center gap-4">
            <ProgressRing
              value={confidence * 100}
              size={70}
              strokeWidth={8}
              color="#12C7A5"
            />
            <div className="text-xs text-gray-300">
              <div className="font-semibold text-white mb-1">
                Modell-Confidence: {(confidence * 100).toFixed(0)}%
              </div>
              <p>
                Die Prognose basiert auf historischen Mustern, Volatilität und
                aktuellen Rahmenbedingungen. Geringe Confidence = Szenarien genauer prüfen.
              </p>
            </div>
          </div>
        </div>
      </AEMSCard>
    </AEMSSection>
  );
}
