"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";

type SimulationEntry = {
  id: string;
  date: string;
  title: string;
  type: "Monte Carlo" | "Scenario" | "Replay";
  outcome: string;
};

const entries: SimulationEntry[] = [
  {
    id: "log_003",
    date: "2025-11-15",
    title: "Monte Carlo – Winterpreis-Risiko",
    type: "Monte Carlo",
    outcome: "P90 bei 215 €/MWh, Empfehlung: konservatives Budget.",
  },
  {
    id: "log_002",
    date: "2025-11-10",
    title: "Scenario – +2°C Außentemperatur",
    type: "Scenario",
    outcome: "Kältebedarf +9%, Lastverschiebung empfohlen.",
  },
  {
    id: "log_001",
    date: "2025-11-05",
    title: "Replay – Peak Shaving im Herbst",
    type: "Replay",
    outcome: "Hätte 6% der Kosten reduziert, Policy wird nun vorgeschlagen.",
  },
];

export default function SimulationTimeline() {
  return (
    <AEMSSection title="Simulation Timeline – Lernverlauf aus Szenarien">
      <AEMSCard className="p-5">
        <div className="space-y-3">
          {entries.map((e) => (
            <div
              key={e.id}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 pb-3 border-b border-white/5 last:border-b-0"
            >
              <div>
                <div className="text-xs text-gray-400">{e.date}</div>
                <div className="text-sm font-semibold text-white">{e.title}</div>
                <div className="text-xs text-gray-300 mt-1">{e.outcome}</div>
              </div>
              <div className="text-xs text-gray-400">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                  {e.type}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-gray-400">
          Die Timeline dokumentiert, welche Simulationen durchgeführt wurden und welche
          Erkenntnisse daraus entstanden sind – wichtig für Governance, Audits und Lernen.
        </p>
      </AEMSCard>
    </AEMSSection>
  );
}
