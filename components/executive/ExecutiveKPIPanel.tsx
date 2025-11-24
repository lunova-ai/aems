"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";
import AEMSKPI from "@/components/AEMSKPI";
import { parseWithGlossaryInline } from "@/lib/glossary/parser";

export default function ExecutiveKPIPanel() {
  return (
    <AEMSSection title="Wesentliche Energie-Kennzahlen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Energieintensität */}
        <AEMSCard className="p-4">
          <AEMSKPI
            label={parseWithGlossaryInline("Energieintensität (kWh/m²)")}
            value={142}
            status="leicht erhöht"
            trend="up"
            info="Höhere Gebäudelast in der Kühlperiode führte zur Steigerung."
          />
        </AEMSCard>

        {/* Kosten pro MWh */}
        <AEMSCard className="p-4">
          <AEMSKPI
            label={parseWithGlossaryInline("Kosten pro MWh (€)")}
            value={182}
            status="stabil"
            trend="down"
            info="Sinkende Spotmarktpreise reduzieren die Beschaffungskosten."
          />
        </AEMSCard>

        {/* CO₂-Emissionen */}
        <AEMSCard className="p-4">
          <AEMSKPI
            label={parseWithGlossaryInline("CO₂-Emissionen (kg)")}
            value={912}
            status="leicht steigend"
            trend="up"
            info="Höherer fossiler Anteil im Mix hat die Emissionen erhöht."
          />
        </AEMSCard>

      </div>
    </AEMSSection>
  );
}

