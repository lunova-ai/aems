"use client";

import React, { RefObject } from "react";
import AEMSCard from "@/components/AEMSCard";
import { awardXp } from "@/lib/gamification/xp";

export default function SnapshotDropdown({
  onClose,
  onMakeSnapshot,
  onHeatmapSnapshot,
  analysisRef,
}: {
  onClose: () => void;
  onMakeSnapshot: () => Promise<void>;        // <-- FIX: erlaubt async
  onHeatmapSnapshot?: () => void;
  analysisRef?: RefObject<HTMLDivElement>;
}) {
  return (
    <AEMSCard
      className="
        animate-slideDown mt-2 px-5 py-4 
        bg-white/10 border-white/20 shadow-xl
      "
    >
      <div className="flex flex-col gap-4 text-left">
        
        <p className="text-gray-200 text-sm leading-relaxed">
          Erstelle einen <strong className="text-aems-neon">Snapshot</strong> der aktuellen Analyse.
        </p>

        {onHeatmapSnapshot && (
          <button
            onClick={() => {
              awardXp("snapshot_heatmap");
              onHeatmapSnapshot();
            }}
            className="
              text-sm text-aems-neon 
              hover:text-aems-soft 
              transition-colors
            "
          >
            • Nur Heatmap als PNG exportieren
          </button>
        )}

        <button
          onClick={() => {
            awardXp("snapshot_page");
            onMakeSnapshot();
          }}
          className="
            text-sm text-aems-neon 
            hover:text-aems-soft 
            transition-colors
          "
        >
          • Analyse-Seite als PNG exportieren
        </button>

        <div className="border-t border-white/10 pt-2" />

        <button
          onClick={onClose}
          className="
            text-xs text-gray-400 
            hover:text-gray-200 
            transition-colors
          "
        >
          schliessen
        </button>
      </div>
    </AEMSCard>
  );
}


