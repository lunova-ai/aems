"use client";

import React, { useState, useCallback } from "react";

import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";

import RootCauseHierarchicalTree from "./RootCauseHierarchicalTree";
import RootCauseForceTree from "./RootCauseForceTree";

import { parseWithGlossaryInline } from "@/lib/glossary/parser";
import { awardXp } from "@/lib/gamification/xp";

export default function RootCauseTabs() {
  const [view, setView] = useState<"hierarchy" | "force">("hierarchy");

  const activate = useCallback(
    (mode: "hierarchy" | "force") => {
      setView(mode);

      // Basis-XP
      awardXp("rootcause_view");

      // Modus-spezifische XP (konsistent mit xp.ts)
      awardXp(
        mode === "hierarchy"
          ? "rootcause_view_hierarchy"
          : "rootcause_view_force"
      );
    },
    []
  );

  const tabClass = (active: boolean) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-all 
     focus:outline-none focus:ring-2 focus:ring-aems-neon/40 
     ${
       active
         ? "bg-aems-neon text-black shadow-md scale-[1.02]"
         : "text-gray-300 hover:bg-white/10 hover:text-aems-neon"
     }`;

  return (
    <AEMSSection title="Ursachenanalyse – Wirklogik & Einflussketten">
      <AEMSCard>

        {/* ---- TABS ---- */}
        <div className="flex gap-4 mb-6" role="tablist">
          <button
            role="tab"
            id="tab-hierarchy"
            aria-selected={view === "hierarchy"}
            aria-controls="panel-hierarchy"
            onClick={() => activate("hierarchy")}
            className={tabClass(view === "hierarchy")}
          >
            Hierarchie-Baum
          </button>

          <button
            role="tab"
            id="tab-force"
            aria-selected={view === "force"}
            aria-controls="panel-force"
            onClick={() => activate("force")}
            className={tabClass(view === "force")}
          >
            Force-Graph
          </button>
        </div>

        {/* ---- PANELS ---- */}

        <div
          id="panel-hierarchy"
          role="tabpanel"
          aria-labelledby="tab-hierarchy"
          hidden={view !== "hierarchy"}
        >
          {view === "hierarchy" && <RootCauseHierarchicalTree />}
        </div>

        <div
          id="panel-force"
          role="tabpanel"
          aria-labelledby="tab-force"
          hidden={view !== "force"}
        >
          {view === "force" && <RootCauseForceTree />}
        </div>

        {/* ---- FOOTER ---- */}
        <div className="text-sm text-gray-300 mt-6 leading-relaxed">
          {parseWithGlossaryInline(
            "Die stärksten Ursachenpfade sind derzeit Preisvolatilität und Spitzenlast — beide wirken direkt auf Kosten, Effizienz und Systemstabilität."
          )}
        </div>

      </AEMSCard>
    </AEMSSection>
  );
}



