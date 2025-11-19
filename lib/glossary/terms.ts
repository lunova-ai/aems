import { GlossaryItem } from "@/components/glossary/GlossaryList";

/**
 * MARKIERUNG: Wir setzen den Begriff selbst fett,
 * damit er im Glossar optisch hervorsticht.
 */
const bold = (t: string) => `**${t}**`;

const baseTerms: GlossaryItem[] = [
  {
    term: "Volatilität",
    simple: bold("Volatilität") + " beschreibt die Stärke und Häufigkeit von Energiepreisschwankungen.",
    detail:
      "Hohe Volatilität bedeutet schnelle und starke Preisbewegungen. Sie erschwert Prognosen, erhöht das Kostenrisiko und erfordert flexible Strategien.",
    aems:
      "AEMS interpretiert Volatilität als Stresssignal und nutzt sie für antifragile Lernmechanismen.",
    category: "Markt & Preis",
  },
  {
    term: "Spitzenlast",
    simple: bold("Spitzenlast") + " bezeichnet die höchsten Leistungsspitzen im Energieverbrauch.",
    detail:
      "Diese Spitzen treiben Netzentgelte und Anlagenkosten, da Infrastruktur nach Maximalwerten dimensioniert wird.",
    aems:
      "AEMS erkennt Muster von Spitzenlast und empfiehlt Lastverschiebung oder automatisiertes Peak Shaving.",
    category: "Verbrauch & Last",
  },
  {
    term: "Peak Shaving",
    simple: bold("Peak Shaving") + " bedeutet das gezielte Reduzieren von Extremlasten.",
    detail:
      "Durch intelligentes Abschalten oder Verschieben können hohe Netzkosten verhindert werden.",
    aems:
      "AEMS aktiviert Peak Shaving automatisiert basierend auf Lastprognosen und Regel-Policies.",
    category: "Steuerung & Regeln",
  },
  {
    term: "Monte Carlo Simulation",
    simple: bold("Monte Carlo Simulation") + " nutzt viele Zufallsdurchläufe zur Abbildung realistischer Zukunftsbandbreiten.",
    detail:
      "Das Verfahren zeigt Risiken, Schwankungsbreiten und Extremereignisse statt einer einzigen Prognose.",
    aems:
      "AEMS setzt Monte Carlo ein, um robuste Budget- und Risikoszenarien zu erstellen.",
    category: "Analyse & Statistik",
  },
  {
    term: "Korrelation",
    simple: bold("Korrelation") + " misst, wie stark zwei Größen gemeinsam schwanken.",
    detail:
      "Positive Korrelation: Werte steigen/fallen gemeinsam. Negative Korrelation: gegenläufige Entwicklung.",
    aems:
      "AEMS nutzt Korrelationen zur Clusterbildung und um relevante Einflussverhältnisse sichtbar zu machen.",
    category: "Analyse & Statistik",
  },
  {
    term: "Ursachenanalyse",
    simple: bold("Ursachenanalyse") + " identifiziert die strukturellen Treiber hinter beobachteten Effekten.",
    detail:
      "Sie zeigt, welche Faktoren ein Problem verursachen – nicht nur, dass ein Zusammenhang besteht.",
    aems:
      "AEMS baut Ursachenbäume automatisch aus Heatmap-, Korrelation- und Verlaufsdaten auf.",
    category: "Analyse & Statistik",
  },
  {
    term: "Antifragilität",
    simple: bold("Antifragilität") + " beschreibt Systeme, die durch Stress stärker werden.",
    detail:
      "Nach Taleb: Antifragile Systeme profitieren von Schwankungen und Unsicherheit statt Schaden zu nehmen.",
    aems:
      "AEMS ist explizit antifragil konzipiert: Stressereignisse werden zum Lern- und Verbesserungsimpuls.",
    category: "Philosophie & Strategie",
  },
  {
    term: "Resilienz",
    simple: bold("Resilienz") + " bezeichnet die Widerstandsfähigkeit eines Systems.",
    detail:
      "Ein resilientes Energiesystem hält Störungen stand, ohne seine Kernfunktion zu verlieren.",
    aems:
      "AEMS berechnet eine laufende Resilienzkennzahl und zeigt deren Treiber und Risiken.",
    category: "Philosophie & Strategie",
  },
  {
    term: "Forecast Confidence",
    simple: bold("Forecast Confidence") + " ist das Vertrauensmaß einer Prognose.",
    detail:
      "Zeigt an, wie stabil ein Modell unter aktuellen Bedingungen ist und wie hoch die Prognoseunsicherheit bleibt.",
    aems:
      "AEMS visualisiert Confidence dynamisch und warnt bei unzuverlässigen Forecasts.",
    category: "Prognose",
  },
  {
    term: "Energieintensität",
    simple: bold("Energieintensität") + " misst Energieverbrauch relativ zu einer Bezugsgröße.",
    detail:
      "Zum Beispiel kWh pro m², Einheit, Maschine oder Umsatz. Eine zentrale Effizienzkennzahl.",
    aems:
      "AEMS nutzt Intensitäten für Standortvergleiche, Benchmarking und Zielpfade.",
    category: "Verbrauch & Last",
  },
  {
    term: "Lastverschiebung",
    simple: bold("Lastverschiebung") + " verlagert Verbrauch in günstigere Zeiten.",
    detail:
      "Reduziert Kosten, CO₂-Intensität und Netzbelastung, indem Verbrauch zeitlich gesteuert wird.",
    aems:
      "AEMS schlägt Lastverschiebungen automatisch vor und simuliert deren Wirkung.",
    category: "Verbrauch & Last",
  },
  {
    term: "Energieportfolio",
    simple: bold("Energieportfolio") + " beschreibt die Mischung verschiedener Energiequellen und Verträge.",
    detail:
      "Ein gutes Portfolio balanciert Kosten, Risiko und Nachhaltigkeit.",
    aems:
      "AEMS bewertet Portfolios und zeigt deren Sensitivität gegenüber Preis- und Versorgungsszenarien.",
    category: "Markt & Preis",
  },
  {
    term: "Szenario",
    simple: bold("Szenario") + " ist eine „Was-wäre-wenn“-Beschreibung der Zukunft.",
    detail:
      "Szenarien helfen bei strategischen Entscheidungen, indem sie verschiedene mögliche Zukunftslagen abbilden.",
    aems:
      "AEMS simuliert Szenarien, quantifiziert Wirkungen und vergleicht sie mit der Realität.",
    category: "Prognose",
  },
  {
    term: "CEnO",
    simple: bold("CEnO") + " – Chief Energy Officer, zentrale Rolle im EPRIS-Modell.",
    detail:
      "Bündelt Verantwortung für Energie, Risiko, Nachhaltigkeit und Strategie.",
    aems:
      "AEMS dient dem CEnO als integriertes Entscheidungs- und Steuerungscockpit.",
    category: "Rollen & Organisation",
  },
  {
    term: "IEMS",
    simple: bold("IEMS") + " steht für Intelligentes Energiemanagement-System.",
    detail:
      "Regelt Struktur, Prozesse, Datenmodelle und Steuerungslogiken für modernes Energiemanagement.",
    aems:
      "AEMS ist eine spezialisierte IEMS-Variante mit Antifragilitätsfokus.",
    category: "System & Architektur",
  },
  {
    term: "Anschlussfähigkeit",
    simple: bold("Anschlussfähigkeit") + " beschreibt, wie gut sich ein System in bestehende Strukturen integriert.",
    detail:
      "Hohe Anschlussfähigkeit bedeutet: verständlich, kompatibel, integrierbar.",
    aems:
      "AEMS ist bewusst anschlussfähig an bestehende IT, Rollenmodelle und Energiekonzepte.",
    category: "Philosophie & Strategie",
  },
  {
    term: "Leitstern",
    simple: bold("Leitstern") + " steht für das langfristige Zielbild eines Systems.",
    detail:
      "Gibt Richtung, Prioritäten und strategischen Rahmen vor.",
    aems:
      "Der AEMS-Leitstern lautet: Energie strategisch steuerbar machen – über Kosten, Risiko und Resilienz.",
    category: "Philosophie & Strategie",
  },
  {
    term: "Control Loop",
    simple: bold("Control Loop") + " ist der Zyklus aus Beobachten → Einordnen → Entscheiden → Handeln.",
    detail:
      "Schließt den Kreis zwischen Daten, Analyse, Maßnahmen und Rückkopplung.",
    aems:
      "AEMS visualisiert und bewertet den Control Loop als zentrales Steuerungselement.",
    category: "Steuerung & Regeln",
  },
  {
    term: "Policy",
    simple: bold("Policy") + " bezeichnet eine Regel oder Steuerungsvorschrift im System.",
    detail:
      "Policies legen fest, wie ein System in bestimmten Situationen reagiert.",
    aems:
      "Die Adaptive Policy Engine von AEMS verwaltet, misst und verbessert Policies automatisiert.",
    category: "Steuerung & Regeln",
  },
];

