export type DashboardKpi = {
  key: string;
  label: string;
  value: number;
  status: string;
  description: string;
};

export type DashboardTrend = {
  values: number[];
  uncertaintyBand: [number, number][];
  shocks: number[];
};

export type DashboardZone = {
  title: string;
  status: "hoch" | "mittel" | "niedrig";
  bullets: string[];
};

export type DashboardRecommendation = {
  title: string;
  why: string;
  what: string;
  howLabel: string;
  whatIf: string;
};

export const mockKpis: DashboardKpi[] = [
  {
    key: "resilience",
    label: "Resilienz",
    value: 76,
    status: "robust",
    description: "Reagiert stabil auf Stress."
  },
  {
    key: "stability",
    label: "Stabilität",
    value: 66,
    status: "fragil",
    description: "Spitzenlast macht das System störanfällig."
  },
  {
    key: "adaptivity",
    label: "Adaptivität",
    value: 51,
    status: "leicht antifragil",
    description: "Nutzt Schwankungen teilweise zu seinem Vorteil."
  },
  {
    key: "efficiency",
    label: "Effizienz",
    value: 84,
    status: "sehr hoch",
    description: "Energie wird wirksam und verlustarm eingesetzt."
  }
];

const baseValues = [
  72, 73, 71, 72, 74, 75, 76, 75, 74, 73,
  72, 71, 69, 62, 64, 66, 68, 69, 70, 71,
  72, 73, 72, 71, 68, 70, 72, 73, 74, 75
];

export const mockTrend: DashboardTrend = {
  values: baseValues,
  uncertaintyBand: baseValues.map((v) => [v - 3, v + 3]),
  shocks: [13, 24]
};

export const mockZones: DashboardZone[] = [
  {
    title: "Versorgungssicherheit",
    status: "mittel",
    bullets: ["Lieferabhängigkeit hoch", "Spitzenlast instabil", "Redundanzen begrenzt"]
  },
  {
    title: "Kostenstruktur",
    status: "hoch",
    bullets: [
      "Preisvolatilität hoch",
      "Blindleistungskosten steigen",
      "Kostentreiber wirken parallel"
    ]
  },
  {
    title: "CO₂e-Profil",
    status: "niedrig",
    bullets: [
      "Scope-2 stabil",
      "Effizienzmaßnahmen sichtbar",
      "Scope-1 abhängig vom Beschaffungsmix"
    ]
  }
];

export const mockRecommendations: DashboardRecommendation[] = [
  {
    title: "Lastverschiebung im Abendfenster optimieren",
    why: "Spitzenlasten erhöhen Kosten und belasten die Systemstabilität.",
    what: "Analysieren Sie das Zeitfenster 18–22 Uhr und prüfen Sie mögliche Lastverschiebung.",
    howLabel: "Analyse öffnen",
    whatIf: "Ohne Anpassung steigt das Kostenrisiko um bis zu 20 %."
  },
  {
    title: "Förderpotenziale nutzen",
    why: "Viele Effizienzmaßnahmen werden aktuell hoch gefördert.",
    what: "Prüfen Sie die Fördermöglichkeiten für Standort A.",
    howLabel: "Förderübersicht öffnen",
    whatIf: "Bis zu 70.000 € Fördervolumen könnten verloren gehen."
  },
  {
    title: "Beschaffungsstrategie stabilisieren",
    why: "Preisvolatilität und Schockereignisse haben zugenommen.",
    what: "Überdenken Sie die Vertragslaufzeiten und Diversifikation im Beschaffungsmix.",
    howLabel: "Simulation starten",
    whatIf: "Das Hochrisiko-Szenario kann um 30–40 % entschärft werden."
  }
];
