"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import AEMSCard from "./AEMSCard";

export default function HelpOverlay({
  visible,
  title,
  text,
  onClose
}: {
  visible: boolean;
  title: string;
  text: string;
  onClose: () => void;
}) {
  if (!visible) return null;

  // --- ESC schließen & Scroll Lock ---
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", esc);

    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const overlay = (
    <div
      className="
        fixed inset-0 z-50
        bg-black/70 backdrop-blur-md
        flex items-center justify-center
        animate-fadeIn
      "
      role="dialog"
      aria-modal="true"
    >
      <AEMSCard className="max-w-lg p-8 bg-white/10 border border-white/20">
        <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>

        <p className="text-gray-200 mb-6 leading-relaxed whitespace-pre-line">
          {text}
        </p>

        <button
          onClick={onClose}
          className="text-aems-neon hover:text-aems-soft text-sm"
        >
          Schließen
        </button>
      </AEMSCard>
    </div>
  );

  // Damit Overlay niemals Hydration bricht → immer auf body mounten
  return typeof document !== "undefined"
    ? createPortal(overlay, document.body)
    : null;
}
