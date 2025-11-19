"use client";

import React from "react";
import GlossaryHint from "@/components/GlossaryHint";
import { glossaryTerms } from "./terms";

/**
 * Robustes Wort-Cleaning:
 * - erlaubt Buchstaben, Zahlen, Bindestriche & Umlaute
 * - entfernt Satzzeichen (.,!?:;)
 */
function cleanWord(raw: string): string {
  return raw.replace(/[^\p{L}\p{N}-]/gu, "");
}

/**
 * INLINE-PARSER – für UI-Elemente, Buttons, Listen, Titel
 * Erkennt Begriffe auch wenn sie z. B. „Last,“ oder „CO₂.“ heißen.
 */
export function parseWithGlossaryInline(text: string): React.ReactNode[] {
  // Worte + Whitespaces beibehalten
  const parts = text.split(/(\s+)/);

  return parts.map((part, i) => {
    // whitespace → direkt zurückgeben
    if (/^\s+$/.test(part)) {
      return <React.Fragment key={`ws-${i}`}>{part}</React.Fragment>;
    }

    const cleaned = cleanWord(part);

    // Leeres oder sonderzeichen → normal zurückgeben
    if (!cleaned) {
      return <React.Fragment key={`t-${i}`}>{part}</React.Fragment>;
    }

    // Glossar-Match prüfen (case-insensitive)
    const entry = glossaryTerms.find(
      (t) => t.term.toLowerCase() === cleaned.toLowerCase()
    );

    if (entry) {
      return (
        <GlossaryHint key={`g-${entry.term}-${i}`} term={entry.term} />
      );
    }

    return <React.Fragment key={`t-${i}`}>{part}</React.Fragment>;
  });
}

/**
 * BLOCK-PARSER – ideal für längere Absätze.
 * Macht später Erweiterungen (Markdown, Rich-Text) möglich.
 */
export function parseWithGlossaryBlock(text: string): React.ReactNode {
  return <>{parseWithGlossaryInline(text)}</>;
}

/**
 * Abwärtskompatibilität: nutzt automatisch den Inline-Parser
 */
export function parseWithGlossary(text: string): React.ReactNode[] {
  return parseWithGlossaryInline(text);
}

