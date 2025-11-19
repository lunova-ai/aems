// app/glossary/page.tsx
"use client";

import React, { useState, useEffect } from "react";

import LayoutClient from "@/components/layout/LayoutClient";
import AEMSHeader from "@/components/AEMSHeader";

import GlossaryList from "@/components/glossary/GlossaryList";
import { glossaryTerms } from "@/lib/glossary/terms";
import { awardXp } from "@/lib/gamification/xp";

export default function GlossaryPage() {
  const [query, setQuery] = useState("");

  // XP vergeben beim Aufrufen der Seite
  useEffect(() => {
    awardXp("glossary_view");
  }, []);

  const filtered = glossaryTerms.filter((t) =>
    t.term.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <LayoutClient>
      <main className="space-y-12 pt-10 pb-24">

        {/* HEADER */}
        <AEMSHeader
          title="Glossar – Energie, Risiko & Systembegriffe"
          subtitle="Einfach erklärt – für Management, Technik und Nachhaltigkeit."
        />

        {/* SUCHFELD */}
        <div className="w-full md:w-96">
          <input
            type="text"
            placeholder="Begriff suchen…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="
              w-full px-4 py-2 rounded-xl 
              bg-white/5 border border-white/10 
              text-gray-200 placeholder-gray-500
              focus:outline-none focus:border-aems-neon/50
              transition
            "
          />
        </div>

        {/* LISTE */}
        <GlossaryList items={filtered} />
      </main>
    </LayoutClient>
  );
}
