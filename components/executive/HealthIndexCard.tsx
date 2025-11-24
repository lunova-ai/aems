"use client";

import React, { useState } from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";
import ProgressRing from "@/components/ProgressRing";

import {
  computeHealthIndex,
  computeHealthIndexDetails,
} from "@/lib/executive/healthIndex";
import { parseWithGlossaryInline } from "@/lib/glossary/parser";
import { awardXp } from "@/lib/gamification/xp";
import type { ActionKey } from "@/lib/gamification/xp";

export default function HealthIndexCard() {
  const rawScore = computeHealthIndex();
  const safeScore =
    Number.isFinite(rawScore) && rawScore >= 0 && rawScore <= 100
      ? Math.round(rawScore)
      : 0;

  const details = computeHealthIndexDetails();

  const [hover, setHover] = useState(false);

  /* -------------------------
     Ampel-Farbe + Badge
     ------------------------- */
  const badge =
    safeScore > 70
      ? { label: "stark", color: "bg-aems-neon text-black" }
      : safeScore > 40
      ? {
          label: "mittel",
          color:
            "bg-yellow-500/40 text-yellow-200 border-yellow-400/40",
        }
      : {
          label: "kritisch",
          color:
            "bg-red-700/40 text-red-200 border-red-500/40",
        };

  return (
    <AEMSSection title="AEMS Health Index">
      <AEMSCard
        className="p-6 text-center relative hover:scale-[1.01] transition-transform"
        onClick={() =>
          awardXp("healthindex_view" as ActionKey)
        }
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-label="AEMS System Health Index Panel"
      >
        {/* --- Progress Ring --- */}
        <div className="flex justify-center mb-4">
          <ProgressRing
            value={safeScore}
            size={90}
            strokeWidth={8}
            color={
              safeScore > 70
                ? "#00E7B3"
                : safeScore > 40
                ? "#EAB308"
                : "#EF4444"
            }
            aria-label={`Gesundheitsindex ${safeScore}%`}
          />
        </div>

        {/* --- Score --- */}
        <div className="text-5xl font-bold text-white">
          {safeScore}
        </div>

        {/* --- Badge --- */}
        <div
          className={`
            inline-block mt-3 px-4 py-1 rounded-full text-xs 
            border ${badge.color}
          `}
        >
          {badge.label.toUpperCase()}
        </div>

        {/* --- Beschreibung --- */}
        <div className="text-sm text-gray-400 mt-3">
          {parseWithGlossaryInline("Systemgesundheit (0–100)")}
        </div>

        {/* --- Tooltip (Details) --- */}
        {hover && (
          <div
            className="
              absolute left-1/2 top-full mt-3 -translate-x-1/2 z-40
              w-72 p-4 rounded-xl 
              bg-black/80 backdrop-blur-md 
              border border-aems-neon/30 
              text-sm text-gray-200 shadow-xl animate-fadeIn
            "
          >
            <div className="font-semibold text-aems-neon mb-2">
              {parseWithGlossaryInline("Detailanalyse")}
            </div>

            {details.trend !== undefined && (
              <div className="mb-2 text-gray-300">
                Trend:{" "}
                <span
                  className={
                    details.trend > 0
                      ? "text-aems-neon"
                      : "text-red-400"
                  }
                >
                  {details.trend > 0 ? "+" : ""}
                  {details.trend.toFixed(1)}%
                </span>{" "}
                gegenüber letztem Zeitraum
              </div>
            )}

            <div className="text-xs">
              <div className="text-aems-neon font-semibold mb-1">
                Positive Treiber
              </div>
              <ul className="list-disc ml-4 mb-2 space-y-1">
                {details.positive.map((p: string, i: number) => (
                  <li key={i}>
                    {parseWithGlossaryInline(p)}
                  </li>
                ))}
              </ul>

              <div className="text-red-400 font-semibold mt-3 mb-1">
                Negative Treiber
              </div>
              <ul className="list-disc ml-4 space-y-1">
                {details.negative.map((n: string, i: number) => (
                  <li key={i}>
                    {parseWithGlossaryInline(n)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </AEMSCard>
    </AEMSSection>
  );
}


