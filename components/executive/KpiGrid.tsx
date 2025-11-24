"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";
import { computeExecutiveKpis } from "@/lib/executive/kpi";
import { awardXp } from "@/lib/gamification/xp";
import { parseWithGlossaryInline } from "@/lib/glossary/parser";

export default function KpiGrid() {
  const kpis = computeExecutiveKpis(); // garantiert typisiert

  return (
    <AEMSSection title="KPIs – Energie & Kosten">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((k) => {
          const isPositive = k.trend !== undefined && k.trend < 0;
          const trendColor = isPositive ? "text-aems-neon" : "text-red-400";
          const trendPrefix = k.trend && k.trend > 0 ? "+" : "";

          return (
            <AEMSCard
              key={k.label}
              className="
                p-5 
                hover:scale-[1.01] 
                transition-transform
                cursor-pointer
              "
              onClick={() => awardXp("executive_kpi_open")}
              aria-label={`KPI: ${k.label}`}
            >
              {/* Label – Glossar-ready */}
              <div className="text-sm text-gray-400">
                {parseWithGlossaryInline(k.label)}
              </div>

              {/* Wert */}
              <div className="text-2xl font-bold text-white mt-1">
                {k.value}
                {k.unit && (
                  <span className="text-base text-gray-400 ml-1">{k.unit}</span>
                )}
              </div>

              {/* Trend */}
              {k.trend !== undefined && (
                <div className={`text-xs mt-1 ${trendColor}`}>
                  {trendPrefix}
                  {k.trend}% gegenüber Vorperiode
                </div>
              )}
            </AEMSCard>
          );
        })}
      </div>
    </AEMSSection>
  );
}
