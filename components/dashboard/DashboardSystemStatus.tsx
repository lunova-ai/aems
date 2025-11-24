"use client";

import React from "react";

import { mockKpis } from "@/lib/mock/dashboardMock";
import { DashboardKpi } from "@/lib/dashboard/dashboardModel";

import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";
import AEMSKPI from "@/components/AEMSKPI";

import { awardXp } from "@/lib/gamification/xp";
import { parseWithGlossaryInline } from "@/lib/glossary/parser";

export default function DashboardSystemStatus({
  kpis = mockKpis,
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
              relative overflow-visible
              hover:scale-[1.01] transition-transform
            "
          >
            <div
              className="flex flex-col gap-3 cursor-pointer"
              onClick={() => {
              awardXp("kpi_view");  // XP-Event
              console.log("KPI clicked:", kpi.key, index);  // optional für Analyse
             }}
          >
              {/* KPI Visual + Wert */}
              <AEMSKPI
                label={parseWithGlossaryInline(kpi.label)}
                value={kpi.value}
                status={kpi.status}
              />

              {/* Beschreibung mit Glossar */}
              <p className="text-sm text-gray-300 leading-relaxed">
                {parseWithGlossaryInline(kpi.description)}
              </p>
            </div>
          </AEMSCard>
        ))}
      </div>
    </AEMSSection>
  );
}
