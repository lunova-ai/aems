"use client";

import React from "react";
import AEMSSection from "@/components/AEMSSection";
import AEMSCard from "@/components/AEMSCard";

import { parseWithGlossaryInline } from "@/lib/glossary/parser";

import {
  mockKpis,
  mockTrend,
  mockZones,
  mockRecommendations
} from "@/lib/dashboard/dashboardModel"; // deine erweiterte Datei

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area
} from "recharts";

// -------------------------------------------------------------
// Helper für Status-Farben
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
// KPI CARD
// -------------------------------------------------------------
function KpiCard({
  label,
  value,
  unit,
  severity,
  description,
  trend,
  trendLabel
}) {
  return (
    <AEMSCard className="p-4 flex flex-col gap-1">
      <div className="text-sm text-gray-400">{label}</div>

      <div className="text-2xl font-bold text-white flex items-center gap-2">
        {value}
        {unit && <span className="text-base text-gray-400">{unit}</span>}
      </div>

      <div className={`${getStatusColor(severity)} text-sm font-semibold`}>
        {trend !== undefined && (
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
function ZoneCard({ title, status, bullets }) {
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
function RecommendationCard({ item }) {
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
// CHART UTIL
// -------------------------------------------------------------
function TrendChart() {
  const data = mockTrend.values.map((v, i) => ({
    x: i,
    value: v,
    low: mockTrend.uncertaintyBand[i][0],
    high: mockTrend.uncertaintyBand[i][1]
  }));

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {mockKpis.map((k) => (
          <KpiCard key={k.key} {...k} />
        ))}
      </div>

      <AEMSCard className="mb-8 p-6">
        <div className="text-white font-semibold mb-4">
          Systemtrend: {mockTrend.label}
        </div>
        <TrendChart />
      </AEMSCard>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {mockZones.map((z, i) => (
          <ZoneCard key={i} {...z} />
        ))}
      </div>

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
