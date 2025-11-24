"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";
import { parseWithGlossaryInline } from "@/lib/glossary/parser";

export default function ImpactScorePanel() {
  // Beispielwert – später aus Analytics / XP / Alerts berechenbar
  const score = 48;

  // Farblogik für Impact
  const getColor = (v: number) => {
    if (v >= 70) return "text-aems-neon";
    if (v >= 40) return "text-yellow-300";
    return "text-red-400";
  };

  const color = getColor(score);

  const factors = [
    "Alerts geprüft",
    "Handlungsempfehlungen geöffnet",
    "Simulationen gestartet",
    "Heatmap-Insights genutzt",
  ];

  return (
    <AEMSSection title="Impact Score">
      <AEMSCard
        className="
          p-6 flex flex-col gap-4
          hover:scale-[1.01] transition-transform
        "
        aria-label="Impact Score Panel"
      >
        {/* Score */}
        <div className={`text-4xl font-bold ${color}`}>
          {score}
        </div>

        {/* Beschreibung */}
        <div className="text-xs text-gray-400 leading-relaxed max-w-sm">
          {parseWithGlossaryInline(
            "Bewertet, wie stark Entscheidungen Kosten, Risiko und Resilienz beeinflussen."
          )}
        </div>

        {/* Liste der Einflussfaktoren */}
        <ul className="mt-2 space-y-1 text-sm text-gray-300">
          {factors.map((f, i) => (
            <li key={i}>• {parseWithGlossaryInline(f)}</li>
          ))}
        </ul>

        {/* Hinweis */}
        <div className="mt-2 text-xs text-aems-neon leading-snug">
          {parseWithGlossaryInline(
            "Höhere Werte zeigen aktives Management und eine steigende antifragile Lernkurve."
          )}
        </div>
      </AEMSCard>
    </AEMSSection>
  );
}
