// app/control/page.tsx
"use client";

import React, { useEffect } from "react";

import LayoutClient from "@/components/layout/LayoutClient";
import AEMSHeader from "@/components/AEMSHeader";

import ControlStatusPanel from "@/components/control/ControlStatusPanel";
import AdaptivePolicyEnginePanel from "@/components/control/AdaptivePolicyEnginePanel";
import ActionEffectsBridgePanel from "@/components/control/ActionEffectsBridgePanel";
import ControlLoopPanel from "@/components/control/ControlLoopPanel";
import ControlRecommendationsPanel from "@/components/control/ControlRecommendationsPanel";

import { parseWithGlossaryInline } from "@/lib/glossary/parser";
import { awardXp } from "@/lib/gamification/xp";

export default function ControlPage() {

  // XP beim Öffnen der Seite
  useEffect(() => {
    awardXp("control_view");
  }, []);

  return (
    <LayoutClient>
      <main className="pt-10 pb-20 space-y-16">

        {/* HEADER */}
        <AEMSHeader
          title="Adaptive Control Center"
          subtitle={parseWithGlossaryInline(
            "Systemstatus · Policies · Wirkungsmodelle · Empfehlungen"
          )}
        />

        {/* BLOCK 1 – SYSTEMSTATUS */}
        <div onClick={() => awardXp("control_status_open")}>
          <ControlStatusPanel />
        </div>

        {/* BLOCK 2 – ADAPTIVE POLICY ENGINE */}
        <div onClick={() => awardXp("policy_engine_open")}>
          <AdaptivePolicyEnginePanel />
        </div>

        {/* BLOCK 3 – ACTION EFFECTS BRIDGE */}
        <div onClick={() => awardXp("action_effects_open")}>
          <ActionEffectsBridgePanel />
        </div>

        {/* BLOCK 4 – CONTROL LOOP MONITORING */}
        <div onClick={() => awardXp("control_loop_open")}>
          <ControlLoopPanel />
        </div>

        {/* BLOCK 5 – EMPFEHLUNGEN */}
        <div onClick={() => awardXp("control_recommendations_open")}>
          <ControlRecommendationsPanel />
        </div>

      </main>
    </LayoutClient>
  );
}


