"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";

export default function ExecutiveActionsPanel() {
  const actions = [
    {
      title: "Via Negativa – Energieverluste reduzieren",
      text: "Eliminiere unnötige Komplexität: Wärmeverluste in Zone B minimieren.",
      color: "border-yellow-500/50",
    },
    {
      title: "Barbell Strategy – Risiko & Sicherheit ausbalancieren",
      text: "Fixe Energiekontingente + flexible Spotmarktstrategie kombinieren.",
      color: "border-blue-500/50",
    },
    {
      title: "Skin in the Game – Verantwortlichkeiten stärken",
      text: "Verbrauchsverantwortung klar zuordnen (z.B. Kühlung, Heizung).",
      color: "border-green-500/40",
    },
  ];

  return (
    <AEMSSection title="Handlungsempfehlungen (Antifragile Konzepte)">
      <div className="grid gap-4">
        {actions.map((a, i) => (
          <AEMSCard key={i} className={`p-4 border-l-4 ${a.color}`}>
            <div className="text-aems-neon font-semibold">{a.title}</div>
            <div className="text-sm text-gray-300 mt-1">{a.text}</div>
          </AEMSCard>
        ))}
      </div>
    </AEMSSection>
  );
}
