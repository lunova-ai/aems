"use client";

import React, { useState } from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";

type ReplayScenario = {
  id: string;
  date: string;
  title: string;
  baselineCost: number;
  simulatedCost: number;
  comment: string;
};

const scenarios: ReplayScenario[] = [
  {
    id: "sim_001",
    date: "2025-10-12",
    title: "Peak Shaving bereits im Sommer aktiv",
    baselineCost: 190,
    simulatedCost: 178,
    comment: "Hätte frühe Aktivierung 12 €/MWh eingespart, v.a. durch vermiedene Peaks.",
  },
  {
    id: "sim_002",
    date: "2025-09-01",
    title: "CO₂-optimierte Fahrweise im Herbst",
    baselineCost: 185,
    simulatedCost: 187,
    comment:
      "Leicht höhere Kosten, aber signifikante CO₂-Reduktion – je nach Strategie sinnvoll.",
  },
];

export default function ScenarioReplay() {
  const [selectedId, setSelectedId] = useState<string>(scenarios[0]?.id ?? "");

  const selected = scenarios.find((s) => s.id === selectedId) ?? scenarios[0];

  if (!selected) return null;

  const diff = selected.simulatedCost - selected.baselineCost;
  const diffText = `${diff >= 0 ? "+" : ""}${diff.toFixed(1)} €/MWh`;

  return (
    <AEMSSection title="Scenario Replay – alternative Vergangenheit">
      <AEMSCard className="p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex flex-col gap-1">
            <div className="text-xs text-gray-400">Vergangenes Szenario auswählen</div>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-md px-2 py-1 text-xs text-gray-100 w-full md:w-80"
            >
              {scenarios.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.date} – {s.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mt-2">
          <div className="rounded-xl bg-white/5 border border-white/10 p-3">
            <div className="text-xs text-gray-400">Ausgangssituation</div>
            <div className="text-lg text-gray-100">
              {selected.baselineCost.toFixed(1)} €/MWh
            </div>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/10 p-3">
            <div className="text-xs text-gray-400">Simuliertes Szenario</div>
            <div className="text-lg text-gray-100">
              {selected.simulatedCost.toFixed(1)} €/MWh
            </div>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/10 p-3">
            <div className="text-xs text-gray-400">Differenz</div>
            <div className={diff >= 0 ? "text-lg text-red-300" : "text-lg text-emerald-300"}>
              {diffText}
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-300 mt-2">{selected.comment}</p>

        <p className="text-xs text-gray-400 mt-2">
          Scenario Replay hilft, vergangene Perioden zu „re-simulieren“: Was wäre gewesen,
          wenn eine Policy früher aktiv gewesen wäre? Ideal als Entscheidungsgrundlage für
          künftige Schritte.
        </p>
      </AEMSCard>
    </AEMSSection>
  );
}
