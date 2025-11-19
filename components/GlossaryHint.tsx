"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { glossaryTerms } from "@/lib/glossary/terms";
import { awardXp } from "@/lib/gamification/xp";

export default function GlossaryHint({ term }: { term: string }) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const entry = glossaryTerms.find(
    (t) => t.term.toLowerCase() === term.toLowerCase()
  );

  if (!entry) return <>{term}</>;

  const handleHover = (e: React.MouseEvent) => {
    setCoords({ x: e.clientX + 12, y: e.clientY + 12 });
    setVisible(true);
  };

  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("aems-glossary-open", {
          detail: { term: entry.term },
        })
      );
    }
    awardXp("glossary_view");
  };

  return (
    <>
      {/* Inline Glossar-Element */}
      <span
        onMouseEnter={handleHover}
        onMouseLeave={() => setVisible(false)}
        onMouseMove={handleHover}
        onClick={handleClick}
        className="
          text-aems-neon cursor-help
          border-b border-dotted border-aems-neon/40
          hover:border-aems-neon transition
        "
      >
        {entry.term}
      </span>

      {/* Tooltip via Portal → verhindert HTML-Hierarchie-Probleme */}
      {typeof document !== "undefined" &&
        visible &&
        createPortal(
          <div
            className="
              fixed z-50 px-3 py-2 
              rounded-xl bg-black/80 backdrop-blur-md
              border border-aems-neon/30 shadow-xl
              text-xs text-gray-200
              animate-fadeIn
              pointer-events-none
            "
            style={{ top: coords.y, left: coords.x }}
          >
            <div className="text-sm text-white">{entry.simple}</div>
            <div className="text-xs text-gray-400 mt-1">{entry.aems}</div>
            <div className="text-[10px] text-gray-500 mt-1">
              Klick für vollständige Erklärung
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
