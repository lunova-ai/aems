"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";
import ProgressRing from "@/components/ProgressRing";

export default function ControlStatusPanel() {
  const loadStress = 0.68;          // 0–1
  const supplyRisk = 0.44;
  const volatilityPressure = 0.52;
  const overall = 0.73;

  return (
    <AEMSSection title="Systemstatus – aktuelle Belastung">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <AEMSCard className="flex flex-col items-center gap-2 py-4">
          <div className="text-xs text-gray-400">Load Stress Index</div>
          <ProgressRing value={loadStress * 100} size={80} strokeWidth={8} color="#F97373" />
          <div className="text-xs text-gray-400 text-center px-2">
            Zeigt, wie stark Lastspitzen und Grundlast das System belasten.
          </div>
        </AEMSCard>

        <AEMSCard className="flex flex-col items-center gap-2 py-4">
          <div className="text-xs text-gray-400">Supply Risk</div>
          <ProgressRing value={supplyRisk * 100} size={80} strokeWidth={8} color="#FBBF24" />
          <div className="text-xs text-gray-400 text-center px-2">
            Risiko durch Versorgung, Verträge und Marktsituation.
          </div>
        </AEMSCard>

        <AEMSCard className="flex flex-col items-center gap-2 py-4">
          <div className="text-xs text-gray-400">Volatilitätsdruck</div>
          <ProgressRing value={volatilityPressure * 100} size={80} strokeWidth={8} color="#38BDF8" />
          <div className="text-xs text-gray-400 text-center px-2">
            Druck durch Preisbewegungen und Marktvolatilität.
          </div>
        </AEMSCard>

        <AEMSCard className="flex flex-col items-center gap-2 py-4">
          <div className="text-xs text-gray-400">Gesamtsteuerbarkeit</div>
          <ProgressRing value={overall * 100} size={80} strokeWidth={8} color="#00E7B3" />
          <div className="text-xs text-gray-400 text-center px-2">
            Wie gut das System durch Policies & Maßnahmen steuerbar ist.
          </div>
        </AEMSCard>
      </div>
    </AEMSSection>
  );
}
