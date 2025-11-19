"use client";

import React from "react";

import { mockKpis, DashboardKpi } from "@/lib/mock/dashboardMock";

import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";
import AEMSKPI from "@/components/AEMSKPI";

import { awardXp } from "@/lib/gamification/xp";
import { parseWithGlossary } from "@/lib/glossary/parser";

export default function DashboardSystemStatus({
  kpis = mockKpis
}: {
  kpis?: DashboardKpi[];
}) {
  return (
    <AEMSSection title="Systemzustand heute">
      <div
        className="
          grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4
          gap-6
        "
      >
        {kpis.map((kpi, index) => (
          <AEMSCard
            key={kpi.key}
            className="
              relative
              overflow-visible      /* Tooltip Fix */
              hover:scale-[1.01] 
              transition-transform
            "
          >
            <div
              className="flex flex-col gap-3 cursor-pointer"
              onClick={() => awardXp(`kpi_view_${kpi.key}_${index}`)}
            >
              {/* KPI Visual + Wert */}
              <AEMSKPI
                label={parseWithGlossary(kpi.label)}
                value={kpi.value}
                status={kpi.status}
              />

              {/* Beschreibung mit Glossar */}
              <p className="text-sm text-gray-300 leading-relaxed">
                {parseWithGlossary(kpi.description)}
              </p>
            </div>
          </AEMSCard>
        ))}
      </div>
    </AEMSSection>
  );
}
