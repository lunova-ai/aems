// lib/recommendations/generator.ts
"use client";

export type AemsRecommendation = {
  title: string;
  why: string;
  what: string;
  actionLabel: string;
  actionHref: string;
  riskInfo?: string;
  priority?: number; // Neu: interne Gewichtung
};

export type SystemStatus = {
  resilienz: number;     // 0–100
  stabilität: number;    // 0–100
  adaptivität: number;   // 0–100
  effizienz: number;     // 0–100
};

/**
 * Generator für adaptive AEMS-Empfehlungen
 * Regeln:
 * - Schwellenwerte < 60 = kritisch
 * - Schwellenwerte 60–70 = erhöht
 * - Empfohlene Items werden nach Relevanz sortiert
 */
export function generateRecommendations(status: SystemStatus): AemsRecommendation[] {
  const recs: AemsRecommendation[] = [];

  const { resilienz, stabilität, adaptivität, effizienz } = status;

  // -------------------------------------------------------------
  // 🔥 1) Niedrige Stabilität → Regelkreise & Engpässe
  // -------------------------------------------------------------
  if (stabilität < 60) {
    recs.push({
      title: "Stabilitätsschwankungen entschärfen",
      why: "Geringe Stabilität erhöht das Risiko für Engpässe, Ausfälle und Preisspitzen.",
      what: "Prüfen Sie Regelkreise, Spitzenlastfenster und kritische Sensitivitäten.",
      actionLabel: "Stabilitätscheck öffnen",
      actionHref: "/analysis",
      riskInfo: "Instabile Regelkreise können zu +20–30 % Kostenrisiko führen.",
      priority: 10,
    });
  } else if (stabilität < 70) {
    recs.push({
      title: "Stabilität steigern",
      why: "Mittlere Stabilität zeigt, dass das System noch empfindlich reagiert.",
      what: "Identifizieren Sie Teilsysteme mit hoher Schwankungsanfälligkeit.",
      actionLabel: "Analyse öffnen",
      actionHref: "/analysis",
      priority: 6,
    });
  }

  // -------------------------------------------------------------
  // 🔥 2) Niedrige Adaptivität → Lastverschiebung / Szenarien
  // -------------------------------------------------------------
  if (adaptivität < 60) {
    recs.push({
      title: "Adaptivität stärken",
      why: "Geringe Adaptivität erschwert Reaktionen auf Volatilität und Schockereignisse.",
      what: "Untersuchen Sie das Abendfenster 18–22 Uhr und testen Sie Szenarien im Simulator.",
      actionLabel: "Analyse öffnen",
      actionHref: "/analysis",
      riskInfo: "Schockszenarien verursachen bis zu +40 % Mehrkosten.",
      priority: 9,
    });
  } else if (adaptivität < 70) {
    recs.push({
      title: "Adaptivität weiterentwickeln",
      why: "Das System reagiert teils adaptiv, lässt aber Lernpotenziale ungenutzt.",
      what: "Führen Sie regelmäßige Szenarioanalysen für kritische Zeitfenster durch.",
      actionLabel: "Simulation starten",
      actionHref: "/simulation",
      priority: 5,
    });
  }

  // -------------------------------------------------------------
  // 🔥 3) Effizienz niedrig → Förderprogramme & Quick Wins
  // -------------------------------------------------------------
  if (effizienz < 60) {
    recs.push({
      title: "Effizienzpotenziale erschließen",
      why: "Niedrige Effizienz deutet auf hohe Energieintensität und unnötige Verluste hin.",
      what: "Prüfen Sie geförderte Maßnahmen für Wärme, Beleuchtung und Lastmanagement.",
      actionLabel: "Förderübersicht öffnen",
      actionHref: "/executive",
      riskInfo: "Verlorene Förderungen: 20.000–80.000 € pro Standort.",
      priority: 9,
    });
  } else if (effizienz < 70) {
    recs.push({
      title: "Effizienzprogramme präzisieren",
      why: "Moderate Effizienz zeigt, dass wirtschaftliche Quick Wins verfügbar sind.",
      what: "Vergleichen Sie standortspezifische Intensitäten und priorisieren Sie Maßnahmen.",
      actionLabel: "Analyse öffnen",
      actionHref: "/analysis",
      priority: 6,
    });
  }

  // -------------------------------------------------------------
  // 🔥 4) Resilienz niedrig → Beschaffung & Diversifikation
  // -------------------------------------------------------------
  if (resilienz < 60) {
    recs.push({
      title: "Resilienz der Beschaffung stärken",
      why: "Niedrige Resilienz macht das Energiesystem anfällig für Markt- und Versorgungsschocks.",
      what: "Überdenken Sie Vertragslaufzeiten, Lieferantenmix und Hedging-Strategien.",
      actionLabel: "Simulation starten",
      actionHref: "/simulation",
      riskInfo: "Schockfolgen können um 30–40 % reduziert werden.",
      priority: 10,
    });
  } else if (resilienz < 70) {
    recs.push({
      title: "Resilienzpotenziale aktivieren",
      why: "Das System ist stabil, aber noch nicht schockrobust.",
      what: "Analysieren Sie Schwachstellen in Beschaffung, Laststeuerung und Wärmerückgewinnung.",
      actionLabel: "Analyse öffnen",
      actionHref: "/analysis",
      priority: 6,
    });
  }

  // -------------------------------------------------------------
  // FALLBACK – Immer mindestens 1 Empfehlung
  // -------------------------------------------------------------
  if (recs.length === 0) {
    recs.push({
      title: "Optimierungsmöglichkeiten entdecken",
      why: "Das System zeigt stabile Werte, bietet aber weiteres Potenzial.",
      what: "Analysieren Sie Lastmuster, Preisfenster und Förderoptionen.",
      actionLabel: "Analyse öffnen",
      actionHref: "/analysis",
      priority: 1,
    });
  }

  // -------------------------------------------------------------
  // Sortiert nach Priorität (höchste zuerst)
  // -------------------------------------------------------------
  return recs
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
    .slice(0, 6);
}
