// ---------------------------------------------
// DASHBOARD – HOLISTISCHES AEMS-DATENMODELL
// Enthält: KPIs · Trends · Zonen · Empfehlungen
// inkl. A–D (erweitert, Executive, Glossar-ready)
// ---------------------------------------------

export type DashboardKpi = {
  key: string;
  label: string;
  value: number;
  unit?: string;

  status: string;                 // "robust", "fragil", …
  description: string;

  // --- NEU (C: Optische Erweiterung) ---
  trend?: number;                 // +2.1
  trendLabel?: string;            // "steigend", "fallend"
  importance?: "hoch" | "mittel" | "niedrig";
  icon?: string;                  // z.B. "shield", "bolt", "leaf"
  severity?: "good" | "medium" | "bad";

  // --- NEU (D: Glossar-Integration) ---
  glossaryTerms?: string[];       // ["Resilienz", "Spitzenlast"]
};

export type DashboardTrend = {
  values: number[];
  uncertaintyBand: [number, number][];
  shocks: number[];

  // --- NEU ---
  label?: string;
  confidence?: number;            // 0–1
};

export type DashboardZone = {
  title: string;
  status: "hoch" | "mittel" | "niedrig";
  bullets: string[];

  // --- NEU ---
  icon?: string;
  importance?: "hoch" | "mittel" | "niedrig";
  glossaryTerms?: string[];
};

export type DashboardRecommendation = {
  title: string;
  why: string;
  what: string;
  howLabel: string;
  whatIf: string;

  // --- NEU (A+B+C) ---
  impact?: "hoch" | "mittel" | "niedrig";
  difficulty?: "leicht" | "mittel" | "aufwendig";
  category?: "Kosten" | "Resilienz" | "CO₂" | "Effizienz" | "Risiko";
  icon?: string;
  glossaryTerms?: string[];
};
