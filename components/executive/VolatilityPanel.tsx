"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";

export default function VolatilityPanel() {
  const volatility = 18.4; // Prozent

  return (
    <AEMSSection title="Preisvolatilität">
      <AEMSCard className="p-6">
        <div className="text-3xl font-bold text-white">{volatility}%</div>
        <div className="text-xs text-gray-400 mt-1">
          Bezieht sich auf Marktpreisschwankungen der letzten 30 Tage.
        </div>

        <div className="mt-4 text-xs text-aems-soft">
          Hohe Volatilität = Chance für antifragile Einkaufsstrategien.
        </div>
      </AEMSCard>
    </AEMSSection>
  );
}
