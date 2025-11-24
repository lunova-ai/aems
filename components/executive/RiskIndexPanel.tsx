"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";
import ProgressRing from "@/components/ProgressRing";
import { awardXp } from "@/lib/gamification/xp";
import { parseWithGlossaryInline } from "@/lib/glossary/parser";

export default function RiskIndexPanel() {
  const raw = 0.63; // 63 % Risikobelastung
  const risk = Number.isFinite(raw) ? raw : 0;
  const percent = Math.round(risk * 100);

  // Dynamische Farbschiene – konsistent mit Executive Dashboard
  const ringColor =
    percent >= 70 ? "#EF4444" :      // Rot – hohes Risiko
    percent >= 40 ? "#FBBF24" :      // Gelb – moderat
    "#00E7B3";                        // Grün – niedrig

  const textColor =
    percent >= 70 ? "text-red-400" :
    percent >= 40 ? "text-yellow-300" :
    "text-aems-neon";

  return (
    <AEMSSection title="Risikoindex">
      <AEMSCard
        className="
          flex items-center gap-6 p-6 
          hover:scale-[1.01] transition-transform 
          cursor-pointer
        "
        onClick={() => awardXp("executive_risk_open")}
        aria-label="Risikoindex öffnen"
      >
        {/* Kreisvisualisierung */}
        <ProgressRing
          value={percent}
          size={84}
          strokeWidth={8}
          color={ringColor}
          aria-label={`Aktuelles Risiko: ${percent}%`}
        />

        {/* Textbereich */}
        <div className="space-y-2 max-w-sm">
          <div className={`text-xl font-semibold ${textColor}`}>
            Risiko: {percent}%
          </div>

          <div className="text-xs text-gray-300 leading-relaxed">
            {parseWithGlossaryInline(
              "Berechnet aus Preisvolatilität, Spitzenlast, CO₂-Intensität, Versorgungssicherheit und kurzfristigen Stressparametern."
            )}
          </div>

          {/* Dynamischer Risiko-Hinweis */}
          {percent >= 70 && (
            <div className="text-xs text-red-400">
              Hohes Risiko – Stabilisierung dringend empfohlen.
            </div>
          )}

          {percent >= 40 && percent < 70 && (
            <div className="text-xs text-yellow-300">
              Moderates Risiko – Monitoring & Szenarien prüfen.
            </div>
          )}

          {percent < 40 && (
            <div className="text-xs text-aems-neon">
              Niedriges Risiko – System läuft stabil.
            </div>
          )}

          {/* CTA */}
          <div className="text-xs text-aems-soft pt-1">
            {parseWithGlossaryInline(
              "Empfehlung: Simulation starten oder Alerts prüfen."
            )}
          </div>
        </div>
      </AEMSCard>
    </AEMSSection>
  );
}
