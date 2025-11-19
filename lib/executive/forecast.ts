// lib/executive/forecast.ts
"use client";

/* ------------------------------------------------------------------
 * TYPES
 * ------------------------------------------------------------------ */
export type TimePoint = {
  label: string;   // z.B. "M-3", "M0", "+1"
  value: number;   // z.B. 120 (kWh/Einheit)
};

export type ForecastSeries = {
  name: string;
  unit: string;
  history: TimePoint[];
  forecast: TimePoint[];
};

/* ------------------------------------------------------------------
 * HELPER — SMOOTH MOVING AVERAGE
 * ------------------------------------------------------------------ */
function movingAverage(points: TimePoint[], window = 3): number {
  const slice = points.slice(-window);
  if (slice.length === 0) return 0;

  const sum = slice.reduce((acc, p) => acc + p.value, 0);
  return sum / slice.length;
}

/* ------------------------------------------------------------------
 * FORECASTING ENGINE (simple, heuristisch, stabil)
 * ------------------------------------------------------------------
 * - basiert auf letzten 3 Punkten (MA3)
 * - dynamischer Drift: erkennt Trendlast
 * - verhindert negative Werte
 * - Management-tauglich, kein ML-Modell
 * ------------------------------------------------------------------ */
function forecastSimple(
  history: TimePoint[],
  steps = 3,
  drift = 0.02     // Grunddrift pro Schritt
): TimePoint[] {
  if (history.length < 3) return [];

  const ma3 = movingAverage(history, 3);
  const last = history[history.length - 1];

  // Trendbestimmung (leicht)
  const trend = last.value - history[history.length - 2].value;
  const trendFactor = trend / (last.value || 1); // Anteil

  // finaler Drift pro Schritt
  // POSITIV + NEGATIV möglich, aber moderat
  const effectiveDrift = drift + trendFactor * 0.5;

  const result: TimePoint[] = [];

  for (let i = 1; i <= steps; i++) {
    const value = ma3 * (1 + effectiveDrift * i);

    result.push({
      label: `+${i}`,
      value: Math.max(0, Math.round(value * 10) / 10), // niemals negativ
    });
  }

  return result;
}

/* ------------------------------------------------------------------
 * ENERGY INTENSITY SERIES
 * ------------------------------------------------------------------ */
export function getEnergyIntensitySeries(): ForecastSeries {
  const history: TimePoint[] = [
    { label: "M-11", value: 101 },
    { label: "M-10", value: 104 },
    { label: "M-9", value: 107 },
    { label: "M-8", value: 109 },
    { label: "M-7", value: 111 },
    { label: "M-6", value: 113 },
    { label: "M-5", value: 115 },
    { label: "M-4", value: 118 },
    { label: "M-3", value: 120 },
    { label: "M-2", value: 121 },
    { label: "M-1", value: 123 },
    { label: "M0", value: 124 },
  ];

  const forecast = forecastSimple(history, 3, 0.015);

  return {
    name: "Energieintensität",
    unit: "kWh/Einheit",
    history,
    forecast,
  };
}

/* ------------------------------------------------------------------
 * COST PER MWh SERIES
 * ------------------------------------------------------------------ */
export function getCostPerMWhSeries(): ForecastSeries {
  const history: TimePoint[] = [
    { label: "M-11", value: 102 },
    { label: "M-10", value: 106 },
    { label: "M-9", value: 110 },
    { label: "M-8", value: 115 },
    { label: "M-7", value: 120 },
    { label: "M-6", value: 122 },
    { label: "M-5", value: 125 },
    { label: "M-4", value: 127 },
    { label: "M-3", value: 129 },
    { label: "M-2", value: 131 },
    { label: "M-1", value: 134 },
    { label: "M0", value: 136 },
  ];

  const forecast = forecastSimple(history, 3, 0.02);

  return {
    name: "Kosten pro MWh",
    unit: "€/MWh",
    history,
    forecast,
  };
}

/* ------------------------------------------------------------------
 * RISK INDEX SERIES (0–100)
 * ------------------------------------------------------------------ */
export function getRiskIndexSeries(): ForecastSeries {
  const history: TimePoint[] = [
    { label: "M-11", value: 55 },
    { label: "M-10", value: 57 },
    { label: "M-9", value: 59 },
    { label: "M-8", value: 60 },
    { label: "M-7", value: 63 },
    { label: "M-6", value: 65 },
    { label: "M-5", value: 66 },
    { label: "M-4", value: 67 },
    { label: "M-3", value: 69 },
    { label: "M-2", value: 70 },
    { label: "M-1", value: 71 },
    { label: "M0", value: 72 },
  ];

  const forecast = forecastSimple(history, 3, 0.01);

  return {
    name: "Risikoindex",
    unit: "/100",
    history,
    forecast,
  };
}
