"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";
import { awardXp } from "@/lib/gamification/xp";
import { parseWithGlossaryInline } from "@/lib/glossary/parser";
import { TrendingUp, Flame, Thermometer } from "lucide-react"; // noch schöner

export default function TopFactorsPanel() {
  const factors = [
    {
      name: "Preisvolatilität",
      impact: +12,
      icon: TrendingUp,
    },
    {
      name: "Spitzenlast",
      impact: +9,
      icon: Flame,
    },
    {
      name: "Temperatur",
      impact: +4,
      icon: Thermometer,
    },
  ];

  const getColor = (v: number) =>
    v >= 10
      ? "text-red-400"
      : v >= 5
      ? "text-orange-300"
      : "text-yellow-300";

  return (
    <AEMSSection title="Top Einflussfaktoren">
      <AEMSCard
        className="
          p-5 space-y-4
          hover:scale-[1.01] transition-transform
        "
        onClick={() => awardXp("executive_topfactors_open")}
        aria-label="Top Einflussfaktoren öffnen"
      >
        {factors.map((f, i) => {
          const Icon = f.icon;
          const value = f.impact;
          const color = getColor(value);

          return (
            <div
              key={i}
              className="
                flex items-center justify-between
                text-sm py-1
              "
            >
              {/* LEFT: Icon + Faktorname */}
              <div className="flex items-center gap-2">
                <Icon size={16} className={`opacity-80 ${color}`} />

                <span className="text-gray-200">
                  {parseWithGlossaryInline(f.name)}
                </span>
              </div>

              {/* RIGHT: Impact */}
              <span className={`font-semibold ${color}`}>
                {value > 0 ? `+${value}%` : `${value}%`}
              </span>
            </div>
          );
        })}
      </AEMSCard>
    </AEMSSection>
  );
}

