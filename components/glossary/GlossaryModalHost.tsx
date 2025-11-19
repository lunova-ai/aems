"use client";

import React, { useEffect, useState } from "react";
import { glossaryTerms } from "@/lib/glossary/terms";

type GlossaryModalState = {
  open: boolean;
  term?: string;
};

export default function GlossaryModalHost() {
  const [state, setState] = useState<GlossaryModalState>({ open: false });

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<{ term: string }>;
      const term = custom.detail?.term;
      if (!term) return;
      setState({ open: true, term });
    };

    window.addEventListener("aems-glossary-open", handler);
    return () => window.removeEventListener("aems-glossary-open", handler);
  }, []);

  if (!state.open || !state.term) return null;

  const entry = glossaryTerms.find(
    (t) => t.term.toLowerCase() === state.term!.toLowerCase()
  );
  if (!entry) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="w-full max-w-lg rounded-2xl bg-[#031f1f] border border-white/10 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-aems-neon">
            {entry.term}
          </h2>
          <button
            onClick={() => setState({ open: false })}
            className="text-gray-400 hover:text-gray-200 text-sm"
          >
            Schließen
          </button>
        </div>

        <div className="space-y-2 text-sm">
          <p className="text-gray-200">{entry.simple}</p>
          <p className="text-xs text-gray-400">{entry.detail}</p>
          <p className="text-xs text-aems-soft">
            <strong>AEMS:</strong> {entry.aems}
          </p>
        </div>

        <div className="mt-3 text-[10px] text-gray-500">
          Kategorie: {entry.category}
        </div>
      </div>
    </div>
  );
}
