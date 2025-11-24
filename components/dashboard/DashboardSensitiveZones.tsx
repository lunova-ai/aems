"use client";

import React from "react";
import Link from "next/link";

import AEMSCard from "@/components/AEMSCard";
import AEMSSection from "@/components/AEMSSection";

import { parseWithGlossaryInline } from "@/lib/glossary/parser";
import { awardXp } from "@/lib/gamification/xp";
import { generateSensitiveZones } from "@/lib/sensitive/generator";

export default function DashboardSensitiveZones() {

  const zones = generateSensitiveZones({
    heatmap: [],
    stability: 0.66,
    volatility: 0.58,
    peakload: 0.72,
    co2: 0.22,
  });

  // Farben für Risikostufen – strict-safe
  const colors: Record<string, string> = {
    Niedrig: "bg-green-700/40 border-green-500/30",
    Mittel: "bg-yellow-700/40 border-yellow-500/30",
    Hoch: "bg-orange-700/40 border-orange-500/40",
    Kritisch: "bg-red-700/40 border-red-500/40",
  };

  // Glossar-Wrapper
  const G = parseWithGlossaryInline;

  return (
    <AEMSSection title="Sensitive Zonen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {zones.map((zone, i) => (
          <AEMSCard
            key={zone.category}
            className={`
              relative border rounded-xl
              ${colors[zone.level] ?? "bg-white/5 border-white/20"}
              hover:scale-[1.01] transition
              overflow-visible
            `}
          >
            {/* Titel */}
            <h3 className="text-lg font-semibold text-white mb-2">
              {G(zone.category)}
            </h3>

            {/* Risiko */}
            <p className="text-sm text-gray-300 mt-2">
              Risiko: <strong>{zone.level}</strong>
            </p>

            {/* Indikatoren */}
            <ul className="text-gray-300 text-sm mt-3 space-y-1">
              {zone.indicators.map((ind, idx) => (
                <li key={idx}>• {G(ind)}</li>
              ))}
            </ul>

            {/* Erklärung */}
            <p className="text-gray-400 text-xs mt-4 leading-relaxed">
              {G(zone.explanation)}
            </p>

            {/* Details-Button */}
            <Link
              href={`/analysis?zone=${encodeURIComponent(zone.category)}`}
              onClick={() => awardXp("sensitive_zone_open")}
              className="
                mt-6 block text-center
                bg-aems-neon text-black
                font-semibold py-2 rounded-lg
                hover:bg-aems-soft transition
              "
            >
              Details ansehen
            </Link>

          </AEMSCard>
        ))}

      </div>
    </AEMSSection>
  );
}
