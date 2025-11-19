"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";
import { parseWithGlossary } from "@/lib/glossary/parser";
import { awardXp } from "@/lib/gamification/xp";
import {
  ExecutiveMetrics,
  generateExecutiveInsights,
} from "@/lib/insights/executive";

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
      <AEMSCard className="space-y-4 p-5">
        {/* Zusammenfassung */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
            <span className="w-2 h-2 rounded-full bg-aems-neon" />
            <span>Systemweite Zusammenfassung (automatisch generiert)</span>
          </div>
          <p className="text-sm text-gray-200">
            {parseWithGlossary(summary)}
          </p>
        </div>

        {/* Top-Priorität */}
        <div className="mt-3">
          <div className="text-xs text-gray-400 mb-1">Top-Priorität</div>
          <div
            className={`rounded-xl px-4 py-3 text-sm border ${
              severityColor[topPriority.severity]
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-semibold">{topPriority.headline}</span>
              <span className="text-[10px] uppercase tracking-wide opacity-80">
                {topPriority.severity}
              </span>
            </div>
            <p className="text-xs text-gray-200">
              {parseWithGlossary(topPriority.body)}
            </p>
          </div>
        </div>

        {/* Weitere Insights */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {insights.map((ins, i) => (
            <div
              key={i}
              className={`rounded-xl px-4 py-3 text-xs border ${
                severityColor[ins.severity]
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-semibold text-[11px]">
                  {ins.headline}
                </span>
                <span className="text-[9px] uppercase tracking-wide opacity-80">
                  {ins.area}
                </span>
              </div>
              <p className="text-[11px] text-gray-200">
                {parseWithGlossary(ins.body)}
              </p>
            </div>
          ))}
        </div>

        {/* Lern-/Aktion-CTA */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11px] text-gray-400">
            Diese Zusammenfassung ist für Vorstand, Geschäftsführung, Finanz-,
            Technik- und Nachhaltigkeitsverantwortliche gedacht.
          </p>
          <button
            className="px-4 py-1.5 text-xs rounded-full bg-aems-neon text-black font-semibold hover:bg-aems-soft transition"
            onClick={() => awardXp("executive_insight_read")}
          >
            Insights verstanden markieren
          </button>
        </div>
      </AEMSCard>
    </AEMSSection>
  );
}
