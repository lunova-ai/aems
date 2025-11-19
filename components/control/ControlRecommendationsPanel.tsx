"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";

type Recommendation = {
  horizon: "Kurzfrist" | "Mittelfrist" | "Langfrist";
  title: string;
  description: string;
};

const recommendations: Recommendation[] = [
  {
    horizon: "Kurzfrist",
    title: "Spitzenlast-Alarm aktiv schalten",
    description:
      "Peak Shaving-Regeln für die nächsten Wochen schärfer stellen, um aktuelle Preispeaks abzufedern."
  },
  {
    horizon: "Kurzfrist",
    title: "Dashboard für kritische Zonen hervorheben",
    description:
      "OP-Bereich, Intensivstation oder thermisch sensible Bereiche im Monitoring priorisieren."
  },
  {
    horizon: "Mittelfrist",
    title: "CO₂-optimierte Fahrweise testen",
    description:
      "Testphase mit CO₂-optimierten Setpoints in Nebenzeiten – Lerneffekt aus realen Daten."
  },
  {
    horizon: "Mittelfrist",
    title: "Lastverschiebungsszenarien simulieren",
    description:
      "Simulation starten, wie sich größere Verschiebungen (Waschen, Pumpen, Speicherladung) auswirken."
  },
  {
    horizon: "Langfrist",
    title: "Redundanz- & Notfallpfade üben",
    description:
      "Geplante, kontrollierte Belastungstests fahren, um antifragile Strukturen aufzubauen."
  }
];

export default function ControlRecommendationsPanel() {
  return (
    <AEMSSection title="Empfohlene Steuerungsmaßnahmen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((r, idx) => (
          <AEMSCard key={idx} className="p-4 border border-white/10">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-400">{r.horizon}</span>
            </div>
            <div className="text-sm font-semibold text-white">{r.title}</div>
            <div className="text-xs text-gray-300 mt-1">{r.description}</div>
          </AEMSCard>
        ))}
      </div>
      <p className="mt-3 text-xs text-gray-400">
        Maßnahmen folgen antifragilen Prinzipien: Verluste reduzieren, sinnvolle
        Volatilität zulassen, Redundanzen testen und aus Stressereignissen aktiv lernen.
      </p>
    </AEMSSection>
  );
}
