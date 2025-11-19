"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import AEMSCard from "@/components/AEMSCard";
import AEMSSection from "@/components/AEMSSection";

import { parseWithGlossary } from "@/lib/glossary/parser";
import { awardXp } from "@/lib/gamification/xp";
import { generateRecommendations } from "@/lib/recommendations/generator";

export default function DashboardRecommendations() {
  const router = useRouter();
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  // später dynamisch aus KPI & Trend
  const systemStatus = {
    resilienz: 76,
    stabilität: 66,
    adaptivität: 51,
    effizienz: 84,
  };

  const recommendations = generateRecommendations(systemStatus);

  return (
    <AEMSSection title="Empfehlungen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {recommendations.map((rec, i) => (
          <AEMSCard
            key={i}
            className="relative overflow-visible hover:scale-[1.01] transition"
          >
            {/* Titel */}
            <h3 className="text-lg font-semibold text-white mb-2">
              {parseWithGlossary(rec.title)}
            </h3>

            {/* Warum */}
            <p className="text-gray-300 text-sm mb-2 leading-relaxed">
              {parseWithGlossary(`Why: ${rec.why}`)}
            </p>

            {/* Was tun */}
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              {parseWithGlossary(`What: ${rec.what}`)}
            </p>

            {/* Button */}
            <button
              className={`
                w-full py-2 rounded-lg font-semibold
                ${loadingIndex === i
                  ? "bg-gray-400 text-black cursor-wait"
                  : "bg-aems-neon text-black hover:bg-aems-soft transition"
                }
              `}
              disabled={loadingIndex === i}
              onClick={() => {
                awardXp(`rec_${i}`);
                setLoadingIndex(i);
                setTimeout(() => router.push(rec.actionHref), 200);
              }}
            >
              {loadingIndex === i ? "Lädt..." : rec.actionLabel}
            </button>

            {/* Risiko-Info */}
            {rec.riskInfo && (
              <p className="text-gray-400 text-xs mt-4 leading-relaxed">
                {parseWithGlossary(rec.riskInfo)}
              </p>
            )}
          </AEMSCard>
        ))}

      </div>
    </AEMSSection>
  );
}
