// app/executive/page.tsx
"use client";

import React, { useEffect, useCallback } from "react";

import LayoutClient from "@/components/layout/LayoutClient";
import AEMSHeader from "@/components/AEMSHeader";

// Panels
import ExecutiveKPIPanel from "@/components/executive/ExecutiveKPIPanel";
import ResiliencePanel from "@/components/executive/ResiliencePanel";
import CostForecastPanel from "@/components/executive/CostForecastPanel";
import AlertsPanel from "@/components/executive/AlertsPanel";
import VolatilityPanel from "@/components/executive/VolatilityPanel";
import ImpactScorePanel from "@/components/executive/ImpactScorePanel";
import ForecastConfidencePanel from "@/components/executive/ForecastConfidencePanel";
import ExecutiveInsightsPanel from "@/components/executive/ExecutiveInsightsPanel";

import { parseWithGlossaryInline } from "@/lib/glossary/parser";
import { awardXp } from "@/lib/gamification/xp";
import type { ActionKey } from "@/lib/gamification/xp";

export default function ExecutivePage() {
  /* ----------------------------------------
   * XP beim Öffnen der Seite
   * -------------------------------------- */
  useEffect(() => {
    awardXp("executive_view");
  }, []);

  /* ----------------------------------------
   * Saubere, typisierte XP-Wrapper
   * -------------------------------------- */
  const giveXp = useCallback((key: ActionKey) => () => awardXp(key), []);

  return (
    <LayoutClient>
      <main className="pt-10 pb-20 space-y-16">
        {/* HEADER */}
        <AEMSHeader
          title="Executive Cockpit"
          subtitle={parseWithGlossaryInline(
            "Kosten, Risiko, Resilienz und CO₂ im Überblick – schnelle Orientierung für Entscheidungen."
          )}
        />

        {/* EXECUTIVE INSIGHTS */}
        <div onClick={giveXp("executive_insights_open")}>
          <ExecutiveInsightsPanel />
        </div>

        {/* KPI PANEL */}
        <div onClick={giveXp("executive_kpi_open")}>
          <ExecutiveKPIPanel />
        </div>

        {/* RESILIENCE / VOLATILITY / IMPACT / FORECAST */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div onClick={giveXp("resilience_open")}>
            <ResiliencePanel />
          </div>

          <div onClick={giveXp("volatility_open")}>
            <VolatilityPanel />
          </div>

          <div onClick={giveXp("impactscore_open")}>
            <ImpactScorePanel />
          </div>

          <div onClick={giveXp("forecast_confidence_open")}>
            <ForecastConfidencePanel />
          </div>
        </div>

        {/* COST-FORECAST + ALERTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2" onClick={giveXp("costforecast_open")}>
            <CostForecastPanel />
          </div>

          <div onClick={giveXp("alerts_open")}>
            <AlertsPanel />
          </div>
        </div>
      </main>
    </LayoutClient>
  );
}

