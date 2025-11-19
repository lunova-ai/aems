"use client";

import jsPDF from "jspdf";
import autoTable, { UserOptions } from "jspdf-autotable";

/* ----------------------------------------------------------
 * METADATA
 * ---------------------------------------------------------- */
export type AemsPdfMetadata = {
  title: string;
  subtitle?: string;
  createdAt?: Date;
};

export type AemsPdf = jsPDF;

/* ----------------------------------------------------------
 * PAGE SETTINGS
 * ---------------------------------------------------------- */
export const AEMS_PAGE = {
  width: 210,
  height: 297,
  marginX: 18,
  marginTop: 28,
  marginBottom: 18,
};

const HEADER_HEIGHT = 20;
const FOOTER_HEIGHT = 16;

const COLORS = {
  bg: "#031f1f",
  neon: "#00E7B3",
  soft: "#12C7A5",
  text: "#333333",
  lightText: "#777777",
};

/* ----------------------------------------------------------
 * CREATE PDF BASE
 * ---------------------------------------------------------- */
export function createAemsPdf(meta: AemsPdfMetadata): AemsPdf {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  pdf.setProperties({
    title: meta.title,
    subject: "AEMS – Antifragiles Energiemanagement System",
    creator: "AEMS",
  });

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);

  return pdf;
}

/* ----------------------------------------------------------
 * HEADER + FOOTER
 * ---------------------------------------------------------- */
function drawHeaderFooter(
  pdf: jsPDF,
  pageNumber: number,
  meta: AemsPdfMetadata
) {
  // Cover page = skip header/footer completely
  if (pageNumber === 1) return;

  const { width, height, marginX } = AEMS_PAGE;

  // HEADER
  pdf.setFillColor(COLORS.bg);
  pdf.rect(0, 0, width, HEADER_HEIGHT, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.setTextColor(COLORS.neon);
  pdf.text("AEMS", marginX, 8);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor("#FFFFFF");
  pdf.text(meta.title, marginX, 13);

  if (meta.subtitle) {
    pdf.setFontSize(8);
    pdf.setTextColor("#DDDDDD");
    pdf.text(meta.subtitle, marginX, 17);
  }

  // FOOTER
  const lineY = height - FOOTER_HEIGHT + 4;
  pdf.setDrawColor(220, 220, 220);
  pdf.setLineWidth(0.1);
  pdf.line(marginX, lineY, width - marginX, lineY);

  const date = meta.createdAt ?? new Date();
  pdf.setFontSize(8);
  pdf.setTextColor(COLORS.lightText);

  pdf.text(
    `Erstellt am ${date.toLocaleDateString("de-AT")}`,
    marginX,
    lineY + 5
  );
  pdf.text(`Seite ${pageNumber}`, width - marginX, lineY + 5, {
    align: "right",
  });

  // WATERMARK
  pdf.setTextColor(210, 210, 210);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(34);

  pdf.text("AEMS", width / 2, height / 2, undefined, 45);
}

export function applyAemsHeaderFooter(pdf: jsPDF, meta: AemsPdfMetadata) {
  const pages = pdf.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    pdf.setPage(i);
    drawHeaderFooter(pdf, i, meta);
  }
}

/* ----------------------------------------------------------
 * COVER PAGE
 * ---------------------------------------------------------- */
export function addAemsCoverPage(pdf: jsPDF, meta: AemsPdfMetadata) {
  const { width, height } = AEMS_PAGE;

  pdf.setFillColor(COLORS.bg);
  pdf.rect(0, 0, width, height, "F");

  pdf.setTextColor(COLORS.neon);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(26);
  pdf.text(meta.title, width / 2, height / 2 - 10, { align: "center" });

  if (meta.subtitle) {
    pdf.setFontSize(14);
    pdf.setTextColor("#FFFFFF");
    pdf.text(meta.subtitle, width / 2, height / 2 + 5, { align: "center" });
  }

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor("#BBBBBB");

  const date = meta.createdAt ?? new Date();
  pdf.text(
    `Erstellt am ${date.toLocaleDateString("de-AT")}`,
    width / 2,
    height / 2 + 16,
    { align: "center" }
  );
}

/* ----------------------------------------------------------
 * SECTION TITLE
 * ---------------------------------------------------------- */
