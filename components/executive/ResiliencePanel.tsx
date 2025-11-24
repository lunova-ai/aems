"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";
import ProgressRing from "@/components/ProgressRing";
import { parseWithGlossaryInline } from "@/lib/glossary/parser";
import { awardXp } from "@/lib/gamification/xp";

export default function ResiliencePanel() {
  const raw = 0.71;
  const resilience = Number.isFinite(raw) ? raw : 0;
  const percent = Math.round(resilience * 100);

  // Farbskala abhängig vom Score
  const color =
    percent >= 70
      ? "text-aems-neon"
      : percent >= 40
      ? "text-yellow-300"
      : "text-red-400";

  return (
    <AEMSSection title="Resilienzscore">
      <AEMSCard
        className="
          flex items-center gap-6 p-6 
          hover:scale-[1.01] transition-transform cursor-pointer
        "
        onClick={() => awardXp("executive_resilience_open")}
        aria-label="Resilienzscore öffnen"
      >
        {/* Circle Gauge */}
        <ProgressRing
          value={percent}
          size={84}
          strokeWidth={8}
          color={percent >= 70 ? "#00E7B3" : percent >= 40 ? "#FACC15" : "#EF4444"}
          aria-label={`Resilienz: ${percent}%`}
        />

        {/* Textbereich */}
        <div className="space-y-2 max-w-sm">
          <div className={`text-xl font-semibold ${color}`}>
            {percent}%
          </div>

          <div className="text-xs text-gray-300 leading-relaxed">
            {parseWithGlossaryInline(
              "Die Resilienz misst die Fähigkeit des Systems, Stress, Volatilität und Schockereignisse abzufangen und sich dabei sogar zu verbessern."
            )}
          </div>

          <div className="text-xs text-gray-400 leading-relaxed">
            {percent >= 70 &&
              parseWithGlossaryInline(
                "Hohe Robustheit – das System reagiert stabil auf externe Faktoren."
              )}

            {percent >= 40 && percent < 70 &&
              parseWithGlossaryInline(
                "Moderate Resilienz – das System verkraftet Schwankungen, zeigt aber anfällige Segmente."
              )}

            {percent < 40 &&
              parseWithGlossaryInline(
                "Geringe Resilienz – Stressoren beeinflussen mehrere Kernbereiche."
              )}
          </div>

          <div className="text-xs text-aems-soft pt-1">
            {parseWithGlossaryInline(
              "Empfehlung: Clusteranalyse zur Identifikation anfälliger Energiepfade durchführen."
            )}
          </div>
        </div>
      </AEMSCard>
    </AEMSSection>
  );
}
