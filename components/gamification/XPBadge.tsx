"use client";

import React, { useEffect, useState } from "react";
import { GamificationState, loadGamificationState } from "@/lib/gamification/xp";

export default function XPBadge() {
  const [state, setState] = useState<GamificationState | null>(null);

  useEffect(() => {
    // Initial laden
    setState(loadGamificationState());

    const handler = (event: Event) => {
      const custom = event as CustomEvent<GamificationState>;
      setState(custom.detail);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("aems-gamification-updated", handler);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("aems-gamification-updated", handler);
      }
    };
  }, []);

  if (!state) return null;

  const nextLevelXp =
    state.level === 5
      ? state.xp
      : state.level === 1
      ? 100
      : state.level === 2
      ? 250
      : state.level === 3
      ? 500
      : 1000;

  const prevLevelXp =
    state.level === 1
      ? 0
      : state.level === 2
      ? 100
      : state.level === 3
      ? 250
      : state.level === 4
      ? 500
      : 1000;

  const progress =
    nextLevelXp === prevLevelXp
      ? 1
      : (state.xp - prevLevelXp) / (nextLevelXp - prevLevelXp);

  return (
    <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
      <div className="flex flex-col leading-tight">
        <span className="text-xs text-gray-400">Lernstatus</span>
        <span className="text-sm text-white">
          Level {state.level} · {state.xp} XP
        </span>
      </div>
      <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full bg-aems-neon"
          style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
        />
      </div>
    </div>
  );
}