/* ---------------------------------------------------------
 * EPRIS-ERGÄNZUNGEN
 * ---------------------------------------------------------*/
const eprisTerms: GlossaryItem[] = [
  {
    term: "CEnO Denkmodell",
    simple: bold("CEnO Denkmodell") + " ist ein Denkrahmen für energiebezogene Entscheidungen.",
    detail:
      "Das EPRIS-Playbook beschreibt vier Denkmodelle, wie Organisationen Energie systemisch verstehen.",
    aems:
      "AEMS repräsentiert diese Denkmodelle durch unterschiedliche Cockpits (Executive, Analyse, Control, Simulation).",
    category: "Rollen & Organisation",
  },
  {
    term: "Energie-Resilienz",
    simple: bold("Energie-Resilienz") + " beschreibt die Fähigkeit, Energierisiken auszuhalten und sich anzupassen.",
    detail:
      "Sie verbindet technische Stabilität, organisatorische Vorbereitung und strategische Flexibilität.",
    aems:
      "AEMS misst Energie-Resilienz und zeigt ihre Veränderung durch Policies und Maßnahmen.",
    category: "Philosophie & Strategie",
  },
  {
    term: "Energie-Stress",
    simple: bold("Energie-Stress") + " bezeichnet Druck durch Preise, Versorgung, CO₂ oder Last.",
    detail:
      "Energie-Stress entsteht aus volatilen Märkten, Wetterlagen, Technikzuständen oder politischer Regulierung.",
    aems:
      "AEMS interpretiert Energie-Stress als Lernsignal und verarbeitet ihn in antifragilen Feedbackloops.",
    category: "Analyse & Statistik",
  },
];

export const glossaryTerms: GlossaryItem[] = [...baseTerms, ...eprisTerms];
