// lib/executive/kpi.ts
"use client";

export type KpiStatus = "good" | "medium" | "bad";

export type KpiValue = {
  label: string;
  value: number | string;
  unit?: string;
  trend?: number;         // + = steigt, - = fällt
  status?: KpiStatus;     // automatisch oder manuell gesetzt
};

/* ----------------------------------------------------------
 * AUTOMATISCHE STATUS-LOGIK
 * ---------------------------------------------------------- */
function deriveStatus(label: string, value: number): KpiStatus {
  const normalized = String(label).toLowerCase();

  // Positive KPIs (je höher, desto schlechter)
  if (
    normalized.includes("kosten") ||
    normalized.includes("co₂") ||
    normalized.includes("risiko")
  ) {
    if (value > 120) return "bad";
    if (value > 80) return "medium";
    return "good";
  }

  // Negative KPIs (je höher, desto besser)
  if (normalized.includes("resilienz") || normalized.includes("effizienz")) {
    if (value >= 80) return "good";
    if (value >= 50) return "medium";
    return "bad";
  }

  // Default fallback
  if (value >= 70) return "good";
  if (value >= 40) return "medium";
  return "bad";
}

/* ----------------------------------------------------------
 * KPIs mit automatischer oder manueller Bewertung
 * ---------------------------------------------------------- */
export function computeExecutiveKpis(): KpiValue[] {
  const raw: KpiValue[] = [
    {
      label: "Energieintensität",
      value: 112,
      unit: "kWh/Einheit",
      trend: +3.2,
      status: "medium",
    },
    {
      label: "CO₂-Intensität",
      value: 68,
      unit: "kg/MWh",
      trend: -1.1,
      status: "good",
    },
    {
      label: "Kosten pro MWh",
      value: 129,
      unit: "€/MWh",
      trend: +5.8,
      status: "bad",
    },
    {
      label: "Risikoindex",
      value: 71,
      unit: "/100",
      trend: +2.0,
      status: "bad",
    },
    {
      label: "Resilienzindex",
      value: 62,
      unit: "/100",
      trend: +1.4,
      // auto-status (von deriveStatus)
    },
  ];

  return raw.map((kpi) => {
    const v = typeof kpi.value === "number" ? kpi.value : Number(kpi.value);
    return {
      ...kpi,
      status: kpi.status ?? deriveStatus(kpi.label, v),
    };
  });
}
