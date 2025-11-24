"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";
import MiniLineChart from "@/components/executive/MiniLineChart";
import { getCostPerMWhSeries } from "@/lib/executive/forecast";
import { awardXp } from "@/lib/gamification/xp";
import { parseWithGlossaryInline } from "@/lib/glossary/parser";

export default function CostForecastPanel() {
  const series = getCostPerMWhSeries();

  const last = series.history.at(-1) ?? null;
  const forecastLast = series.forecast.at(-1) ?? null;

  return (
    <AEMSSection title="Kosten pro MWh – Verlauf & Forecast">
      <AEMSCard className="p-5" onClick={() => awardXp("costforecast_open")}>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">

          <div>
            <div className="text-xs text-gray-400">Aktueller Wert</div>
            <div className="text-2xl font-bold text-white">
              {last?.value ?? "–"} {series.unit}
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-400">Prognose (3 Perioden)</div>
            <div className="text-xl font-semibold text-red-400">
              {forecastLast?.value ?? "–"} {series.unit}
            </div>
          </div>

        </div>

        <MiniLineChart
          history={series.history}
          forecast={series.forecast}
          colorHistory="#F87171"
          colorForecast="#FDBA74"
        />

        <p className="mt-3 text-xs text-gray-400">
          {parseWithGlossaryInline(
            "Zeigt die historische Preisentwicklung und eine kurzfristige Prognose – wichtig für Budgetplanung & Risikomanagement."
          )}
        </p>

      </AEMSCard>
    </AEMSSection>
  );
}



