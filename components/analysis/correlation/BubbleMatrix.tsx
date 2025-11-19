"use client";

import React, { useState, useCallback } from "react";

import {
  correlationMatrix,
  correlationFactors,
  toColor
} from "@/lib/analysis/correlation";

import { parseWithGlossaryInline } from "@/lib/glossary/parser";
import { awardXp } from "@/lib/gamification/xp";

export default function BubbleMatrix() {
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    value: number;
    row: string;
    col: string;
  }>({
    visible: false,
    x: 0,
    y: 0,
    value: 0,
    row: "",
    col: ""
  });

  /** Tooltip anzeigen – throttled update */
  const showTooltip = useCallback(
    (e: React.MouseEvent, value: number, row: string, col: string) => {
      awardXp("correlation_hover");

      setTooltip({
        visible: true,
        x: e.clientX,
        y: e.clientY,
        value,
        row,
        col
      });
    },
    []
  );

  const hideTooltip = () => {
    setTooltip((t) => ({ ...t, visible: false }));
  };

  const formatInfluence = (v: number) =>
    v > 0 ? "verstärkend" : v < 0 ? "dämpfend" : "neutral";

  return (
    <div className="overflow-x-auto mt-6 relative">

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="
            fixed z-50 pointer-events-none
            px-3 py-2 rounded-lg 
            bg-black/80 backdrop-blur-md 
            border border-aems-neon/30 
            text-xs text-gray-200 
            shadow-xl animate-fadeIn
          "
          style={{
            top: Math.min(tooltip.y + 15, window.innerHeight - 90),
            left: Math.min(tooltip.x + 15, window.innerWidth - 200),
            maxWidth: 180
          }}
        >
          <div className="font-semibold text-white">
            {tooltip.row} ↔ {tooltip.col}
          </div>
          <div className="text-aems-neon">
            Korrelation: {(tooltip.value * 100).toFixed(0)}%
          </div>
          <div className="text-[10px] text-gray-400">
            ({formatInfluence(tooltip.value)})
          </div>
        </div>
      )}

      {/* Matrix */}
      <table className="border-collapse">
        <thead>
          <tr>
            <th className="w-24" />
            {correlationFactors.map((factor) => (
              <th
                key={factor}
                className="px-3 py-2 text-gray-200 text-sm bg-white/5 whitespace-nowrap"
              >
                {parseWithGlossaryInline(factor)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {correlationMatrix.map((row, i) => (
            <tr key={i}>
              <td className="text-gray-200 text-sm px-3 py-2 bg-white/5 whitespace-nowrap">
                {parseWithGlossaryInline(correlationFactors[i])}
              </td>

              {row.map((value, j) => {
                const absV = Math.abs(value);
                const radius = 4 + absV * 16;

                return (
                  <td
                    key={j}
                    role="gridcell"
                    aria-label={`Korrelation ${value.toFixed(2)}`}
                    className="
                      w-16 h-16 relative cursor-pointer 
                      hover:bg-white/5 transition-colors
                    "
                    onMouseMove={(e) =>
                      showTooltip(
                        e,
                        value,
                        correlationFactors[i],
                        correlationFactors[j]
                      )
                    }
                    onMouseLeave={hideTooltip}
                  >
                    <div
                      className={`
                        absolute left-1/2 top-1/2 rounded-full 
                        -translate-x-1/2 -translate-y-1/2
                        ${toColor(value)}
                      `}
                      style={{
                        width: radius * 2,
                        height: radius * 2,
                        opacity: 0.9
                      }}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
