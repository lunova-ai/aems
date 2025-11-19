// ---------------------------------------------------------
// AEMS Korrelationsdaten & Farblogik
// ---------------------------------------------------------

// Beschriftungen der Achsen
export const correlationFactors: string[] = [
  "Preis",
  "Last",
  "Wetter",
  "CO₂",
  "Verbrauch"
];

// Symmetrische Korrelationsmatrix (5 × 5)
export const correlationMatrix: number[][] = [
  [1,    0.42, -0.33,  0.61,  0.12],
  [0.42, 1,     0.22, -0.44,  0.59],
  [-0.33,0.22,  1,     0.36, -0.27],
  [0.61,-0.44,  0.36,  1,     0.71],
  [0.12, 0.59, -0.27,  0.71,  1]
];

/**
 * Wandelt einen Korrelationswert (-1 bis +1) in eine Tailwind-Farbklasse um.
 * Wird in BubbleMatrix + SquareMatrix + Legend verwendet.
 */
export const toColor = (v: number): string => {
  // Clamping – verhindert Fehler bei zukünftigen dynamischen Inputs
  const value = Math.max(-1, Math.min(1, v));

  // Positive Korrelation (grün)
  if (value > 0.6) return "bg-aems-neon/70";
  if (value > 0.3) return "bg-aems-soft/60";

  // Negative Korrelation (rot)
  if (value < -0.6) return "bg-red-600/60";
  if (value < -0.3) return "bg-red-600/40";

  // Neutralbereich
  return "bg-white/10";
};
