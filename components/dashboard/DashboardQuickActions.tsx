"use client";

import Link from "next/link";
import AEMSCard from "@/components/AEMSCard";
import { awardXp } from "@/lib/gamification/xp";
import { parseWithGlossaryInline } from "@/lib/glossary/parser";

export default function DashboardQuickActions() {
  return (
    <AEMSCard className="overflow-visible p-6">
      
      {/* TITLE */}
      <h3 className="text-lg font-semibold text-white mb-4">
        {parseWithGlossaryInline("Schnellaktionen")}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* ANALYSE */}
        <Link
          href="/analysis"
          onClick={() => awardXp("quick_action_analysis")}
          className="
            w-full px-4 py-2 text-center
            bg-aems-neon/20 border border-aems-neon/40
            rounded-xl text-aems-neon font-medium
            hover:bg-aems-neon/30 transition block
          "
        >
          Analyse öffnen
        </Link>

        {/* EXECUTIVE DASHBOARD */}
        <Link
          href="/executive"
          onClick={() => awardXp("quick_action_executive")}
          className="
            w-full px-4 py-2 text-center
            bg-aems-soft/20 border border-aems-soft/40
            rounded-xl text-aems-soft font-medium
            hover:bg-aems-soft/30 transition block
          "
        >
          Executive Dashboard
        </Link>

        {/* CONTROL LOOP */}
        <Link
          href="/control"
          onClick={() => awardXp("quick_action_control")}
          className="
            w-full px-4 py-2 text-center
            bg-white/5 border border-white/10
            rounded-xl text-gray-200 font-medium
            hover:bg-white/10 transition block
          "
        >
          Control Loop
        </Link>

        {/* SIMULATION */}
        <Link
          href="/simulation"
          onClick={() => awardXp("quick_action_simulation")}
          className="
            w-full px-4 py-2 text-center
            bg-white/5 border border-white/10
            rounded-xl text-gray-200 font-medium
            hover:bg-white/10 transition block
          "
        >
          Simulation starten
        </Link>

        {/* GLOSSAR */}
        <Link
          href="/glossary"
          onClick={() => awardXp("quick_action_glossary")}
          className="
            w-full px-4 py-2 text-center
            bg-white/5 border border-white/10
            rounded-xl text-gray-200 font-medium
            hover:bg-white/10 transition block
          "
        >
          Glossar
        </Link>

      </div>
    </AEMSCard>
  );
}


