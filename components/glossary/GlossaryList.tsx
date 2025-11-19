"use client";

import React from "react";
import AEMSCard from "@/components/AEMSCard";
import AEMSSection from "@/components/AEMSSection";

export type GlossaryItem = {
  term: string;
  simple: string;
  detail: string;
  aems: string;
  category: string;
};

export default function GlossaryList({ items }: { items: GlossaryItem[] }) {
  return (
    <AEMSSection title="Begriffe von A–Z">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, i) => (
          <AEMSCard key={i} className="p-5 space-y-2">
            <div className="text-lg text-aems-neon font-semibold">
              {item.term}
            </div>

            <div className="text-sm text-gray-300">
              {item.simple}
            </div>

            <div className="text-xs text-gray-400">
              {item.detail}
            </div>

            <div className="text-xs text-aems-soft">
              <strong>AEMS:</strong> {item.aems}
            </div>

            <div className="text-[10px] text-gray-500 pt-1">
              Kategorie: {item.category}
            </div>
          </AEMSCard>
        ))}
      </div>
    </AEMSSection>
  );
}
