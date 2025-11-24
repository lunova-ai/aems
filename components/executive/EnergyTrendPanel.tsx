"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";
import MiniLineChart from "@/components/executive/MiniLineChart";
import { getEnergyTrendSeries } from "@/lib/executive/energyTrend";
import { awardXp } from "@/lib/gamification/xp";
import { parseWithGlossaryInline } from "@/lib/glossary/parser";

export default function EnergyTrendPanel() {
  const series = getEnergyTrendSeries();

  const last = series.history.at(-1) ?? null;
  const forecastLast = series.forecast.at(-1) ?? null;

  return (
    <AEMSSection title="Energieverbrauch – Verlauf & Forecast">
      <AEMSCard
        className="p-5 cursor-pointer"
        onClick={() => awardXp("executive_view")}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          {/* Aktueller Wert */}
          <div>
            <div className="text-xs text-gray-400">Aktueller Wert</div>
            <div className="text-2xl font-bold text-white">
              {last?.value ?? "–"} {series.unit}
            </div>
          </div>

          {/* Prognose */}
          <div>
            <div className="text-xs text-gray-400">Prognose (3 Perioden)</div>
            <div className="text-xl font-semibold text-aems-neon">
              {forecastLast?.value ?? "–"} {series.unit}
            </div>
          </div>
        </div>

        <MiniLineChart
          history={series.history}
          forecast={series.forecast}
          colorHistory="#38BDF8"
          colorForecast="#7DD3FC"
        />

        <p className="mt-3 text-xs text-gray-400">
          {parseWithGlossaryInline(
            "Zeigt den historischen Energieverbrauch und die erwartete Entwicklung auf Basis aktueller Muster."
          )}
        </p>
      </AEMSCard>
    </AEMSSection>
  );
}


