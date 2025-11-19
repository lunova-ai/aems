"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";
import ProgressRing from "@/components/ProgressRing";

export default function RiskIndexPanel() {
  const risk = 0.63; // 63% Risiko-Belastung

  return (
    <AEMSSection title="Risikoindex">
      <AEMSCard className="flex items-center gap-6 p-6">
        <ProgressRing value={risk * 100} size={80} strokeWidth={8} />

        <div className="space-y-1">
          <div className="text-lg font-semibold text-white">Risiko: {(risk * 100).toFixed(0)}%</div>
          <div className="text-xs text-gray-400">
            Basierend auf Preisvolatilität, Lastpeaks, CO₂-Profil & Versorgungssituation.
          </div>
          <div className="text-xs text-aems-soft">
            Empfehlung: Simulation starten oder Alerts prüfen.
          </div>
        </div>
      </AEMSCard>
    </AEMSSection>
  );
}
