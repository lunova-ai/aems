"use client";

import React from "react";
import { parseWithGlossaryInline } from "@/lib/glossary/parser";

type Props = {
  cost: number;
  risk: number;
  resilience: number;
};

export default function ExecutiveSummaryBar({ cost, risk, resilience }: Props) {
  // Fallbacks (verhindern NaN & Layout-Brüche)
  const safeCost = Number.isFinite(cost) ? cost : 0;
  const safeRisk = Number.isFinite(risk) ? risk : 0;
  const safeResilience = Number.isFinite(resilience) ? resilience : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

      {/* Kosten */}
      <div
        className="
          rounded-xl bg-white/5 p-4 border border-white/10
          flex flex-col gap-1
        "
        aria-label="Kosten pro Megawattstunde"
      >
        <div className="text-xs text-gray-400">
          {parseWithGlossaryInline("Kosten pro MWh")}
        </div>
        <div className="text-2xl font-bold text-white">
          {safeCost.toFixed(2)} €
        </div>
      </div>

      {/* Risiko */}
      <div
        className="
          rounded-xl bg-white/5 p-4 border border-white/10
          flex flex-col gap-1
        "
        aria-label="Risikowert"
      >
        <div className="text-xs text-gray-400">
          {parseWithGlossaryInline("Risikoindex")}
        </div>
        <div className="text-2xl font-bold text-red-300">
          {safeRisk.toFixed(0)}%
        </div>
      </div>

      {/* Resilienz */}
      <div
        className="
          rounded-xl bg-white/5 p-4 border border-white/10
          flex flex-col gap-1
        "
        aria-label="Resilienzindex"
      >
        <div className="text-xs text-gray-400">
          {parseWithGlossaryInline("Resilienz")}
        </div>
        <div className="text-2xl font-bold text-aems-neon">
          {safeResilience.toFixed(0)}%
        </div>
      </div>

    </div>
  );
}

