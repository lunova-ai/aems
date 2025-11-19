"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";
import { computeExecutiveKpis } from "@/lib/executive/kpi";

export default function KpiGrid() {
  const kpis = computeExecutiveKpis();

  return (
    <AEMSSection title="KPIs – Energie & Kosten">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((k) => (
          <AEMSCard key={k.label} className="p-5">
            <div className="text-sm text-gray-400">{k.label}</div>
            <div className="text-2xl font-bold text-white">
              {k.value}
              {k.unit && <span className="text-base text-gray-400 ml-1">{k.unit}</span>}
            </div>
            {k.trend !== undefined && (
              <div
                className={`text-xs ${
                  k.trend > 0 ? "text-red-400" : "text-aems-neon"
                }`}
              >
                {k.trend > 0 ? "+" : ""}
                {k.trend} %
              </div>
            )}
          </AEMSCard>
        ))}
      </div>
    </AEMSSection>
  );
}
