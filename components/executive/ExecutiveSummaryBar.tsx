"use client";

import React from "react";

export default function ExecutiveSummaryBar({
  cost,
  risk,
  resilience,
}: {
  cost: number;
  risk: number;
  resilience: number;
}) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Kosten */}
      <div className="rounded-xl bg-white/5 p-4 border border-white/10">
        <div className="text-xs text-gray-400">Kosten/MWh</div>
        <div className="text-2xl font-bold text-white">{cost} €</div>
      </div>

      {/* Risiko */}
      <div className="rounded-xl bg-white/5 p-4 border border-white/10">
        <div className="text-xs text-gray-400">Risikoindex</div>
        <div className="text-2xl font-bold text-red-300">{risk}%</div>
      </div>

      {/* Resilienz */}
      <div className="rounded-xl bg-white/5 p-4 border border-white/10">
        <div className="text-xs text-gray-400">Resilienz</div>
        <div className="text-2xl font-bold text-aems-neon">{resilience}%</div>
      </div>
    </div>
  );
}
