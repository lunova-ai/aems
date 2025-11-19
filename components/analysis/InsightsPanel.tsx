// components/analysis/InsightsPanel.tsx
"use client";

import React from "react";

import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";

import { buildDetailedInsights } from "@/lib/analysis/insights";
import { parseWithGlossaryInline } from "@/lib/glossary/parser";
import { awardXp } from "@/lib/gamification/xp";

export default function InsightsPanel() {
  const sections = buildDetailedInsights();

  return (
    <AEMSSection title="Automatische Insights & Empfehlungen">
      <AEMSCard>
        <div className="space-y-8">

          {sections.map((section, i) => (
            <div key={i} className="space-y-3">

              {/* Abschnittstitel */}
              <h3 className="text-sm font-semibold text-aems-neon tracking-wide">
                {parseWithGlossaryInline(section.title)}
              </h3>

              {/* Bullet-Liste */}
              <ul className="space-y-1 text-sm text-gray-300 leading-relaxed">
                {section.bullets.map((bullet, idx) => (
                  <li
                    key={idx}
                    className="
                      flex items-start gap-2 group cursor-pointer
                      hover:text-white transition-colors
                    "
                    onClick={() => awardXp("insight_view")}
                  >
                    <span className="text-aems-neon mt-[3px]">•</span>

                    {/* Tooltip-freundlicher Textblock */}
                    <span className="group-hover:text-aems-neon transition-colors">
                      {parseWithGlossaryInline(bullet)}
                    </span>
                  </li>
                ))}
              </ul>

            </div>
          ))}

          {/* Footer */}
          <div className="pt-4 text-xs text-gray-400 leading-relaxed border-t border-white/10 mt-6">
            {parseWithGlossaryInline(
              "Diese Hinweise werden automatisch anhand Ihrer aktuellen Heatmap-, Korrelations- und Ursachen-Daten generiert und dienen als Ausgangspunkt für weiterführende Entscheidungen im Energiemanagement."
            )}
          </div>

        </div>
      </AEMSCard>
    </AEMSSection>
  );
}

