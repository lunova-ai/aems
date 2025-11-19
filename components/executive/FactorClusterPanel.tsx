"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";

export default function FactorClusterPanel() {
  const clusters = [
    {
      title: "Cluster A – Preis, Last, CO₂",
      text: "Diese Variablen bewegen sich fast immer gemeinsam.",
      color: "text-yellow-400",
    },
    {
      title: "Cluster B – Temperatur, Kältebedarf",
      text: "Wetterabhängige Verhaltensmuster.",
      color: "text-blue-400",
    },
  ];

  return (
    <AEMSSection title="Clusteranalyse der Einflussfaktoren">
      <div className="grid gap-4">
        {clusters.map((c, i) => (
          <AEMSCard key={i} className="p-4">
            <div className={`font-bold ${c.color}`}>{c.title}</div>
            <div className="text-sm text-gray-300 mt-1">{c.text}</div>
          </AEMSCard>
        ))}
      </div>
    </AEMSSection>
  );
}
