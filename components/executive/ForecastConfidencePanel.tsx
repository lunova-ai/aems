"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";
import ProgressRing from "@/components/ProgressRing";
import { parseWithGlossaryInline } from "@/lib/glossary/parser";

/* ----------------------------------------------------------
 * Forecast Confidence 2.0 – Logik
 * ---------------------------------------------------------- */
type ForecastStats = {
  modelConfidence: number;   // 0–1
  volatilityPenalty: number; // 0–1
  historyFit: number;        // 0–1
  trend: "up" | "down" | "stable";
};

function computeForecastStats(): ForecastStats {
  // Beispielhafte Inputs – später aus Forecast-Modell ersetzbar
  const modelConfidence = 0.68;
  const volatilityPenalty = 0.22;
  const historyFit = 0.74;

  // Trendindikator
  const trend =
    modelConfidence - volatilityPenalty + historyFit / 2 > 1.0
      ? "up"
      : modelConfidence < 0.5
      ? "down"
      : "stable";

  return { modelConfidence, volatilityPenalty, historyFit, trend };
}

/* ----------------------------------------------------------
 * Hilfsfunktionen
 * ---------------------------------------------------------- */
function computeOverallConfidence(stats: ForecastStats): number {
  const base =
    stats.modelConfidence * 0.6 +
    stats.historyFit * 0.3 -
    stats.volatilityPenalty * 0.4;

  return Math.min(1, Math.max(0, base));
}

function getTrendIcon(t: ForecastStats["trend"]) {
  return t === "up" ? "▲" : t === "down" ? "▼" : "●";
}

function getColor(percent: number) {
  if (percent >= 70) return "text-aems-neon";
  if (percent >= 40) return "text-yellow-300";
  return "text-red-400";
}

/* ----------------------------------------------------------
 * PANEL
 * ---------------------------------------------------------- */
export default function ForecastConfidencePanel() {
  const stats = computeForecastStats();
  const overall = computeOverallConfidence(stats);

  const percent = Math.round(overall * 100);
  const color = getColor(percent);

  return (
    <AEMSSection title="Forecast Confidence 2.0">
      <AEMSCard
        className="
          p-6 flex flex-col gap-5
          hover:scale-[1.01] transition-transform
        "
        aria-label="Forecast Confidence Panel"
      >
        {/* --------------------------------------- */}
        {/* TOP: Ring + Wert + Trend                 */}
        {/* --------------------------------------- */}
        <div className="flex items-center gap-6">
          <ProgressRing
            value={percent}
            size={70}
            strokeWidth={6}
            color="#12C7A5"
            aria-label={`Prognosegenauigkeit: ${percent}%`}
          />

          <div className="flex flex-col">
            <div className={`text-3xl font-bold ${color}`}>
              {percent}%
              <span className="ml-2 text-sm opacity-75">
                {getTrendIcon(stats.trend)}
              </span>
            </div>
            <div className="text-xs text-gray-400">
              {parseWithGlossaryInline(
                "Modellvertrauen unter Berücksichtigung historischer Passgenauigkeit und Marktvolatilität."
              )}
            </div>
          </div>
        </div>

        {/* --------------------------------------- */}
        {/* Breakdown Metrics                        */}
        {/* --------------------------------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
          {/* Modellvertrauen */}
          <div className="rounded-xl bg-white/5 p-4 border border-white/10">
            <div className="text-xs text-gray-400">Modell-Confidence</div>
            <div className="text-lg font-semibold text-white">
              {(stats.modelConfidence * 100).toFixed(0)}%
            </div>
          </div>

          {/* Historische Passgenauigkeit */}
          <div className="rounded-xl bg-white/5 p-4 border border-white/10">
            <div className="text-xs text-gray-400">History Fit</div>
            <div className="text-lg font-semibold text-white">
              {(stats.historyFit * 100).toFixed(0)}%
            </div>
          </div>

          {/* Volatilitäts-Abschlag */}
          <div className="rounded-xl bg-white/5 p-4 border border-white/10">
            <div className="text-xs text-gray-400">Volatility Penalty</div>
            <div className="text-lg font-semibold text-red-400">
              −{(stats.volatilityPenalty * 100).toFixed(0)}%
            </div>
          </div>
        </div>

        {/* --------------------------------------- */}
        {/* Erklärung / Glossar                      */}
        {/* --------------------------------------- */}
        <div className="pt-4 text-xs text-gray-400 leading-relaxed">
          {parseWithGlossaryInline(
            "Ein hoher Confidence-Wert bedeutet, dass das Prognosemodell stabile Muster aus der Vergangenheit zuverlässig reproduziert und die aktuelle Marktvolatilität gering ist."
          )}
        </div>
      </AEMSCard>
    </AEMSSection>
  );
}