export function addAemsSectionTitle(
  pdf: jsPDF,
  title: string,
  y = AEMS_PAGE.marginTop + 10
) {
  const { marginX } = AEMS_PAGE;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.setTextColor("#000000");
  pdf.text(title, marginX, y);

  pdf.setDrawColor(COLORS.neon);
  pdf.setLineWidth(0.6);
  pdf.line(marginX, y + 2, marginX + 50, y + 2);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor("#333333");
}

/* ----------------------------------------------------------
 * AUTOTABLE WRAPPER
 * ---------------------------------------------------------- */
export type AemsAutoTableOptions = UserOptions;

export function aemsAutoTable(pdf: jsPDF, options: AemsAutoTableOptions) {
  autoTable(pdf, {
    styles: {
      font: "helvetica",
      fontSize: 8,
      textColor: "#222222",
      cellPadding: 2,
      ...options.styles,
    },
    headStyles: {
      fillColor: [3, 31, 31],
      textColor: "#FFFFFF",
      fontStyle: "bold",
      ...options.headStyles,
    },
    alternateRowStyles: {
      fillColor: [250, 250, 250],
      ...options.alternateRowStyles,
    },
    ...options,
  });
}

/* ----------------------------------------------------------
 * SAVE
 * ---------------------------------------------------------- */
export function saveAemsPdf(
  pdf: jsPDF,
  baseName: string,
  meta?: AemsPdfMetadata
) {
  const date = meta?.createdAt ?? new Date();
  const stamp = date.toISOString().slice(0, 10);
  const safe = baseName.replace(/\s+/g, "_");

  pdf.save(`${safe}_${stamp}.pdf`);
}

/* ----------------------------------------------------------
 * SHORT REPORT
 * ---------------------------------------------------------- */
export async function exportPdfShortReport({
  heatmapImage,
  meta,
  insights = [],
}: {
  heatmapImage: string;
  meta: AemsPdfMetadata;
  insights?: string[];
}) {
  const pdf = createAemsPdf(meta);

  addAemsCoverPage(pdf, meta);

  pdf.addPage();
  addAemsSectionTitle(pdf, "Executive Summary");

  const { marginX } = AEMS_PAGE;

  const usedInsights =
    insights.length > 0
      ? insights
      : [
          "Die größten Einflussfaktoren auf die aktuelle Kostenlage sind Preisvolatilität und Spitzenlast.",
          "Die Heatmap zeigt ein ausgeprägtes Cluster in CO₂ · Last · Preis.",
          "Die Ursachenanalyse deutet auf strukturelle Ineffizienzen hin.",
        ];

  pdf.setFontSize(10);
  pdf.setTextColor("#333333");

  let y = 42;

  usedInsights.forEach((line) => {
    pdf.text(`• ${line}`, marginX + 1, y, { maxWidth: 170 });
    y += 7;
  });

  y += 8;

  addAemsSectionTitle(pdf, "Heatmap – Einflussfaktoren", y);
  y += 12;

  pdf.addImage(heatmapImage, "PNG", marginX, y, 160, 160);

  applyAemsHeaderFooter(pdf, meta);

  saveAemsPdf(pdf, "AEMS_Kurzbericht", meta);
}

/* ----------------------------------------------------------
 * FULL REPORT
 * ---------------------------------------------------------- */
