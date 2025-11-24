// lib/dashboard/dashboardModel.ts

// ---------------------------------------------
// TYPE: KPI
// ---------------------------------------------
export type DashboardKpi = {
  key: string;
  label: string;
  value: number;
  unit?: string;

  status: string;
  description: string;

  trend?: number;
  trendLabel?: string;

  icon?: string;
  severity?: "good" | "medium" | "bad";

  glossaryTerms?: string[];
};

// ---------------------------------------------
// TYPE: Trend
// ---------------------------------------------
export type DashboardTrend = {
  values: number[];
  uncertaintyBand: [number, number][];
  shocks: number[];

  label?: string;
  confidence?: number;
};

// ---------------------------------------------
// TYPE: Zonen
// ---------------------------------------------
export type DashboardZone = {
  title: string;
  status: "hoch" | "mittel" | "niedrig";
  bullets: string[];

  icon?: string;
  priority?: "hoch" | "mittel" | "niedrig";
  glossaryTerms?: string[];
};

// ---------------------------------------------
// TYPE: Empfehlungen
// ---------------------------------------------
export type DashboardRecommendation = {
  title: string;
  why: string;
  what: string;
  howLabel: string;
  whatIf: string;

  impact?: "hoch" | "mittel" | "niedrig";
  difficulty?: "leicht" | "mittel" | "aufwendig";
  category?: "Kosten" | "Resilienz" | "CO₂" | "Effizienz" | "Risiko";
  icon?: string;
  glossaryTerms?: string[];
};
