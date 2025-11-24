"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";
import { parseWithGlossaryInline } from "@/lib/glossary/parser";
// import { awardXp } from "@/lib/gamification/xp";  // ← optional

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
        {clusters.map((c) => (
          <AEMSCard
            key={c.title}
            className="
              p-4 
              hover:scale-[1.01] 
              transition-transform 
              overflow-visible
            "
            // onClick={() => awardXp("cluster_view")}   // ← Falls du XP willst
          >
            <div className={`font-semibold text-lg ${c.color}`}>
              {parseWithGlossaryInline(c.title)}
            </div>

            <div className="text-sm text-gray-300 mt-1 leading-relaxed">
              {parseWithGlossaryInline(c.text)}
            </div>
          </AEMSCard>
        ))}
      </div>
    </AEMSSection>
  );
}
