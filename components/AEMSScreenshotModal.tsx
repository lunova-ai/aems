"use client";

import React, { useEffect } from "react";
import AEMSCard from "@/components/AEMSCard";

export default function AEMSScreenshotModal({
  visible,
  onClose
}: {
  visible: boolean;
  onClose: () => void;
}) {
  // ESC zum schließen
  useEffect(() => {
    if (!visible) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div
      className="
        fixed inset-0 
        bg-black/70 
        backdrop-blur-md 
        flex items-center justify-center 
        z-[9999] 
        animate-fadeIn
      "
    >
      <AEMSCard className="p-8 bg-white/10 border-white/20 shadow-xl">
        <div className="flex flex-col items-center gap-4">

          {/* Spinner */}
          <div
            className="
              w-10 h-10 rounded-full 
              border-4 border-aems-neon border-t-transparent 
              animate-spin
            "
          />

          <p className="text-white text-sm text-center">
            Snapshot wird erstellt … bitte warten.
          </p>

          {/* Abbrechen Button */}
          <button
            onClick={onClose}
            className="mt-2 text-xs text-gray-300 hover:text-white transition"
          >
            abbrechen
          </button>
        </div>
      </AEMSCard>
    </div>
  );
}
