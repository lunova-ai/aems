"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";

export default function InsightList() {
  const insights = [
    {
      id: 1,
      text: "Preispeaks korrelieren stark mit Produktionsbeginn am Morgen.",
    },
    {
      id: 2,
      text: "Hohe Wärmeverluste in Zone B – deutliche Effizienzreserven.",
    },
    {
      id: 3,
      text: "Kältebedarf stark wetterabhängig, Potenzial für Lastverschiebung.",
    },
  ];

  return (
    <AEMSSection title="Executive Insights">
      <div className="grid gap-4">
        {insights.map((i) => (
          <AEMSCard key={i.id} className="p-4">
            <div className="text-sm text-gray-200">{i.text}</div>
          </AEMSCard>
        ))}
      </div>
    </AEMSSection>
  );
}
