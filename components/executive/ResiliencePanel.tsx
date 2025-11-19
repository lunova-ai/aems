"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";
import ProgressRing from "@/components/ProgressRing";

export default function ResiliencePanel() {
  const resilience = 0.71;

  return (
    <AEMSSection title="Resilienzscore">
      <AEMSCard className="flex items-center gap-6 p-6">
        <ProgressRing value={resilience * 100} size={80} strokeWidth={8} color="#00E7B3" />

        <div className="space-y-1">
          <div className="text-lg font-semibold text-aems-neon">
            {(resilience * 100).toFixed(0)}%
          </div>
          <div className="text-xs text-gray-400">
            Hohe Robustheit – gute Reaktion auf Stressoren.  
            Systeme halten Schwankungen stand und profitieren teilweise davon.
          </div>
          <div className="text-xs text-aems-soft">
            Empfehlung: Clusteranalyse für Wärmelasten prüfen.
          </div>
        </div>
      </AEMSCard>
    </AEMSSection>
  );
}
