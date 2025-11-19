"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";

export default function ImpactScorePanel() {
  const score = 48; // Punkte aus Alerts, Insights, Maßnahmen

  return (
    <AEMSSection title="Impact Score">
      <AEMSCard className="p-6">
        <div className="text-3xl font-bold text-white">{score}</div>
        <div className="text-xs text-gray-400 mt-1">
          Bewertet wie stark Entscheidungen Kosten, Risiko und Resilienz beeinflussen.
        </div>

        <ul className="mt-4 space-y-1 text-sm text-gray-300">
          <li>• Alerts geprüft</li>
          <li>• Handlungsempfehlungen geöffnet</li>
          <li>• Simulationen gestartet</li>
          <li>• Heatmap-Insights genutzt</li>
        </ul>

        <div className="mt-3 text-xs text-aems-neon">
          Höhere Werte zeigen aktives Management & antifragile Lernkurve.
        </div>
      </AEMSCard>
    </AEMSSection>
  );
}
