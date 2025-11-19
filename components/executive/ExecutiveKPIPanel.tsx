"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";
import AEMSKPI from "@/components/AEMSKPI";

export default function ExecutiveKPIPanel() {
  return (
    <AEMSSection title="Wesentliche Energie-Kennzahlen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AEMSCard>
          <AEMSKPI
            label="Energieintensität"
            value="142"
            unit="kWh/m²"
            trend="+3.2%"
            trendType="up"
          />
        </AEMSCard>

        <AEMSCard>
          <AEMSKPI
            label="Kosten/MWh"
            value="182"
            unit="€"
            trend="-1.4%"
            trendType="down"
          />
        </AEMSCard>

        <AEMSCard>
          <AEMSKPI
            label="CO₂-Emissionen"
            value="912"
            unit="kg"
            trend="+0.8%"
            trendType="up"
          />
        </AEMSCard>
      </div>
    </AEMSSection>
  );
}
