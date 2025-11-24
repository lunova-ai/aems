// lib/executive/healthIndex.ts
"use client";

import { computeAlerts, AemsAlert } from "./alerts";
import { rootCauseTree } from "@/lib/analysis/rootCause";
import { computeVolatility } from "@/lib/executive/volatility";
import { getForecastConfidence } from "@/lib/executive/forecastConfidence";
import { getCo2Intensity } from "@/lib/executive/co2";
import { getEfficiencyScore, getResilienceScore } from "@/lib/executive/kpis";

/* -------------------------------------------------------
 * Faktor-Gewichtung Health Index 2.0
 * ------------------------------------------------------- */
const WEIGHTS = {
  alerts: 0.35,
  volatility: 0.15,
  forecast: 0.10,
  co2: 0.10,
  efficiency: 0.10,
  resilience: 0.10,
  rootcause: 0.10,
};

/* -------------------------------------------------------
 * Alerts-Bewertung (0 = perfekt, hoch = schlecht)
 * ------------------------------------------------------- */
const ALERT_WEIGHTS: Record<AemsAlert["level"], number> = {
  critical: 10,
  warning: 4,
  info: 0,
};

function scoreAlerts(alerts: AemsAlert[]): number {
  let points = 0;

  // Level-Penalty
  for (const a of alerts) points += ALERT_WEIGHTS[a.level];

  // Dopplungen bestrafen
  const map = new Map<string, number>();
  for (const a of alerts) {
    const count = map.get(a.message) ?? 0;
    map.set(a.message, count + 1);
  }
  for (const count of map.values()) {
    if (count > 1) points += (count - 1) * 2;
  }

  // Trend-Recovery
  const warnings = alerts.filter((a) => a.level === "warning").length;
  const hasCritical = alerts.some((a) => a.level === "critical");
  if (!hasCritical && warnings >= 3) {
    points -= 2; // leichte Erholung
  }

  // Normierung: 0–40 → 0–100
  return Math.min(100, (points / 40) * 100);
}

/* -------------------------------------------------------
 * Root Cause Gewichtung: 
 * Hoher Einfluss + viele Faktoren → schlechter
 * ------------------------------------------------------- */
function scoreRootCause(): number {
  // Summe der Einflussstärken im Baum
  const values: number[] = [];

  const walk = (n: any) => {
    values.push(n.value);
    n.children.forEach(walk);
  };
  walk(rootCauseTree);

  // Durchschnitt normalisieren (0–1 → 0–100)
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  return Math.min(100, avg * 100);
}

/* -------------------------------------------------------
 * Health Index 2.0 (0–100)
 * ------------------------------------------------------- */
export function computeHealthIndex(): number {
  const alerts = computeAlerts();

  const alertScore = scoreAlerts(alerts);                   // 0–100
  const volatility = computeVolatility();                   // 0–1
  const forecast = getForecastConfidence();                 // 0–1
  const co2 = getCo2Intensity();                            // 0–1
  const efficiency = getEfficiencyScore();                  // 0–1
  const resilience = getResilienceScore();                  // 0–1
  const rootCause = scoreRootCause() / 100;                 // 0–1

  // Final Score (multiplikativ gewichtet)
  const score =
    alertScore * WEIGHTS.alerts +
    volatility * 100 * WEIGHTS.volatility +
    (1 - forecast) * 100 * WEIGHTS.forecast +
    (1 - co2) * 100 * WEIGHTS.co2 +
    efficiency * 100 * WEIGHTS.efficiency +
    resilience * 100 * WEIGHTS.resilience +
    rootCause * 100 * WEIGHTS.rootcause;

  return Math.round(score);
}

/* -------------------------------------------------------
 * Health Index 2.0 – Details für Tooltip & UI
 * ------------------------------------------------------- */
export function computeHealthIndexDetails() {
  const alerts = computeAlerts();
  const health = computeHealthIndex();

  const positives: string[] = [];
  const negatives: string[] = [];

  const volatility = computeVolatility();
  const forecast = getForecastConfidence();
  const co2 = getCo2Intensity();
  const efficiency = getEfficiencyScore();
  const resilience = getResilienceScore();

  /* ------------------------------ */
  /* Positiv-Faktoren               */
  /* ------------------------------ */
  if (!alerts.some((a) => a.level === "critical"))
    positives.push("Keine kritischen Systemprobleme aktiv.");

  if (efficiency > 0.7)
    positives.push("Hohe Energieeffizienz stabilisiert den Systemzustand.");

  if (resilience > 0.6)
    positives.push("Gute Resilienz gegenüber Stress & Lastspitzen.");

  if (forecast > 0.55)
    positives.push("Prognosemodell zeigt moderate Sicherheit.");

  /* ------------------------------ */
  /* Negativ-Faktoren               */
  /* ------------------------------ */
  for (const a of alerts) {
    if (a.level === "critical") negatives.push(`Kritisch: ${a.message}`);
    else if (a.level === "warning") negatives.push(`Warnung: ${a.message}`);
  }

  if (volatility > 0.6)
    negatives.push("Hohe Marktvolatilität belastet Stabilität & Budget.");

  if (co2 > 0.6)
    negatives.push("CO₂-Intensität steigt – Nachhaltigkeitsrisiken nehmen zu.");

  if (efficiency < 0.4)
    negatives.push("Niedrige Effizienz verursacht Energieverluste.");

  /* ------------------------------ */
  /* Trendlogik (einfach, erweiterbar) */
  /* ------------------------------ */
  const trend =
    negatives.length >= 3 && positives.length === 0
      ? -4.5
      : positives.length >= 2
      ? +2.8
      : +0.4;

  return { trend, positive: positives, negative: negatives };
}


