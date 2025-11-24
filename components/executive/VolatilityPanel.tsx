"use client";

import React from "react";
import { TrendingUpDown } from "lucide-react";

import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";
import { parseWithGlossaryInline } from "@/lib/glossary/parser";

export default function VolatilityPanel() {
  const volatility = 18.4; // Prozent

  // Dynamische Farbskala
  const getColor = (v: number) =>
    v >= 20 ? "text-red-400" : v >= 10 ? "text-yellow-300" : "text-aems-neon";

  const color = getColor(volatility);

  return (
    <AEMSSection title="Preisvolatilität">
      <AEMSCard
        className="
          p-6 flex items-center gap-6
          hover:scale-[1.01] transition-transform
        "
        aria-label="Panel zur Preisvolatilität"
      >
        {/* Icon */}
        <TrendingUpDown size={42} className={`${color} opacity-90`} />

        {/* Content */}
        <div className="flex flex-col gap-1">
          <div className={`text-3xl font-bold ${color}`}>
            {volatility}%
          </div>

          <div className="text-xs text-gray-400 leading-relaxed max-w-xs">
            {parseWithGlossaryInline(
              "Bezieht sich auf Marktpreisschwankungen der letzten 30 Tage."
            )}
          </div>

          <div className="text-xs text-aems-soft">
            {parseWithGlossaryInline(
              "Hohe Volatilität kann gezielt für antifragile Einkaufsstrategien genutzt werden."
            )}
          </div>
        </div>
      </AEMSCard>
    </AEMSSection>
  );
}

