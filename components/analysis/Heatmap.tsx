"use client";

import React, { useState, useEffect } from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";

import RootCauseHierarchicalTree from "./rootCause/RootCauseHierarchicalTree";
import RootCauseForceTree from "./rootCause/RootCauseForceTree";

import { parseWithGlossaryInline } from "@/lib/glossary/parser";
import { awardXp } from "@/lib/gamification/xp";

export default function RootCauseTabs() {
  const [view, setView] = useState<"hierarchy" | "force">("hierarchy");

  // XP vergeben bei Ansicht (jeweils nur 1× pro Tab)
  useEffect(() => {
    awardXp("rootcause_tabs_open");
  }, []);

  const switchView = (v: "hierarchy" | "force") => {
    setView(v);
    awardXp(`rootcause_view_${v}`);
  };

  return (
    <AEMSSection title="Ursachenanalyse – Wirklogik & Einflussketten">
      <AEMSCard>

        {/* TAB-BUTTONS */}
        <div
          className="flex gap-4 mb-6"
          role="tablist"
          aria-label="Darstellung der Ursachenanalyse"
        >
          <button
            role="tab"
            aria-selected={view === "hierarchy"}
            onClick={() => switchView("hierarchy")}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all
              focus:outline-none focus:ring-2 focus:ring-aems-neon/40
              ${
                view === "hierarchy"
                  ? "bg-aems-neon text-black shadow-md scale-[1.02]"
                  : "text-gray-300 hover:bg-white/10"
              }
            `}
          >
            Hierarchie-Baum
          </button>

          <button
            role="tab"
            aria-selected={view === "force"}
            onClick={() => switchView("force")}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all
              focus:outline-none focus:ring-2 focus:ring-aems-neon/40
              ${
                view === "force"
                  ? "bg-aems-neon text-black shadow-md scale-[1.02]"
                  : "text-gray-300 hover:bg-white/10"
              }
            `}
          >
            Force-Graph
          </button>
        </div>

        {/* VIEWS */}
        <div role="tabpanel" hidden={view !== "hierarchy"}>
          {view === "hierarchy" && <RootCauseHierarchicalTree />}
        </div>

        <div role="tabpanel" hidden={view !== "force"}>
          {view === "force" && <RootCauseForceTree />}
        </div>

        {/* FOOTER-TEXT MIT GLOSSAR */}
        <div className="text-sm text-gray-300 mt-6 leading-relaxed">
          {parseWithGlossaryInline(
            "Die stärksten Ursachenpfade sind derzeit Preisvolatilität und Spitzenlast — beide wirken direkt auf Kosten, Effizienz und Systemstabilität."
          )}
        </div>

      </AEMSCard>
    </AEMSSection>
  );
}


