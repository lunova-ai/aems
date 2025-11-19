"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";

type PolicyStatus = "active" | "proposed" | "paused";

type Policy = {
  id: string;
  name: string;
  status: PolicyStatus;
  impact: string;
  dimension: string;
  description: string;
};

const policies: Policy[] = [
  {
    id: "peak_shaving",
    name: "Peak Shaving Lastmanagement",
    status: "active",
    impact: "-12% Spitzenlast",
    dimension: "Last / Kosten",
    description: "Steuert nichtkritische Verbraucher in Hochlastphasen aktiv herunter."
  },
  {
    id: "co2_bias",
    name: "CO₂-optimierte Erzeugungspriorität",
    status: "proposed",
    impact: "-8% CO₂-Intensität",
    dimension: "CO₂ / Nachhaltigkeit",
    description: "Bevorzugt Anlagen mit niedriger CO₂-Intensität bei vergleichbaren Kosten."
  },
  {
    id: "comfort_guard",
    name: "Komfortschutz in kritischen Bereichen",
    status: "active",
    impact: "0% Komfortverlust",
    dimension: "Komfort / Risiko",
    description: "Stellt sicher, dass sensible Zonen (OP, Intensivstation, SPA) stabil versorgt bleiben."
  },
  {
    id: "night_setback",
    name: "Nachtabsenkung Wärme/Kälte",
    status: "paused",
    impact: "-5% Energieverbrauch",
    dimension: "Energie / Betrieb",
    description: "Reduktion von Sollwerten außerhalb der Nutzungszeiten – aktuell wegen Umbau pausiert."
  }
];

function statusColor(status: PolicyStatus) {
  switch (status) {
    case "active":
      return "text-aems-neon bg-aems-neon/10 border-aems-neon/40";
    case "proposed":
      return "text-yellow-300 bg-yellow-500/10 border-yellow-500/40";
    case "paused":
      return "text-gray-300 bg-white/5 border-white/10";
  }
}

function statusLabel(status: PolicyStatus) {
  switch (status) {
    case "active":
      return "Aktiv";
    case "proposed":
      return "Vorgeschlagen";
    case "paused":
      return "Pausiert";
  }
}

export default function AdaptivePolicyEnginePanel() {
  return (
    <AEMSSection title="Adaptive Policy Engine – Steuerungsregeln">
      <AEMSCard className="space-y-3">
        {policies.map((p) => (
          <div
            key={p.id}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 py-2 border-b border-white/5 last:border-b-0"
          >
            <div>
              <div className="flex items-center gap-2">
                <div className="text-sm font-semibold text-white">{p.name}</div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full border ${statusColor(
                    p.status
                  )}`}
                >
                  {statusLabel(p.status)}
                </span>
              </div>
              <div className="text-xs text-gray-400 mt-1">{p.description}</div>
            </div>
            <div className="text-right space-y-1">
              <div className="text-xs text-gray-400">{p.dimension}</div>
              <div className="text-sm text-aems-neon">{p.impact}</div>
            </div>
          </div>
        ))}
        <p className="text-xs text-gray-400 pt-1">
          Die Adaptive Policy Engine verknüpft Regeln mit Messdaten und passt Maßnahmen
          dynamisch an – Ziel: weniger Ad-hoc-Reaktionen, mehr vorausschauende Steuerung.
        </p>
      </AEMSCard>
    </AEMSSection>
  );
}
