"use client";

import React from "react";

// ✔ Daten aus Mock
import { mockTrend } from "@/lib/mock/dashboardMock";

// ✔ Typ nur als type import, um isolatedModules zu erfüllen
import type { DashboardTrend } from "@/lib/dashboard/dashboardModel";

import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";

import { parseWithGlossaryInline } from "@/lib/glossary/parser";
import { awardXp } from "@/lib/gamification/xp";

export default function DashboardTrend({
  trend = mockTrend,
}: {
  trend?: DashboardTrend;
}) {
  const width = 600;
  const height = 160;
  const padding = 16;

  const values = trend.values;

  const minValue = Math.min(
    ...values,
    ...trend.uncertaintyBand.map(([l]) => l)
  );

  const maxValue = Math.max(
    ...values,
    ...trend.uncertaintyBand.map(([, u]) => u)
  );

  const xForIndex = (i: number) =>
    padding +
    ((width - 2 * padding) * i) / Math.max(1, values.length - 1);

  const yForValue = (v: number) =>
    height -
    padding -
    ((height - 2 * padding) * (v - minValue)) /
      (maxValue - minValue || 1);

  const linePath = values
    .map((v, i) => `${i === 0 ? "M" : "L"} ${xForIndex(i)} ${yForValue(v)}`)
    .join(" ");

  const bandPath = (() => {
    const upper = trend.uncertaintyBand.map(([, u], i) => [
      xForIndex(i),
      yForValue(u),
    ]);

    const lower = trend.uncertaintyBand
      .map(([l], i) => [xForIndex(i), yForValue(l)])
      .reverse();

    return `M ${[...upper, ...lower]
      .map(([x, y]) => `${x} ${y}`)
      .join(" L ")} Z`;
  })();

  return (
    <AEMSSection title="Entwicklung des Systemzustands (30 Tage)">
      <AEMSCard className="overflow-visible">
        <div
          className="flex flex-col gap-4 cursor-pointer"
          onClick={() => awardXp("trend_view")}
        >
          {/* SVG Container */}
          <div className="w-full overflow-x-auto overflow-visible">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-40 select-none"
            >
              {/* Unsicherheitsband */}
              <path d={bandPath} className="fill-aems-soft/15" />

              {/* Trendlinie */}
              <path
                d={linePath}
                className="stroke-aems-neon"
                strokeWidth={2}
                fill="none"
              />

              {/* Schockereignisse */}
              {trend.shocks.map((index) =>
                values[index] !== undefined ? (
                  <circle
                    key={index}
                    cx={xForIndex(index)}
                    cy={yForValue(values[index])}
                    r={4}
                    className="fill-red-500"
                  />
                ) : null
              )}
            </svg>
          </div>

          {/* Beschreibung */}
          <p className="text-sm text-gray-300 leading-relaxed">
            {parseWithGlossaryInline(
              "Linie: Trend • Fläche: Unsicherheit • Rot: Schockereignisse"
            )}
          </p>
        </div>
      </AEMSCard>
    </AEMSSection>
  );
}



