"use client";

import React, { useMemo, useState } from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";
import AEMSButton from "@/components/AEMSButton";
import { awardXp } from "@/lib/gamification/xp";

type Distribution = "normal" | "lognormal" | "uniform" | "triangular";

function generateSamples(
  iterations: number,
  distribution: Distribution,
  mean: number,
  stdDev: number
): number[] {
  const samples: number[] = [];
  for (let i = 0; i < iterations; i++) {
    let value = mean;
    if (distribution === "normal") {
      // Box–Muller
      const u1 = Math.random() || 0.0001;
      const u2 = Math.random() || 0.0001;
      const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
      value = mean + stdDev * z;
    } else if (distribution === "lognormal") {
      const u1 = Math.random() || 0.0001;
      const u2 = Math.random() || 0.0001;
      const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
      const m = Math.log(mean) - 0.5 * Math.log(1 + (stdDev * stdDev) / (mean * mean));
      const s = Math.sqrt(Math.log(1 + (stdDev * stdDev) / (mean * mean)));
      value = Math.exp(m + s * z);
    } else if (distribution === "uniform") {
      value = mean - stdDev + Math.random() * (2 * stdDev);
    } else if (distribution === "triangular") {
      const min = mean - stdDev;
      const max = mean + stdDev;
      const mode = mean;
      const u = Math.random();
      if (u < (mode - min) / (max - min)) {
        value = min + Math.sqrt(u * (max - min) * (mode - min));
      } else {
        value = max - Math.sqrt((1 - u) * (max - min) * (max - mode));
      }
    }
    samples.push(value);
  }
  return samples;
}

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  const idx = (p / 100) * (sorted.length - 1);
  const lower = Math.floor(idx);
  const upper = Math.ceil(idx);
  const weight = idx - lower;
  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}

export default function MonteCarloSimulator() {
  const [iterations, setIterations] = useState(2000);
  const [distribution, setDistribution] = useState<Distribution>("normal");
  const [meanCost, setMeanCost] = useState(180);
  const [stdDev, setStdDev] = useState(25);
  const [hasRun, setHasRun] = useState(false);

  const { p10, p50, p90, samples } = useMemo(() => {
    const sims = generateSamples(iterations, distribution, meanCost, stdDev).sort(
      (a, b) => a - b
    );
    return {
      samples: sims,
      p10: percentile(sims, 10),
      p50: percentile(sims, 50),
      p90: percentile(sims, 90),
    };
  }, [iterations, distribution, meanCost, stdDev]);

  const handleRun = () => {
    setHasRun(true);
    awardXp("simulation_run");
  };

  const min = samples[0] ?? meanCost - stdDev;
  const max = samples[samples.length - 1] ?? meanCost + stdDev;
  const width = 260;
  const height = 80;
  const padding = 10;

  const scaleX = (val: number) =>
    padding +
    ((val - min) / (max - min || 1)) * (width - 2 * padding);

  return (
    <AEMSSection title="Monte Carlo Simulation – Energiekosten">
      <AEMSCard className="p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-xs text-gray-400 mb-1">Iterationen</div>
            <input
              type="range"
              min={500}
              max={10000}
              step={500}
              value={iterations}
              onChange={(e) => setIterations(parseInt(e.target.value, 10))}
              className="w-full"
            />
            <div className="text-xs text-gray-300 mt-1">{iterations.toLocaleString()} Läufe</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Verteilung</div>
            <select
              value={distribution}
              onChange={(e) => setDistribution(e.target.value as Distribution)}
              className="w-full bg-white/5 border border-white/10 rounded-md px-2 py-1 text-xs text-gray-100"
            >
              <option value="normal">Normalverteilung</option>
              <option value="lognormal">Lognormal</option>
              <option value="uniform">Gleichverteilung</option>
              <option value="triangular">Dreiecksverteilung</option>
            </select>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Erwartungswert (€/MWh)</div>
            <input
              type="number"
              value={meanCost}
              onChange={(e) => setMeanCost(parseFloat(e.target.value))}
              className="w-full bg-white/5 border border-white/10 rounded-md px-2 py-1 text-xs text-gray-100"
            />
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Streuung (€/MWh)</div>
            <input
              type="number"
              value={stdDev}
              onChange={(e) => setStdDev(parseFloat(e.target.value))}
              className="w-full bg-white/5 border border-white/10 rounded-md px-2 py-1 text-xs text-gray-100"
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 mt-2">
          <div className="flex gap-6 text-sm">
            <div>
              <div className="text-xs text-gray-400">P10 (optimistisch)</div>
              <div className="text-sm text-emerald-300">
                {p10.toFixed(1)} €/MWh
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400">P50 (Median)</div>
              <div className="text-sm text-gray-100">
                {p50.toFixed(1)} €/MWh
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400">P90 (konservativ)</div>
              <div className="text-sm text-red-300">
                {p90.toFixed(1)} €/MWh
              </div>
            </div>
          </div>

          <AEMSButton variant="primary" onClick={handleRun}>
            Simulation aktualisieren
          </AEMSButton>
        </div>

        <div className="mt-4">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-20 bg-white/5 rounded-lg"
          >
            {/* Achse */}
            <line
              x1={padding}
              y1={height - padding}
              x2={width - padding}
              y2={height - padding}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth={1}
            />
            {/* Marker P10, P50, P90 */}
            {[p10, p50, p90].map((v, i) => (
              <line
                key={i}
                x1={scaleX(v)}
                x2={scaleX(v)}
                y1={height - padding}
                y2={padding}
                stroke={
                  i === 0 ? "#22c55e" : i === 1 ? "#e5e7eb" : "#f97373"
                }
                strokeWidth={i === 1 ? 2 : 1}
                strokeDasharray={i === 1 ? "4 2" : "2 3"}
              />
            ))}
          </svg>
          <p className="mt-2 text-xs text-gray-400">
            Die Monte Carlo Simulation zeigt eine Bandbreite möglicher Energiekosten.
            P10–P90 helfen bei Budgetplanung, Risikobewertung und Vertragsstrategien.
          </p>
        </div>

        {hasRun && (
          <p className="text-xs text-aems-soft">
            Simulation durchgeführt – Ergebnis kann als Szenario im Executive Dashboard
            dokumentiert werden.
          </p>
        )}
      </AEMSCard>
    </AEMSSection>
  );
}
