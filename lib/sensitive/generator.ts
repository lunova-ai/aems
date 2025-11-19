// lib/sensitive/generator.ts
"use client";

export type SensitiveZone = {
  category: string;
  level: "Niedrig" | "Mittel" | "Hoch" | "Kritisch";
  indicators: string[];
  explanation: string;
};

export function generateSensitiveZones(data: {
  heatmap: number[][];
  stability: number;   // 0–1
  volatility: number;  // 0–1
  peakload: number;    // 0–1
  co2: number;         // 0–1 (hoch = schlecht)
}): SensitiveZone[] {
  const zones: SensitiveZone[] = [];

  /* ---------------------------------------------------------------
   * Hilfsfunktion: numerischer Score → verbale Risikostufe
   * ------------------------------------------------------------- */
  function riskLabel(v: number): SensitiveZone["level"] {
    if (v < 0.20) return "Niedrig";
    if (v < 0.45) return "Mittel";
    if (v < 0.70) return "Hoch";
    return "Kritisch";
  }

  /* ---------------------------------------------------------------
   * Optional: Heatmap-Clustering (starke Wechselwirkungen)
   * ------------------------------------------------------------- */
  function detectHeatmapCluster(): string {
    if (!data.heatmap || data.heatmap.length === 0) return "Keine Heatmap-Daten verfügbar";

    let highLinks = 0;
    for (let i = 0; i < data.heatmap.length; i++) {
      for (let j = i + 1; j < data.heatmap[i].length; j++) {
        if (Math.abs(data.heatmap[i][j]) > 0.6) highLinks++;
      }
    }

    if (highLinks >= 6) return "Mehrere starke Wechselwirkungspaare sichtbar";
    if (highLinks >= 3) return "Einige ausgeprägte Einflusscluster erkennbar";

    return "Einflussbeziehungen insgesamt moderat";
  }

  const heatmapClusterInfo = detectHeatmapCluster();

  /* ---------------------------------------------------------------
   * ZONE 1 – Versorgungssicherheit
   * ------------------------------------------------------------- */
  zones.push({
    category: "Versorgungssicherheit",
    level: riskLabel(
      Math.max(
        data.peakload,
        1 - data.stability, // geringe Stabilität erhöht Risiko
        data.volatility * 0.4
      )
    ),
    indicators: [
      data.peakload > 0.6
        ? "Abendspitzen stark ausgeprägt"
        : data.peakload > 0.4
        ? "Spitzenlast moderat"
        : "Peak-Load stabil",

      data.stability < 0.4
        ? "Regelkreise instabil"
        : data.stability < 0.7
        ? "Stabilität akzeptabel"
        : "Regelkreise robust",

      heatmapClusterInfo,
    ],
    explanation:
      "Versorgungssicherheit beschreibt die Fähigkeit, Lasten zuverlässig zu decken und Engpässe zu vermeiden. Sie wird durch Spitzenlast, Regelkreisstabilität und Wechselwirkungen im System beeinflusst.",
  });

  /* ---------------------------------------------------------------
   * ZONE 2 – Kostenstruktur
   * ------------------------------------------------------------- */
  zones.push({
    category: "Kostenstruktur",
    level: riskLabel(
      (data.volatility * 0.7 + (1 - data.stability) * 0.3)
    ),
    indicators: [
      data.volatility > 0.6
        ? "Hohe Preisvolatilität"
        : data.volatility > 0.4
        ? "Preisfenster volatil"
        : "Preisfenster moderat",

      data.stability < 0.5
        ? "Schocksensitivität erhöht"
        : "Stabilität reduziert Kostenrisiken",

      heatmapClusterInfo,
    ],
    explanation:
      "Die Kostenstruktur wird maßgeblich von Preisvolatilität, Lastmustern und Stabilität des Systems beeinflusst. Hohe Volatilität kombiniert mit niedriger Stabilität erhöht das Kostenrisiko.",
  });

  /* ---------------------------------------------------------------
   * ZONE 3 – CO₂-Profil
   * ------------------------------------------------------------- */
  zones.push({
    category: "CO₂-Profil",
    level: riskLabel(data.co2), // HOCHES CO₂ = HOHES Risiko
    indicators: [
      data.co2 < 0.3
        ? "Emissionen gut kontrolliert"
        : data.co2 < 0.5
        ? "Scope-2 moderat"
        : "Hoher indirekter Emissionsanteil",

      data.co2 > 0.5
        ? "Scope-1 stark vom Einkauf abhängig"
        : "Scope-1 Risiko gering",

      heatmapClusterInfo,
    ],
    explanation:
      "Das CO₂-Profil zeigt, wie emissionsintensiv das Energiesystem ist und wie groß der Spielraum für Dekarbonisierungsmaßnahmen ausfällt.",
  });

  return zones;
}
