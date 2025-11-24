"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";

import { parseWithGlossaryInline } from "@/lib/glossary/parser";
import { awardXp } from "@/lib/gamification/xp";

import {
  ExecutiveMetrics,
  generateExecutiveInsights,
} from "@/lib/insights/executive";

/* ---------------------------------------------------------
 * INPUT-DATEN
 * --------------------------------------------------------- */
const executiveMetrics: ExecutiveMetrics = {
  resilience: 0.76,
  stability: 0.66,
  adaptability: 0.51,
  efficiency: 0.84,
  costRisk: 0.68,
  volatility: 0.59,
  forecastConfidence: 0.56,
  co2Intensity: 0.42,
  stressIndex: 0.61,
};

/* ---------------------------------------------------------
 * COMPONENT
 * --------------------------------------------------------- */
export default function ExecutiveInsightsPanel() {
  const { summary, insights, topPriority } =
    generateExecutiveInsights(executiveMetrics);

  const severityColor: Record<
    "Info" | "Hinweis" | "Warnung" | "Kritisch",
    string
  > = {
    Info: "bg-white/5 text-gray-200 border-white/10",
    Hinweis: "bg-emerald-900/30 text-emerald-200 border-emerald-500/30",
    Warnung: "bg-amber-900/40 text-amber-100 border-amber-500/40",
    Kritisch: "bg-red-900/50 text-red-100 border-red-500/50",
  };

  return (
    <AEMSSection title="Executive Summary">
      <AEMSCard className="space-y-5 p-6 overflow-visible">

        {/* ---------------------------------------------------------
         * SYSTEMISCHE ZUSAMMENFASSUNG
         * --------------------------------------------------------- */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
            <span className="w-2 h-2 rounded-full bg-aems-neon" />
            <span>Automatische systemweite Bewertung</span>
          </div>

          <p className="text-sm text-gray-200 leading-relaxed">
            {parseWithGlossaryInline(summary)}
          </p>
        </div>

        {/* ---------------------------------------------------------
         * TOP PRIORITY INSIGHT
         * --------------------------------------------------------- */}
        <div>
          <div className="text-xs text-gray-400 mb-1 uppercase tracking-wide">
            Top-Priorität
          </div>

          <div
            className={`rounded-xl px-4 py-3 text-sm border ${severityColor[topPriority.severity]}`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-sm">
                {parseWithGlossaryInline(topPriority.headline)}
              </span>
              <span className="text-[10px] uppercase tracking-wide opacity-80">
                {topPriority.severity}
              </span>
            </div>

            <p className="text-xs leading-relaxed">
              {parseWithGlossaryInline(topPriority.body)}
            </p>
          </div>
        </div>

        {/* ---------------------------------------------------------
         * WEITERE INSIGHTS
         * --------------------------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {insights.map((ins, i) => (
            <div
              key={i}
              className={`rounded-xl px-4 py-3 text-xs border ${severityColor[ins.severity]}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-[11px]">
                  {parseWithGlossaryInline(ins.headline)}
                </span>
                <span className="text-[9px] uppercase tracking-wide opacity-80">
                  {ins.area}
                </span>
              </div>

              <p className="text-[11px] leading-relaxed">
                {parseWithGlossaryInline(ins.body)}
              </p>
            </div>
          ))}
        </div>

        {/* ---------------------------------------------------------
         * CTA
         * --------------------------------------------------------- */}
        <div className="pt-3 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[11px] text-gray-400 leading-relaxed max-w-md">
            Diese Insights richten sich an Vorstand, Geschäftsführung,
            Finanz-, Technik- und Nachhaltigkeitsverantwortliche.
          </p>

          <button
            onClick={() => awardXp("executive_insights_open")}
            className="
              px-4 py-1.5 text-xs rounded-full
              bg-aems-neon text-black font-semibold
              hover:bg-aems-soft transition
            "
          >
            Insights verstanden markieren
          </button>
        </div>
      </AEMSCard>
    </AEMSSection>
  );
}
