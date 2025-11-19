// app/page.tsx
"use client";

import React, { useEffect } from "react";

import LayoutClient from "@/components/layout/LayoutClient";
import AEMSHeader from "@/components/AEMSHeader";

import DashboardSystemStatus from "@/components/dashboard/DashboardSystemStatus";
import DashboardTrend from "@/components/dashboard/DashboardTrend";
import DashboardSensitiveZones from "@/components/dashboard/DashboardSensitiveZones";
import DashboardRecommendations from "@/components/dashboard/DashboardRecommendations";

import { parseWithGlossaryInline } from "@/lib/glossary/parser";
import { awardXp } from "@/lib/gamification/xp";

export default function Page() {

  // XP beim Öffnen der Dashboard-Seite
  useEffect(() => {
    awardXp("dashboard_view");   // wieder korrekt – wir fügen diesen Event hinzu!
  }, []);

  return (
    <LayoutClient>
      <main className="pt-10 pb-28 space-y-16">

        {/* HEADER */}
        <AEMSHeader
          title="AEMS – Antifragiles Energiemanagement System"
          subtitle={parseWithGlossaryInline(
            "Übersicht über den aktuellen Zustand Ihres Energiesystems."
          )}
        />

        {/* SYSTEMSTATUS */}
        <DashboardSystemStatus />

        {/* TREND */}
        <DashboardTrend />

        {/* SENSITIVE ZONEN */}
        <div className="px-1 text-sm text-gray-300">
          {parseWithGlossaryInline(
            "Empfindliche Bereiche Ihres Energiesystems, die durch Volatilität, Spitzenlast oder Stress beeinflusst werden."
          )}
        </div>
        <DashboardSensitiveZones />

        {/* EMPFEHLUNGEN */}
        <div className="px-1 text-sm text-gray-300">
          {parseWithGlossaryInline(
            "Automatisch generierte antifragile Empfehlungen basierend auf aktuellen Einflussfaktoren und Risikobewertungen."
          )}
        </div>
        <DashboardRecommendations />

      </main>
    </LayoutClient>
  );
}

