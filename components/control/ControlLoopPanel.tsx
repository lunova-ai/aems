"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";

type LoopStatus = "ok" | "warning" | "issue";

type LoopStep = {
  step: "Observe" | "Orient" | "Decide" | "Act";
  status: LoopStatus;
  description: string;
};

const steps: LoopStep[] = [
  {
    step: "Observe",
    status: "ok",
    description: "Daten aus Zählern, SCADA, Marktpreisen und Sensorik werden erfasst."
  },
  {
    step: "Orient",
    status: "ok",
    description: "Heatmaps, Korrelationen und Ursachenbäume stellen Muster dar."
  },
  {
    step: "Decide",
    status: "warning",
    description: "Entscheidungen werden teilweise noch manuell getroffen – Potenzial für APE."
  },
  {
    step: "Act",
    status: "ok",
    description: "Maßnahmen sind technisch umsetzbar, Monitoring läuft stabil."
  }
];

function statusStyling(status: LoopStatus) {
  switch (status) {
    case "ok":
      return "bg-emerald-500/15 text-emerald-300 border-emerald-500/40";
    case "warning":
      return "bg-yellow-500/15 text-yellow-300 border-yellow-500/40";
    case "issue":
      return "bg-red-500/15 text-red-300 border-red-500/40";
  }
}

export default function ControlLoopPanel() {
  return (
    <AEMSSection title="Control Loop – Beobachten · Einordnen · Entscheiden · Handeln">
      <AEMSCard className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {steps.map((s) => (
            <div
              key={s.step}
              className="flex flex-col items-start gap-2 p-3 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="flex items-center gap-2">
                <div className="text-sm font-semibold text-white">{s.step}</div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full border ${statusStyling(
                    s.status
                  )}`}
                >
                  {s.status === "ok"
                    ? "Stabil"
                    : s.status === "warning"
                    ? "Beobachten"
                    : "Handlungsbedarf"}
                </span>
              </div>
              <div className="text-xs text-gray-300">{s.description}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400">
          Ziel ist ein geschlossener Regelkreis: Stressoren werden nicht nur abgewehrt,
          sondern aktiv genutzt, um Policies, Setpoints und Betriebsstrategien zu verbessern.
        </p>
      </AEMSCard>
    </AEMSSection>
  );
}
