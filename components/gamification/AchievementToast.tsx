"use client";

import React, { useEffect, useState } from "react";
import {
  BadgeId,
  getBadgeDefinition,
} from "@/lib/gamification/xp";

type ToastState = {
  badgeId: BadgeId;
  visible: boolean;
};

export default function AchievementToast() {
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    const handler = (event: Event) => {
      const custom = event as CustomEvent<BadgeId[]>;
      const newly = custom.detail;
      if (!newly || newly.length === 0) return;

      // Zeige jeweils den zuletzt freigeschalteten Badge
      const last = newly[newly.length - 1];
      setToast({
        badgeId: last,
        visible: true,
      });

      // Automatisch nach 4 Sekunden ausblenden
      const timeout = setTimeout(() => {
        setToast((prev) =>
          prev && prev.badgeId === last ? { ...prev, visible: false } : prev
        );
      }, 4000);

      return () => clearTimeout(timeout);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("aems-gamification-badges-unlocked", handler);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("aems-gamification-badges-unlocked", handler);
      }
    };
  }, []);

  if (!toast || !toast.visible) return null;

  const def = getBadgeDefinition(toast.badgeId);
  if (!def) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="rounded-2xl border border-aems-neon/40 bg-[#031f1f]/95 px-4 py-3 shadow-lg shadow-aems-neon/20 max-w-xs">
        <div className="text-xs text-aems-neon mb-1">Neue Auszeichnung</div>
        <div className="text-sm font-semibold text-white">{def.title}</div>
        <div className="text-xs text-gray-300 mt-1">{def.description}</div>
      </div>
    </div>
  );
}
