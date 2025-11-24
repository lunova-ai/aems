// lib/analysis/insights.ts
"use client";

import { mockHeatmap } from "@/lib/analysis/data";
import {
  correlationFactors,
  correlationMatrix
} from "@/lib/analysis/correlation";
import { rootCauseTree, RootCauseNode } from "@/lib/analysis/rootCause";

export type InsightSection = {
  title: string;
  bullets: string[];
};

/* -------------------------------------------------------
 * Hilfsfunktionen
 * -----------------------------------------------------*/

/**
 * Liefert die Top-N Paar-Korrelationen aus einer Matrix.
 * Die Werte werden nach absoluter Stärke sortiert.
 */
function getTopMatrixPairs(
  factors: string[],
  matrix: number[][],
  topN: number
): { a: string; b: string; value: number }[] {
  if (!matrix || matrix.length === 0) return [];

  const pairs: { a: string; b: string; value: number }[] = [];

  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];
    if (!row) continue;

    for (let j = i + 1; j < row.length; j++) {
      pairs.push({
        a: factors[i] ?? `Faktor${i}`,
        b: factors[j] ?? `Faktor${j}`,
        value: Number(row[j] ?? 0)
      });
    }
  }

  return pairs
    .sort((p1, p2) => Math.abs(p2.value) - Math.abs(p1.value))
    .slice(0, topN);
}

/**
 * Root-Cause-Tree in ein flaches Array umwandeln.
 * Wichtig: parent darf nicht `undefined` sein bei exactOptionalPropertyTypes.
 */
function flattenRootCause(
  node: RootCauseNode,
  depth = 0,
  parent?: string
): { name: string; value: number; depth: number; parent?: string }[] {
  if (!node) return [];

  const currentNode =
    parent !== undefined
      ? { name: node.name, value: node.value, depth, parent }
      : { name: node.name, value: node.value, depth };

  const children =
    node.children?.flatMap((c) =>
      flattenRootCause(c, depth + 1, node.name)
    ) ?? [];

  return [currentNode, ...children];
}

/* -------------------------------------------------------
 * Executive Summary
 * -----------------------------------------------------*/

export function buildExecutiveSummary(): string[] {
  const summary: string[] = [];

  const topCorr = getTopMatrixPairs(correlationFactors, correlationMatrix, 3);

  const flat = flattenRootCause(rootCauseTree);
  const firstLevelCauses = flat
    .filter((n) => n.depth === 1)
    .sort((a, b) => b.value - a.value)
    .slice(0, 2);

  if (topCorr.length > 0) {
    const first = topCorr[0]!;

    summary.push(
      `Zwischen ${first.a} und ${first.b} besteht eine starke ${
        first.value > 0 ? "positive" : "negative"
      } Kopplung (≈ ${first.value.toFixed(2)}).`
    );
  }

  if (firstLevelCauses.length > 0) {
    summary.push(
      `Die wichtigsten Treiber im aktuellen System sind ${firstLevelCauses
        .map((c) => c.name)
        .join(" und ")}.`
    );
  }

  summary.push(
    "Das System zeigt teil-antifragile Muster: Stressoren wie Preisvolatilität werden bereits genutzt, um Verbesserungen anzustoßen – hier besteht weiteres Potenzial."
  );

  return summary;
}

/* -------------------------------------------------------
 * Detaillierte Insights
 * -----------------------------------------------------*/

export function buildDetailedInsights(): InsightSection[] {
  const topHeatmap = getTopMatrixPairs(
    mockHeatmap.factors,
    mockHeatmap.values,
    3
  );

  const topCorr = getTopMatrixPairs(
    correlationFactors,
    correlationMatrix,
    3
  );

  const flat = flattenRootCause(rootCauseTree);

  const mainRoot = flat
    .filter((n) => n.depth === 1)
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);

  const deepCauses = flat
    .filter((n) => n.depth >= 2)
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);

  /* ---------------------- Heatmap ----------------------*/

  const heatmapSection: InsightSection = {
    title: "Heatmap & Einflussfaktoren",
    bullets: topHeatmap.map((p) => {
      const dir = p.value > 0 ? "verstärkende" : "gegenläufige";
      return `Zwischen ${p.a} und ${p.b} besteht eine ${dir} Beziehung (≈ ${p.value.toFixed(
        2
      )}).`;
    })
  };

  /* ---------------------- Korrelation ------------------*/

  const corrSection: InsightSection = {
    title: "Korrelationsanalyse",
    bullets: topCorr.map((p) => {
      const dir =
        p.value > 0 ? "gemeinsam steigen" : "sich gegenläufig entwickeln";
      return `${p.a} und ${p.b} neigen dazu, ${dir} (Korrelationswert ≈ ${p.value.toFixed(
        2
      )}).`;
    })
  };

  /* ---------------------- Ursachenanalyse --------------*/

  const causeSection: InsightSection = {
    title: "Ursachen & Risiken",
    bullets: [
      ...mainRoot.map(
        (c) =>
          `${c.name} ist ein wesentlicher Treiber mit einer Einflussstärke von ca. ${(c.value * 100).toFixed(
            0
          )} %.`
      ),
      ...deepCauses.map(
        (c) =>
          `${c.name} wirkt als tieferliegende Ursache (Ebene ${
            c.depth
          }) mit etwa ${(c.value * 100).toFixed(0)} % Beitrag.`
      )
    ]
  };

  /* ---------------------- Antifragilität ---------------*/

  const antifragSection: InsightSection = {
    title: "Antifragilität & Lernchancen",
    bullets: [
      "Volatile Phasen – insbesondere hohe Preisbewegungen – sollten gezielt als Lern- und Testfelder genutzt werden.",
      "Stressereignisse (Lastspitzen, Engpässe) geben Hinweise auf strukturelle Schwachstellen und mögliche Verbesserungshebel.",
      "Zielbild: weniger reaktive Ad-hoc-Maßnahmen, mehr systematische Experimente mit definierten Lernzielen."
    ]
  };

  return [heatmapSection, corrSection, causeSection, antifragSection];
}
