// ---------------------------------------------------------
// MOCK HEATMAP (für Analyse, Screenshot, Simulation)
// ---------------------------------------------------------

export type HeatmapData = {
  factors: string[];
  values: number[][];
};

/** Clamp-Funktion, verhindert 1.01 / -1.2 Fehler aus echten Modellläufen */
const clamp = (v: number) => Math.max(-1, Math.min(1, v));

/**
 * Optional: Validierung für zukünftige dynamische APIs
 * (Symmetrieprüfung, Dimensionscheck etc.)
 */
export function validateHeatmap(data: HeatmapData): HeatmapData {
  const size = data.factors.length;

  if (data.values.length !== size) {
    console.warn("Heatmap hat inkonsistente Größe");
  }

  const cleaned = data.values.map((row) =>
    row.map((v) => clamp(v))
  );

  return {
    factors: data.factors,
    values: cleaned
  };
}

// ---------------------------------------------------------
// MOCK-DATEN (statisch, aber voll kompatibel)
// ---------------------------------------------------------

export const mockHeatmap: HeatmapData = validateHeatmap({
  factors: ["Preis", "Last", "Wetter", "CO₂", "Verbrauch"],
  values: [
    [ 1,    0.20, -0.30, 0.50, 0.10 ],
    [ 0.20, 1,     0.10, -0.40, 0.60 ],
    [-0.30, 0.10,  1,     0.30, -0.20 ],
    [ 0.50,-0.40,  0.30,  1,     0.70 ],
    [ 0.10, 0.60, -0.20,  0.70,  1    ]
  ]
});
