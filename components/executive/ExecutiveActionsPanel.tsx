"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";

import { parseWithGlossaryInline } from "@/lib/glossary/parser";
import { awardXp } from "@/lib/gamification/xp";

type ActionConfig = {
  title: string;
  text: string;
  color: string;
  icon: string;
  xpKey: import("@/lib/gamification/xp").ActionKey;
};

export default function ExecutiveActionsPanel() {
  const actions: ActionConfig[] = [
    {
      title: "Via Negativa – Energieverluste reduzieren",
      text: "Eliminiere unnötige Komplexität: Wärmeverluste in Zone B minimieren.",
      color: "border-yellow-400/50",
      icon: "⚡",
      xpKey: "executive_view",
    },
    {
      title: "Barbell Strategy – Risiko & Sicherheit ausbalancieren",
      text: "Fixe Energiekontingente mit einer flexiblen Spotmarktstrategie kombinieren.",
      color: "border-blue-400/50",
      icon: "📊",
      xpKey: "insight_view",
    },
    {
      title: "Skin in the Game – Verantwortlichkeiten stärken",
      text: "Verbrauchsverantwortung klar zuordnen – z. B. Kühlung, Heizung oder Druckluft.",
      color: "border-green-400/40",
      icon: "🏅",
      xpKey: "simulation_view",
    },
  ];

  return (
    <AEMSSection title="Handlungsempfehlungen (Antifragile Konzepte)">
      <div className="grid gap-4">
        {actions.map((a, i) => (
          <AEMSCard
            key={i}
            className={`
              p-5 border-l-4 ${a.color}
              hover:bg-white/5 hover:shadow-xl
              transition-all cursor-pointer
              group
            `}
            onClick={() => awardXp(a.xpKey)}
          >
            {/* TITLE */}
            <div className="flex items-center gap-2">
              <span className="text-xl">{a.icon}</span>
              <div className="text-aems-neon font-semibold text-base leading-tight">
                {parseWithGlossaryInline(a.title)}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="text-sm text-gray-300 mt-2 leading-relaxed">
              {parseWithGlossaryInline(a.text)}
            </div>

            {/* CTA-Line */}
            <div
              className="
                text-xs mt-3 text-gray-400
                group-hover:text-aems-neon transition
              "
            >
              Details in der Analyse vertiefen →
            </div>
          </AEMSCard>
        ))}
      </div>
    </AEMSSection>
  );
}


