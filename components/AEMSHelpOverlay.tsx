"use client";

import React, { useEffect, useCallback } from "react";
import AEMSCard from "./AEMSCard";

// --------------------------------------------------
// TYPE DEFINITIONS
// --------------------------------------------------
type HelpOverlayProps = {
  visible: boolean;
  title: string | React.ReactNode;
  text: string | React.ReactNode;
  onClose: () => void;
  closeOnBackdrop?: boolean;
};

// --------------------------------------------------
// MAIN COMPONENT
// --------------------------------------------------
export default function HelpOverlay({
  visible,
  title,
  text,
  onClose,
  closeOnBackdrop = true,
}: HelpOverlayProps) {
  // --------------------------------------------------
  // ESC KEY HANDLER → Close Overlay
  // --------------------------------------------------
  useEffect(() => {
    if (!visible) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [visible, onClose]);

  // --------------------------------------------------
  // BACKDROP CLICK HANDLER
  // --------------------------------------------------
  const handleBackdrop = useCallback(() => {
    if (closeOnBackdrop) onClose();
  }, [closeOnBackdrop, onClose]);

  if (!visible) return null;

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------
  return (
    <div
      className="
        fixed inset-0 z-50 flex items-center justify-center
        bg-black/70 backdrop-blur-md
        animate-fadeIn
      "
      onClick={handleBackdrop}
    >
      <AEMSCard
        className="
          relative max-w-lg w-[90%] p-8 
          animate-scaleIn
        "
        // Strict-mode-safe: kein Typ erzwingen → TS leitet korrekt ab
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="
            absolute top-3 right-3 
            text-gray-400 hover:text-white 
            text-lg
          "
          aria-label="Overlay schließen"
        >
          ×
        </button>

        {/* TITLE */}
        <h2 className="text-xl mb-4 text-white font-semibold">{title}</h2>

        {/* TEXT */}
        <div className="text-gray-200 mb-4 leading-relaxed text-sm">
          {text}
        </div>

        {/* ACTION */}
        <button
          onClick={onClose}
          className="
            text-aems-neon hover:text-aems-soft
            font-medium mt-2
          "
        >
          schließen
        </button>
      </AEMSCard>
    </div>
  );
}
