"use client";

import React, { useEffect, useState } from "react";
import { BadgeId, getBadgeDefinition } from "@/lib/gamification/xp";

type ToastState = {
  id: number;
  badgeId: BadgeId;
};

export default function AchievementToast() {
  const [queue, setQueue] = useState<ToastState[]>([]);

  useEffect(() => {
    function handler(evt: Event) {
      const custom = evt as CustomEvent<BadgeId[]>;
      const unlocked = custom.detail;
      if (!Array.isArray(unlocked) || unlocked.length === 0) return;

      const last = unlocked[unlocked.length - 1];
      if (!last) return;

      setQueue((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          badgeId: last,
        },
      ]);
    }

    window.addEventListener(
      "aems-gamification-badges-unlocked",
      handler as EventListener
    );
    return () =>
      window.removeEventListener(
        "aems-gamification-badges-unlocked",
        handler as EventListener
      );
  }, []);

  const current = queue[0];
  if (!current) return null;

  const def = getBadgeDefinition(current.badgeId);

  const close = () => {
    setQueue((prev) => prev.slice(1));
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      <button
        onClick={close}
        className="
          px-4 py-3 rounded-xl
          bg-black/80 backdrop-blur-md
          border border-aems-neon/40
          shadow-xl text-left
          text-xs text-gray-200
          hover:border-aems-neon
          transition
        "
      >
        <div className="text-[10px] text-aems-neon uppercase tracking-wide mb-1">
          Neues Badge freigeschaltet
        </div>
        <div className="text-sm font-semibold text-white">
          {def.title}
        </div>
        <div className="mt-1 text-[11px] text-gray-300">
          {def.description}
        </div>
      </button>
    </div>
  );
}
