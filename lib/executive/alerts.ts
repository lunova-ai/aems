// lib/executive/alerts.ts
"use client";

export type AemsAlertLevel = "info" | "warning" | "critical";

export type AemsAlert = {
  level: AemsAlertLevel;
  message: string;
  detail?: string;
  timestamp?: string;      // optional: für Historie oder Logging
  source?: string;         // optional: Heatmap, Forecast, Sensor, API …
};

/**
 * computeAlerts()
 * Liefert aktuelle Systemwarnungen für das Executive Cockpit.
 */
export function computeAlerts(): AemsAlert[] {
  return [
    {
      level: "critical",
      message: "Ungewöhnliche Lastspitze festgestellt",
      detail: "Peak +23% über dem Monatsmittelwert.",
      timestamp: new Date().toISOString(),
      source: "Lastmonitoring"
    },
    {
      level: "warning",
      message: "Preisschwankung erhöht",
      detail: "Volatilitätsindex über Schwelle (VIX > 0.45).",
      timestamp: new Date().toISOString(),
      source: "Marktdaten"
    },
    {
      level: "info",
      message: "CO₂-Intensität rückläufig",
      detail: "Trend -1.1% gegenüber Vormonat.",
      timestamp: new Date().toISOString(),
      source: "CO₂-Modell"
    }
  ];
}
