// lib/insights/executive.ts

export type ExecutiveMetrics = {
  resilience: number;          // 0–1
  stability: number;           // 0–1
  adaptability: number;        // 0–1
  efficiency: number;          // 0–1
  costRisk: number;            // 0–1
  volatility: number;          // 0–1
  forecastConfidence: number;  // 0–1
  co2Intensity: number;        // 0–1
  stressIndex: number;         // 0–1
};

export type ExecutiveInsight = {
  headline: string;
  body: string;
  severity: "Info" | "Hinweis" | "Warnung" | "Kritisch";
  area: "Kosten" | "Resilienz" | "Risiko" | "CO₂" | "Adaptivität";
};

export type ExecutiveSummary = {
  summary: string;
  insights: ExecutiveInsight[];
  topPriority: ExecutiveInsight;
};

function levelLabel(v: number): "niedrig" | "mittel" | "hoch" | "sehr hoch" {
  if (v < 0.33) return "niedrig";
  if (v < 0.66) return "mittel";
  if (v < 0.85) return "hoch";
  return "sehr hoch";
}

export function generateExecutiveInsights(
  m: ExecutiveMetrics
): ExecutiveSummary {
  const insights: ExecutiveInsight[] = [];

  /* ---------------------------------------------------------
   * 1) Resilienz vs. Stress
   * --------------------------------------------------------- */
  if (m.stressIndex > 0.6 && m.resilience < 0.7) {
    insights.push({
      headline: "Resilienz unter erhöhtem Energie-Stress",
      body:
        "Das System steht unter deutlichem Stress, während die Resilienz noch nicht ausreichend ausgeprägt ist. Einzelne Preisschocks oder Lastspitzen könnten zu vermeidbaren Mehrkosten oder Instabilitäten führen.",
      severity: "Warnung",
      area: "Resilienz",
    });
  } else if (m.stressIndex > 0.6) {
    insights.push({
      headline: "Hoher Energie-Stress, Resilienz bleibt stabil",
      body:
        "Trotz eines angespannten Umfelds hält die Resilienz stand. Dies ist ein geeigneter Zeitpunkt, um antifragile Maßnahmen gezielt auszubauen und Lernvorteile zu nutzen.",
      severity: "Hinweis",
      area: "Resilienz",
    });
  } else if (m.stressIndex > 0.4) {
    insights.push({
      headline: "Moderater Energie-Stress",
      body:
        "Das System zeigt ein moderates Stressniveau. Die Lage ist stabil, sollte aber weiter beobachtet werden, um auf steigende Marktdynamik vorbereitet zu sein.",
      severity: "Info",
      area: "Resilienz",
    });
  }

  /* ---------------------------------------------------------
   * 2) Kostenrisiko & Volatilität
   * --------------------------------------------------------- */
  const combinedCostPressure = (m.costRisk + m.volatility) / 2;

  if (combinedCostPressure > 0.75) {
    insights.push({
      headline: "Kritisches Kostenrisiko durch hohe Marktvolatilität",
      body:
        "Das Kostenrisiko ist stark erhöht und wird zusätzlich durch ausgeprägte Preisvolatilität verstärkt. Eine Überprüfung der Beschaffungsstrategie und aktives Hedging sind dringend empfohlen.",
      severity: "Kritisch",
      area: "Kosten",
    });
  } else if (combinedCostPressure > 0.55) {
    insights.push({
      headline: "Erhöhtes Kostenrisiko im Marktumfeld",
      body:
        "Das Kostenrisiko ist gesteigert, aber weiterhin steuerbar. Durch Optimierung von Lastverschiebung, Peak Shaving und Effizienzmaßnahmen kann der Risikobereich deutlich reduziert werden.",
      severity: "Hinweis",
      area: "Kosten",
    });
  }

  /* ---------------------------------------------------------
   * 3) Adaptivität & Prognosesicherheit
   * --------------------------------------------------------- */
  if (m.adaptability < 0.5 && m.forecastConfidence < 0.6) {
    insights.push({
      headline: "Geringe Adaptivität bei unsicherer Prognosebasis",
      body:
        "Das System reagiert aktuell nur eingeschränkt adaptiv, während das Prognosemodell hohe Unsicherheit zeigt. Szenarioarbeit und Simulationen sollten verstärkt genutzt werden, um robuste Entscheidungen zu ermöglichen.",
      severity: "Warnung",
      area: "Adaptivität",
    });
  } else if (m.adaptability >= 0.5 && m.forecastConfidence < 0.5) {
    insights.push({
      headline: "Prognoseunsicherheit beachten",
      body:
        "Obwohl die Adaptivität solide ist, bleibt die Prognosesicherheit niedrig. Entscheidungen sollten daher mit Sensitivitätsanalysen und Bandbreiten unterlegt werden.",
      severity: "Hinweis",
      area: "Risiko",
    });
  } else if (m.adaptability < 0.45) {
    insights.push({
      headline: "Adaptivität verbessern",
      body:
        "Das System reagiert relativ träge auf veränderte Markt- und Verbrauchslagen. Eine stärkere Automatisierung und Policy-Optimierung kann die Reaktionsgeschwindigkeit erhöhen.",
      severity: "Info",
      area: "Adaptivität",
    });
  }

  /* ---------------------------------------------------------
   * 4) Effizienz & CO₂-Intensität
   * --------------------------------------------------------- */
  if (m.efficiency < 0.6 || m.co2Intensity > 0.5) {
    insights.push({
      headline: "Effizienz- und CO₂-Potenziale nicht ausgeschöpft",
      body:
        "Der Mix aus moderater Effizienz und relativ hoher CO₂-Intensität zeigt, dass Effizienzprogramme und Dekarbonisierungsmaßnahmen wirtschaftlich sinnvoll sein können, insbesondere mit passenden Förderinstrumenten.",
      severity: "Hinweis",
      area: "CO₂",
    });
  } else {
    insights.push({
      headline: "Effizienz stabil im grünen Bereich",
      body:
        "Die Effizienzkennzahlen sind solide. Zusätzliche Maßnahmen können gezielt auf Hochrisikobereiche wie Spitzenlastfenster ausgerichtet werden, um maximale Wirkung zu erzielen.",
      severity: "Info",
      area: "CO₂",
    });
  }

  /* ---------------------------------------------------------
   * 5) Meta-Summary (automatisch generiert)
   * --------------------------------------------------------- */
  const summary =
    `Das Energiesystem zeigt derzeit ein ${levelLabel(m.stressIndex)}es Stressniveau ` +
    `bei Resilienzwerten im Bereich ${levelLabel(m.resilience)}. ` +
    `Kostenrisiko und Marktvolatilität liegen im Bereich ${levelLabel(combinedCostPressure)}. ` +
    `Die Effizienz ist ${levelLabel(m.efficiency)}, während die CO₂-Intensität ` +
    `${levelLabel(m.co2Intensity)} ausfällt.`;


  /* ---------------------------------------------------------
   * Top-Priorität ermitteln – stärkste Severity gewinnt
   * --------------------------------------------------------- */
  const severityOrder = ["Kritisch", "Warnung", "Hinweis", "Info"] as const;

  const topPriority =
    insights.sort(
      (a, b) =>
        severityOrder.indexOf(a.severity) -
        severityOrder.indexOf(b.severity)
    )[0] || insights[0];

  return {
    summary,
    insights,
    topPriority,
  };
}

