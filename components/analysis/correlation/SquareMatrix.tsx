"use client";

import React, { useState } from "react";

import {
  correlationMatrix,
  correlationFactors,
  toColor
} from "@/lib/analysis/correlation";

import { parseWithGlossaryInline } from "@/lib/glossary/parser";
import { awardXp } from "@/lib/gamification/xp";

export default function SquareMatrix() {
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

  const showTooltip = (
    e: React.MouseEvent,
    value: number,
    row: string,
    col: string
  ) => {
    awardXp("correlation_hover");

    setTooltip({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      value,
      row,
      col
    });
  };

  const hideTooltip = () =>
    setTooltip((t) => ({ ...t, visible: false }));

  const influenceText = (v: number) =>
    v > 0 ? "verstärkend" : v < 0 ? "dämpfend" : "neutral";

  return (
    <div className="overflow-x-auto relative mt-4">

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="
            fixed z-50 pointer-events-none 
            px-3 py-2 rounded-lg 
            bg-black/80 backdrop-blur-md 
            border border-aems-neon/30 
            text-xs text-gray-200 shadow-xl 
            animate-fadeIn
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
            ({influenceText(tooltip.value)})
          </div>
        </div>
      )}

      {/* Matrix */}
      <table className="border-collapse select-none">
        <thead>
          <tr>
            <th className="w-28" />

            {correlationFactors.map((factor) => (
              <th
                key={factor}
                className="px-3 py-2 text-gray-200 text-sm bg-white/5 text-center whitespace-nowrap"
              >
                {parseWithGlossaryInline(factor)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {correlationMatrix.map((row, i) => (
            <tr key={i}>
              {/* Zeilen-Beschriftung */}
              <td className="px-3 py-2 text-gray-200 text-sm bg-white/5 whitespace-nowrap">
                {parseWithGlossaryInline(correlationFactors[i])}
              </td>

              {/* Zellen */}
              {row.map((value, j) => (
                <td
                  key={j}
                  className={`
                    ${toColor(value)}
                    w-16 h-16 
                    text-xs text-white text-center align-middle 
                    hover:brightness-125 transition 
                    cursor-pointer border border-white/5
                  `}
                  onMouseMove={(e) =>
                    showTooltip(e, value, correlationFactors[i], correlationFactors[j])
                  }
                  onMouseLeave={hideTooltip}
                  onClick={() => awardXp("correlation_cell_click")}
                >
                  {value.toFixed(2)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Legende */}
      <div className="mt-4 text-xs text-gray-400">
        {parseWithGlossaryInline(
          "Positive Korrelation = gemeinsame Bewegung · Negative Korrelation = gegenläufige Bewegung"
        )}
      </div>
    </div>
  );
}
