"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";

import { parseWithGlossaryInline } from "@/lib/glossary/parser";

// Mock-Daten + Typen sauber getrennt
import {
  mockKpis,
  mockTrend,
  mockZones,
  mockRecommendations
} from "@/lib/mock/dashboardMock";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area
} from "recharts";

// Types aus dem Datenmodell – NICHT aus mock!
import {
  DashboardKpi,
  DashboardZone,
  DashboardRecommendation,
  DashboardTrend
} from "@/lib/dashboard/dashboardModel";

// -------------------------------------------------------------
// HELPER FÜR STATUSFARBEN
// -------------------------------------------------------------
const getStatusColor = (severity?: string) => {
  switch (severity) {
    case "good":
      return "text-green-400";
    case "medium":
      return "text-yellow-400";
    case "bad":
      return "text-red-400";
    default:
      return "text-gray-300";
  }
};

// -------------------------------------------------------------
// KPI CARD (STRICT MODE SAFE)
// -------------------------------------------------------------
function KpiCard(kpi: DashboardKpi) {
  const {
    label,
    value,
    unit,
    severity,
    description,
    trend,
    trendLabel
  } = kpi;

  return (
    <AEMSCard className="p-4 flex flex-col gap-1">
      <div className="text-sm text-gray-400">{label}</div>

      <div className="text-2xl font-bold text-white flex items-center gap-2">
        {value}
        {unit && <span className="text-base text-gray-400">{unit}</span>}
      </div>

      <div className={`${getStatusColor(severity)} text-sm font-semibold`}>
        {trend !== undefined && trendLabel && (
          <>
            {trend > 0 ? "+" : ""}
            {trend.toFixed(1)} ({trendLabel})
          </>
        )}
      </div>

      <div className="text-xs text-gray-400 mt-1 leading-relaxed">
        {parseWithGlossaryInline(description)}
      </div>
    </AEMSCard>
  );
}

// -------------------------------------------------------------
// ZONE CARD
// -------------------------------------------------------------
function ZoneCard(zone: DashboardZone) {
  const { title, status, bullets } = zone;

  const color =
    status === "hoch"
      ? "text-red-400"
      : status === "mittel"
      ? "text-yellow-400"
      : "text-green-400";

  return (
    <AEMSCard className="p-4">
      <div className="flex justify-between mb-2">
        <div className="text-white font-semibold text-sm">
          {parseWithGlossaryInline(title)}
        </div>
        <div className={`${color} text-xs uppercase`}>{status}</div>
      </div>

      <ul className="text-xs text-gray-300 space-y-1">
        {bullets.map((b, i) => (
          <li key={i}>• {parseWithGlossaryInline(b)}</li>
        ))}
      </ul>
    </AEMSCard>
  );
}

// -------------------------------------------------------------
// RECOMMENDATION CARD
// -------------------------------------------------------------
function RecommendationCard({ item }: { item: DashboardRecommendation }) {
  return (
    <AEMSCard className="p-4 space-y-2">
      <div className="text-white font-semibold">
        {parseWithGlossaryInline(item.title)}
      </div>

      <div className="text-xs text-gray-400 leading-relaxed">
        <strong className="text-aems-neon">Warum:</strong>{" "}
        {parseWithGlossaryInline(item.why)}
      </div>

      <div className="text-xs text-gray-400 leading-relaxed">
        <strong className="text-aems-neon">Was tun:</strong>{" "}
        {parseWithGlossaryInline(item.what)}
      </div>

      <div className="text-xs text-gray-400 leading-relaxed">
        <strong className="text-aems-neon">Wenn nicht:</strong>{" "}
        {parseWithGlossaryInline(item.whatIf)}
      </div>

      <button className="text-xs text-aems-neon underline mt-2">
        {item.howLabel}
      </button>
    </AEMSCard>
  );
}

// -------------------------------------------------------------
// TREND CHART
// -------------------------------------------------------------
function TrendChart() {
  const data = mockTrend.values.map((v, i) => {
    const band = mockTrend.uncertaintyBand[i];
    return {
      x: i,
      value: v,
      low: band?.[0] ?? v,
      high: band?.[1] ?? v
    };
  });

  return (
    <div className="w-full h-64">
      <LineChart
        width={600}
        height={240}
        data={data}
        margin={{ top: 10, bottom: 0, left: -10, right: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
        <XAxis dataKey="x" stroke="#777" />
        <YAxis stroke="#777" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="high"
          stroke="none"
          fill="rgba(0,231,179,0.15)"
        />
        <Area
          type="monotone"
          dataKey="low"
          stroke="none"
          fill="rgba(0,231,179,0.02)"
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#00E7B3"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </div>
  );
}


// -------------------------------------------------------------
// MAIN DASHBOARD
// -------------------------------------------------------------
export default function AEMSDashboard() {
  return (
    <AEMSSection title="Executive Dashboard – Antifragiles Energiemanagement">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {mockKpis.map(({ key, ...rest }) => (
        <KpiCard key={key} {...rest} />
        ))}
      </div>

      {/* Trend */}
      <AEMSCard className="mb-8 p-6">
        <div className="text-white font-semibold mb-4">
          Systemtrend{mockTrend.label ? `: ${mockTrend.label}` : ""}
        </div>
        <TrendChart />
      </AEMSCard>

      {/* Zones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {mockZones.map((z, i) => (
          <ZoneCard key={i} {...z} />
        ))}
      </div>

      {/* Recommendations */}
      <AEMSSection title="Priorisierte Empfehlungen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockRecommendations.map((rec, i) => (
            <RecommendationCard key={i} item={rec} />
          ))}
        </div>
      </AEMSSection>
    </AEMSSection>
  );
}
