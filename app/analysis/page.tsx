// app/analysis/page.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

import LayoutClient from "@/components/layout/LayoutClient";
import AEMSHeader from "@/components/AEMSHeader";

import AEMSActionTabs from "@/components/AEMSActionTabs";
import SnapshotDropdown from "@/components/analysis/SnapshotDropdown";
import AEMSScreenshotModal from "@/components/AEMSScreenshotModal";
import AEMSScreenshotWrapper from "@/components/AEMSScreenshotWrapper";

import Heatmap from "@/components/analysis/Heatmap";
import CorrelationTabs from "@/components/analysis/correlation/CorrelationTabs";
import RootCauseTabs from "@/components/analysis/rootCause/RootCauseTabs";

import { exportElementAsPng, downloadPng } from "@/lib/analysis/exports";
import { awardXp } from "@/lib/gamification/xp";

export default function AnalysisPage() {
  const [snapshotOpen, setSnapshotOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Bereich der exportiert wird
  const analysisRef = useRef<HTMLDivElement>(null);

  // XP beim Öffnen der Seite
  useEffect(() => {
    awardXp("heatmap_view");
  }, []);

  // Snapshot erstellen
  const handlePageSnapshot = async () => {
    if (!analysisRef.current) return;

    setModalVisible(true);
    awardXp("pdf_export");

    const dataUrl = await exportElementAsPng(analysisRef.current);
    downloadPng("analysis-page.png", dataUrl);

    setModalVisible(false);
  };

  return (
    <LayoutClient>
      <main className="pt-10 pb-20 space-y-12">

        {/* HEADER */}
        <AEMSHeader
          title="Analyse"
          subtitle="Einflussfaktoren · Muster · Ursachen"
        />

        {/* ACTION BUTTONS */}
        <AEMSActionTabs
          items={[
            {
              key: "snapshot",
              label: "Snapshot",
              onClick: () => setSnapshotOpen((o) => !o),
            },
            {
              key: "pdf",
              label: "PDF Export",
              onClick: () => {
                awardXp("pdf_export");
                console.log("PDF Export folgt in Sprint 4");
              },
            },
          ]}
        />

        {/* SNAPSHOT DROPDOWN */}
        {snapshotOpen && (
          <SnapshotDropdown
            onClose={() => setSnapshotOpen(false)}
            onMakeSnapshot={handlePageSnapshot}
          />
        )}

        {/* MODAL */}
        <AEMSScreenshotModal visible={modalVisible} />

        {/* EXPORTIERBARE ANALYSE */}
        <AEMSScreenshotWrapper ref={analysisRef}>
          <div className="space-y-16">

            {/* HEATMAP */}
            <div onClick={() => awardXp("heatmap_view")}>
              <Heatmap />
            </div>

            {/* KORRELATION */}
            <div onClick={() => awardXp("correlation_view")}>
              <CorrelationTabs />
            </div>

            {/* ROOT CAUSE */}
            <div onClick={() => awardXp("rootcause_view")}>
              <RootCauseTabs />
            </div>

          </div>
        </AEMSScreenshotWrapper>
      </main>
    </LayoutClient>
  );
}



