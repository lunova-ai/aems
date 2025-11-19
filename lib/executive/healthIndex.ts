// lib/executive/healthIndex.ts
"use client";

import { computeAlerts, AemsAlert } from "./alerts";

/**
 * Gewichtung der Alert-Level (bei Bedarf erweiterbar)
 */
const LEVEL_WEIGHTS: Record<AemsAlert["level"], number> = {
  critical: 10,
  warning: 4,
  info: 0,
};

/**
 * Zusatzlogik: wiederkehrende Alerts (gleiches Thema) wirken stärker.
 */
function penalizeDuplicates(alerts: AemsAlert[]): number {
  const messageMap = new Map<string, number>();

  alerts.forEach(a => {
    const count = messageMap.get(a.message) ?? 0;
    messageMap.set(a.message, count + 1);
  });

  let penalty = 0;
  messageMap.forEach(count => {
    if (count > 1) penalty += (count - 1) * 2;
  });

  return penalty;
}

/**
 * Zusatzlogik: leichte Trendkorrektur (falls viele Warnungen von heute „info“ waren)
 */
function computeTrendRecovery(alerts: AemsAlert[]): number {
  const hasCritical = alerts.some(a => a.level === "critical");
  const hasManyWarnings = alerts.filter(a => a.level === "warning").length >= 3;

  if (!hasCritical && hasManyWarnings) {
    return +2; // leichte Erholung
  }
  return 0;
}

/**
 * Health Index 0–100
 * Basierend auf:
 *  - Alerts
 *  - Gewichtung der Alert-Level
 *  - Wiederkehrenden Problemen
 *  - Trend-Recovery
 */
export function computeHealthIndex(): number {
  const alerts = computeAlerts();
  
  let score = 75; // Basiswert

  // 1) Gewichte pro Alert-Level
  alerts.forEach(a => {
    score -= LEVEL_WEIGHTS[a.level];
  });

  // 2) Dopplungen bestrafen
  score -= penalizeDuplicates(alerts);

  // 3) Trend-Recovery
  score += computeTrendRecovery(alerts);

  // 4) Clamp 0–100
  return Math.min(100, Math.max(0, score));
}

