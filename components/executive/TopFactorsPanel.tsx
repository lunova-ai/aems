"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";

export default function TopFactorsPanel() {
  const factors = [
    { name: "Preisvolatilität", impact: "+12%", color: "text-red-400" },
    { name: "Spitzenlast", impact: "+9%", color: "text-red-300" },
    { name: "Temperatur", impact: "+4%", color: "text-yellow-300" },
  ];

  return (
    <AEMSSection title="Top Einflussfaktoren">
      <AEMSCard>
        <div className="space-y-3">
          {factors.map((f, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-gray-300">{f.name}</span>
              <span className={f.color}>{f.impact}</span>
            </div>
          ))}
        </div>
      </AEMSCard>
    </AEMSSection>
  );
}
