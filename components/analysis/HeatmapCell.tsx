"use client";

import React, { memo } from "react";

type HeatmapCellProps = {
  value: number;
  row: string;
  col: string;
  onHover: (
    x: number,
    y: number,
    value: number,
    row: string,
    col: string
  ) => void;
  onLeave: () => void;
};

function HeatmapCellComponent({
  value,
  row,
  col,
  onHover,
  onLeave
}: HeatmapCellProps) {
  /** Farbskala konsistent zur Korrelation / AEMS Design */
  const getColor = (v: number) => {
    if (v > 0.6) return "bg-aems-neon/70";
    if (v > 0.3) return "bg-aems-soft/50";

    if (v < -0.6) return "bg-red-500/60";
    if (v < -0.3) return "bg-red-600/40";

    return "bg-white/10";
  };

  /** Stabile Position aus bounding rect */
  const computePosition = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  };

  /** Mausbewegung */
  const handleMouseMove = (e: React.MouseEvent<HTMLTableCellElement>) => {
    const pos = computePosition(e.currentTarget);
    onHover(pos.x, pos.y, value, row, col);
  };

  /** Touch (iPad / Handy) */
  const handleTouchStart = (e: React.TouchEvent<HTMLTableCellElement>) => {
    const el = e.currentTarget;
    const pos = computePosition(el);
    onHover(pos.x, pos.y, value, row, col);
  };

  return (
    <td
      role="gridcell"
      aria-label={`${row} beeinflusst ${col} mit ${value.toFixed(2)}`}
      className={`
        w-12 h-12 
        ${getColor(value)} 
        text-xs text-white 
        text-center 
        cursor-pointer 
        transition-colors 
        select-none 
        relative
      `}
      onMouseMove={handleMouseMove}
      onMouseLeave={onLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={onLeave}
    >
      {value.toFixed(2)}
    </td>
  );
}

/** Performance: memo verhindert unnötige Re-Renders */
const HeatmapCell = memo(HeatmapCellComponent);
export default HeatmapCell;
