"use client";

import React, { useState } from "react";

import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";

import BubbleMatrix from "./BubbleMatrix";
import SquareMatrix from "./SquareMatrix";

import { parseWithGlossaryInline } from "@/lib/glossary/parser";
import { awardXp } from "@/lib/gamification/xp";

export default function CorrelationTabs() {
  const [view, setView] = useState<"bubble" | "square">("bubble");

  const switchToBubble = () => {
    if (view !== "bubble") {
      awardXp("correlation_view_bubble");
      setView("bubble");
    }
  };

  const switchToSquare = () => {
    if (view !== "square") {
      awardXp("correlation_view_square");
      setView("square");
    }
  };

  return (
    <AEMSSection title="Korrelationsanalyse – Zusammenhänge der Einflussfaktoren">
      <AEMSCard className="pb-6">

        {/* TAB BUTTONS */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={switchToBubble}
            aria-pressed={view === "bubble"}
            className={`
              px-4 py-2 rounded-lg text-sm transition-all
              ${view === "bubble"
                ? "bg-aems-neon text-black font-semibold shadow-md scale-[1.02]"
                : "text-gray-300 hover:bg-white/10"
              }
            `}
          >
            Bubble-Matrix
          </button>

          <button
            onClick={switchToSquare}
            aria-pressed={view === "square"}
            className={`
              px-4 py-2 rounded-lg text-sm transition-all
              ${view === "square"
                ? "bg-aems-neon text-black font-semibold shadow-md scale-[1.02]"
                : "text-gray-300 hover:bg-white/10"
              }
            `}
          >
            Square-Matrix
          </button>
        </div>

        {/* MATRICES */}
        <div className="mt-4">
          {view === "bubble" && <BubbleMatrix />}
          {view === "square" && <SquareMatrix />}
        </div>

        {/* INTERPRETATIONSHINWEIS */}
        <div className="text-sm text-gray-300 mt-8 leading-relaxed space-y-2">
          <p>
            {parseWithGlossaryInline(
              "Hohe positive Werte bedeuten, dass zwei Größen gemeinsam steigen und fallen. Negative Werte bedeuten gegenläufige Bewegungen."
            )}
          </p>

          <p>
            {parseWithGlossaryInline(
              "Korrelation zeigt Zusammenhänge, aber keine Ursache-Wirkung. Für die Identifikation echter Wirklogiken wird die Ursachenanalyse verwendet."
            )}
          </p>
        </div>

      </AEMSCard>
    </AEMSSection>
  );
}

