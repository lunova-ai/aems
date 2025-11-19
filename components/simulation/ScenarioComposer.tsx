"use client";

import React, { useMemo, useState } from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";

type SliderConfig = {
  id: keyof ScenarioInputs;
  label: string;
  unit: string;
  min: number;
  max: number;
};

type ScenarioInputs = {
  tempDelta: number;
  peakLoadDelta: number;
  volatilityDelta: number;
  co2Bias: number;
  savings: number;
};

const sliders: SliderConfig[] = [
  { id: "tempDelta", label: "Temperaturänderung", unit: "°C", min: -5, max: 5 },
  { id: "peakLoadDelta", label: "Spitzenlast", unit: "%", min: -20, max: 20 },
  { id: "volatilityDelta", label: "Preisvolatilität", unit: "%", min: -20, max: 20 },
  { id: "co2Bias", label: "CO₂-Optimierung", unit: "%", min: 0, max: 30 },
  { id: "savings", label: "Einsparprogramm", unit: "%", min: 0, max: 25 },
];

export default function ScenarioComposer() {
  const [inputs, setInputs] = useState<ScenarioInputs>({
    tempDelta: 0,
    peakLoadDelta: 0,
    volatilityDelta: 0,
    co2Bias: 10,
    savings: 5,
  });

  const impact = useMemo(() => {
    const costDelta =
      inputs.peakLoadDelta * 0.4 +
      inputs.volatilityDelta * 0.4 -
      inputs.savings * 0.5;
    const riskDelta =
      inputs.volatilityDelta * 0.5 +
      inputs.peakLoadDelta * 0.3 -
      inputs.co2Bias * 0.2;
    const resilienceDelta =
      inputs.co2Bias * 0.5 +
      inputs.savings * 0.3 -
      Math.max(0, inputs.peakLoadDelta) * 0.2;

    return {
      costDelta,
      riskDelta,
      resilienceDelta,
    };
  }, [inputs]);

  return (
    <AEMSSection title="Scenario Composer – Was-wäre-wenn">
      <AEMSCard className="p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Slider */}
          <div className="space-y-4">
            {sliders.map((s) => (
              <div key={s.id}>
                <div className="flex justify-between text-xs text-gray-300 mb-1">
                  <span>{s.label}</span>
                  <span>
                    {inputs[s.id]} {s.unit}
                  </span>
                </div>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  value={inputs[s.id]}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      [s.id]: Number(e.target.value),
                    }))
                  }
                  className="w-full"
                />
              </div>
            ))}
          </div>

          {/* Impact Card */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-4 flex flex-col justify-between">
            <div>
              <div className="text-xs text-gray-400 mb-1">
                Wirkung des Szenarios (vereinfachtes Modell)
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Kosten</span>
                  <span className={impact.costDelta >= 0 ? "text-red-300" : "text-emerald-300"}>
                    {impact.costDelta >= 0 ? "+" : ""}
                    {impact.costDelta.toFixed(1)} %
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Risiko</span>
                  <span className={impact.riskDelta >= 0 ? "text-red-300" : "text-emerald-300"}>
                    {impact.riskDelta >= 0 ? "+" : ""}
                    {impact.riskDelta.toFixed(1)} %
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Resilienz</span>
                  <span className={impact.resilienceDelta >= 0 ? "text-emerald-300" : "text-red-300"}>
                    {impact.resilienceDelta >= 0 ? "+" : ""}
                    {impact.resilienceDelta.toFixed(1)} %
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-3 text-xs text-gray-400">
              Dieses vereinfachte Modell hilft, ein Gefühl für Richtung und Größenordnung
              zu bekommen – perfekte Basis, um anschließend detaillierte Simulationen und
              operative Maßnahmen zu planen.
            </p>
          </div>
        </div>
      </AEMSCard>
    </AEMSSection>
  );
}
