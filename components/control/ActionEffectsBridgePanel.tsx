"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";
import { parseWithGlossaryInline } from "@/lib/glossary/parser";

type Effect = {
  action: string;
  horizon: "Kurzfrist" | "Mittelfrist" | "Langfrist";
  cost: string;
  risk: string;
  resilience: string;
  comment: string;
};

const effects: Effect[] = [
  {
    action: "Peak Shaving aktivieren",
    horizon: "Kurzfrist",
    cost: "−",
    risk: "−",
    resilience: "+",
    comment:
      "Entlastet sofort Spitzen, verbessert Netz- und Anlagensicherheit."
  },
  {
    action: "CO₂-optimierte Fahrweise",
    horizon: "Mittelfrist",
    cost: "≈",
    risk: "≈",
    resilience: "+",
    comment:
      "Leicht höhere Komplexität, aber robustere Versorgung und bessere Nachhaltigkeit."
  },
  {
    action: "Nachtabsenkung erweitern",
    horizon: "Kurzfrist",
    cost: "−",
    risk: "≈",
    resilience: "≈",
    comment:
      "Direkter Effekt auf Kosten, kaum Einfluss auf Risikoprofil bei sauberem Monitoring."
  },
  {
    action: "Redundanzpfade testen",
    horizon: "Langfrist",
    cost: "+",
    risk: "−",
    resilience: "++",
    comment:
      "Investition heute, starke antifragile Wirkung bei Störungen."
  }
];

export default function ActionEffectsBridgePanel() {
  return (
    <AEMSSection title="Action Effects Bridge – Wirkung von Maßnahmen">
      <AEMSCard>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-xs text-gray-400">
                <th className="px-2 py-1">Maßnahme</th>
                <th className="px-2 py-1">Horizont</th>
                <th className="px-2 py-1 text-center">Kosten</th>
                <th className="px-2 py-1 text-center">Risiko</th>
                <th className="px-2 py-1 text-center">Resilienz</th>
                <th className="px-2 py-1">Kommentar</th>
              </tr>
            </thead>

            <tbody>
              {effects.map((e, idx) => (
                <tr
                  key={idx}
                  className="bg-white/5 hover:bg-white/10 transition rounded-lg"
                >
                  <td className="px-2 py-2 text-gray-200">
                    {parseWithGlossaryInline(e.action)}
                  </td>

                  <td className="px-2 py-2 text-xs text-gray-300">
                    {e.horizon}
                  </td>

                  <td className="px-2 py-2 text-center text-emerald-300">
                    {e.cost}
                  </td>

                  <td className="px-2 py-2 text-center text-red-300">
                    {e.risk}
                  </td>

                  <td className="px-2 py-2 text-center text-aems-neon">
                    {e.resilience}
                  </td>

                  <td className="px-2 py-2 text-xs text-gray-300 leading-relaxed">
                    {parseWithGlossaryInline(e.comment)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-gray-400 leading-relaxed">
          {parseWithGlossaryInline(
            "Die Action Effects Bridge zeigt transparent, wie Maßnahmen auf Kosten, Risiko und Resilienz wirken – ideal für abgestimmte Entscheidungen zwischen Technik, Finanzen und Nachhaltigkeit."
          )}
        </p>
      </AEMSCard>
    </AEMSSection>
  );
}
