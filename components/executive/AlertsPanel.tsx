"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";

export default function AlertsPanel() {
  const alerts = [
    {
      id: 1,
      title: "Spitzenlast steigt",
      description: "Die Lastspitzen der letzten 24h liegen 12% über dem Normalwert.",
      severity: "high",
    },
    {
      id: 2,
      title: "Preisvolatilität +8%",
      description: "Starke Schwankungen am Strommarkt.",
      severity: "medium",
    },
  ];

  return (
    <AEMSSection title="Aktuelle Alerts">
      <div className="grid gap-4">
        {alerts.map((a) => (
          <AEMSCard
            key={a.id}
            className={`border-l-4 ${
              a.severity === "high"
                ? "border-red-500/80"
                : a.severity === "medium"
                ? "border-yellow-500/80"
                : "border-blue-500/80"
            }`}
          >
            <div className="text-sm font-semibold text-white">{a.title}</div>
            <div className="text-xs text-gray-400 mt-1">{a.description}</div>
          </AEMSCard>
        ))}
      </div>
    </AEMSSection>
  );
}
