"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";
import { computeHealthIndex } from "@/lib/executive/healthIndex";

export default function HealthIndexCard() {
  const score = computeHealthIndex();

  const color =
    score > 70 ? "text-aems-neon" :
    score > 40 ? "text-yellow-300" :
    "text-red-400";

  return (
    <AEMSSection title="AEMS Health Index">
      <AEMSCard className="p-6 text-center">
        <div className={`text-5xl font-bold ${color}`}>{score}</div>
        <div className="text-sm text-gray-400 mt-2">Systemgesundheit (0–100)</div>
      </AEMSCard>
    </AEMSSection>
  );
}
