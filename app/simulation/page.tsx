// app/simulation/page.tsx
"use client";

import React, { useEffect } from "react";

import LayoutClient from "@/components/layout/LayoutClient";
import AEMSHeader from "@/components/AEMSHeader";

import MonteCarloSimulator from "@/components/simulation/MonteCarloSimulator";
import ScenarioComposer from "@/components/simulation/ScenarioComposer";
import ScenarioReplay from "@/components/simulation/ScenarioReplay";
import SimulationTimeline from "@/components/simulation/SimulationTimeline";
import SmartForecastEngine from "@/components/simulation/SmartForecastEngine";

import { awardXp } from "@/lib/gamification/xp";

export default function SimulationPage() {
  // XP beim Öffnen der Seite
  useEffect(() => {
    awardXp("simulation_view");
  }, []);

  return (
    <LayoutClient>
      <main className="pt-10 pb-24 space-y-16">

        {/* HEADER */}
        <AEMSHeader
          title="Simulation & Szenarien"
          subtitle="Monte Carlo · What-If · Replay · KI-basierter Forecast"
        />

        {/* MONTE CARLO SIMULATOR */}
        <div onClick={() => awardXp("montecarlo_open")}>
          <MonteCarloSimulator />
        </div>

        {/* SCENARIO COMPOSER */}
        <div onClick={() => awardXp("scenario_composer_open")}>
          <ScenarioComposer />
        </div>

        {/* SCENARIO REPLAY */}
        <div onClick={() => awardXp("scenario_replay_open")}>
          <ScenarioReplay />
        </div>

        {/* KI-FORECAST ENGINE */}
        <div onClick={() => awardXp("smartforecast_open")}>
          <SmartForecastEngine />
        </div>

        {/* SIMULATION TIMELINE */}
        <div onClick={() => awardXp("simulation_timeline_open")}>
          <SimulationTimeline />
        </div>

      </main>
    </LayoutClient>
  );
}