export async function exportPdfFullReport({
  heatmapImage,
  bubbleMatrixImage,
  squareMatrixImage,
  causeForceImage,
  causeHierarchyImage,
  meta,
}: {
  heatmapImage: string;
  bubbleMatrixImage: string;
  squareMatrixImage: string;
  causeForceImage: string;
  causeHierarchyImage: string;
  meta: AemsPdfMetadata;
}) {
  const pdf = createAemsPdf(meta);

  addAemsCoverPage(pdf, meta);

  /* ------------------------------------------------------ */
  /* Inhaltsverzeichnis */
  /* ------------------------------------------------------ */
  pdf.addPage();
  addAemsSectionTitle(pdf, "Inhaltsverzeichnis");

  const TOC = [
    "1. Heatmap – Einflussfaktoren",
    "2. Korrelationsanalyse",
    "3. Ursachenanalyse",
    "4. KPI & Risikoüberblick",
    "5. Handlungsempfehlungen",
    "6. Antifragilitäts-Profil",
  ];

  TOC.forEach((line, i) =>
    pdf.text(line, AEMS_PAGE.marginX, 40 + i * 8)
  );

  /* ------------------------------------------------------ */
  /* Heatmap */
  /* ------------------------------------------------------ */
  pdf.addPage();
  addAemsSectionTitle(pdf, "1. Heatmap – Einflussfaktoren");
  pdf.addImage(heatmapImage, "PNG", AEMS_PAGE.marginX, 40, 160, 160);

  /* ------------------------------------------------------ */
  /* Korrelation */
  /* ------------------------------------------------------ */
  pdf.addPage();
  addAemsSectionTitle(pdf, "2. Korrelationsanalyse");

  pdf.text("Bubble Matrix", AEMS_PAGE.marginX, 40);
  pdf.addImage(bubbleMatrixImage, "PNG", AEMS_PAGE.marginX, 45, 160, 120);

  pdf.text("Square Matrix", AEMS_PAGE.marginX, 175);
  pdf.addImage(squareMatrixImage, "PNG", AEMS_PAGE.marginX, 182, 160, 110);

  /* ------------------------------------------------------ */
  /* Ursachenanalyse */
  /* ------------------------------------------------------ */
  pdf.addPage();
  addAemsSectionTitle(pdf, "3. Ursachenanalyse");

  pdf.text("Force Layout", AEMS_PAGE.marginX, 40);
  pdf.addImage(causeForceImage, "PNG", AEMS_PAGE.marginX, 45, 160, 140);

  pdf.text("Hierarchische Struktur", AEMS_PAGE.marginX, 190);
  pdf.addImage(causeHierarchyImage, "PNG", AEMS_PAGE.marginX, 195, 160, 110);

  /* ------------------------------------------------------ */
  /* KPIs */
  /* ------------------------------------------------------ */
  pdf.addPage();
  addAemsSectionTitle(pdf, "4. KPI & Risikoüberblick");

  const KPIs = [
    ["Energieintensität", "12% über Benchmark"],
    ["CO₂-Intensität", "Moderat"],
    ["Volatilitätsrisiko", "Hoch"],
    ["Netzlastspitzen", "4 kritische Ereignisse / Monat"],
    ["Resilienzindex", "62 / 100"],
  ];

  aemsAutoTable(pdf, {
    startY: 40,
    head: [["Kennzahl", "Status"]],
    body: KPIs,
  });

  /* ------------------------------------------------------ */
  /* Handlungsempfehlungen */
  /* ------------------------------------------------------ */
  pdf.addPage();
  addAemsSectionTitle(pdf, "5. Handlungsempfehlungen");

  const rec = [
    "Lastmanagement automatisieren (Peak Shaving).",
    "Wärmerückgewinnung optimieren.",
    "Preisschocks durch Hedging reduzieren.",
    "Flexible Erzeuger stärker aktivieren.",
    "Frühwarnsysteme für Preisvolatilität etablieren.",
  ];

  rec.forEach((line, i) => {
    pdf.text(`• ${line}`, AEMS_PAGE.marginX + 2, 40 + i * 8, {
      maxWidth: 170,
    });
  });

  /* ------------------------------------------------------ */
  /* Antifragilitäts-Profil */
  /* ------------------------------------------------------ */
  pdf.addPage();
  addAemsSectionTitle(pdf, "6. Antifragilitäts-Profil");

  const ftext = `
Antifragile Systeme profitieren von Volatilität, Stressoren und Unsicherheit.
Das AEMS bewertet Ihr Energie-Ökosystem nach Talebs Prinzipien:

• Fragil: Hohe Abhängigkeit von Einzelereignissen.
• Robust: Stabil, aber ohne Verbesserung durch Stressoren.
• Antifragil: System verbessert sich mit jedem Stressor.

Aktueller Status: TEIL-ANTIFRAGIL (63/100).
`;

  pdf.text(ftext, AEMS_PAGE.marginX, 40, { maxWidth: 170 });

  /* ------------------------------------------------------ */
  /* HEADER / FOOTER */
  /* ------------------------------------------------------ */
  applyAemsHeaderFooter(pdf, meta);

  saveAemsPdf(pdf, "AEMS_Vollbericht", meta);
}
