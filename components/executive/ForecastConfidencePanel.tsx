"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";
import ProgressRing from "@/components/ProgressRing";

export default function ForecastConfidencePanel() {
  const confidence = 0.52;

  return (
    <AEMSSection title="Forecast Confidence">
      <AEMSCard className="flex items-center gap-4 p-6">
        <ProgressRing value={confidence * 100} size={60} strokeWidth={6} color="#12C7A5" />

        <div>
          <div className="text-white font-semibold">
            {(confidence * 100).toFixed(0)}%
          </div>
          <div className="text-xs text-gray-400">
            Modellunsicherheit aus historischen Schwankungen & Marktvolatilität.
          </div>
        </div>
      </AEMSCard>
    </AEMSSection>
  );
}
