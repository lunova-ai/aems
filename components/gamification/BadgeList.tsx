"use client";

import React, { useEffect, useState } from "react";
import {
  GamificationState,
  loadGamificationState,
  BADGE_DEFINITIONS,
} from "@/lib/gamification/xp";

export default function BadgeList() {
  const [state, setState] = useState<GamificationState | null>(null);

  useEffect(() => {
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

  const unlocked = new Set(state.unlockedBadges);

  const visibleBadges = BADGE_DEFINITIONS.filter((b) =>
    unlocked.has(b.id)
  );

  if (visibleBadges.length === 0) {
    return (
      <div className="text-xs text-gray-400">
        Noch keine Auszeichnungen – durch aktive Nutzung werden hier erste
        Lernfortschritte sichtbar.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {visibleBadges.map((badge) => (
        <div
          key={badge.id}
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2"
        >
          <div className="text-xs text-gray-400">{badge.category}</div>
          <div className="text-sm font-semibold text-white">{badge.title}</div>
          <div className="text-xs text-gray-300 mt-1">{badge.description}</div>
        </div>
      ))}
    </div>
  );
}
