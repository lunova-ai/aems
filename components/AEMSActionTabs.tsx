"use client";

import React from "react";

export type ActionItem = {
  key: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean; // Hervorhebung des aktuellen Tabs
};

export default function AEMSActionTabs({ items }: { items: ActionItem[] }) {
  return (
    <div
      className="
        flex items-center gap-4 
        bg-white/5 px-4 py-3 
        rounded-xl border border-white/10 
        backdrop-blur-sm
      "
      role="toolbar"
      aria-label="AEMS Aktionen"
    >
      {items.map((item) => {
        const isActive = item.active ?? false;

        return (
          <button
            key={item.key}
            onClick={item.onClick}
            disabled={item.disabled}
            aria-pressed={isActive}
            className={`
              text-sm px-3 py-1 rounded-lg transition-all
              focus:outline-none focus:ring-2 focus:ring-aems-neon/50

              ${
                item.disabled
                  ? "text-gray-500 bg-white/5 cursor-not-allowed opacity-40"
                  : isActive
                  ? "bg-aems-neon text-black shadow-sm hover:bg-aems-soft"
                  : "text-gray-200 hover:text-aems-neon hover:bg-white/10"
              }

              ${!item.disabled ? "hover:scale-[1.02]" : ""}
            `}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

