"use client";

/* -------------------------------------------------------
 * ACTION KEYS – Vollständige Liste aller XP-Aktionen
 * ------------------------------------------------------- */
export type ActionKey =
  // ANALYSIS
  | "heatmap_view"
  | "correlation_view"
  | "correlation_hover"
  | "correlation_view_bubble"     
  | "correlation_view_square"  
  | "rootcause_view"
  | "rootcause_tabs_open"
  | "rootcause_view_hierarchy"
  | "rootcause_view_force"
  | "pdf_export"
  | "insight_view"
  | "simulation_run"
  | "alert_view"
  | "correlation_cell_click"
  | "rootcause_node_hover"
  | "analysis_view"
  | "rootcause_node_click"


  // SNAPSHOTS
  | "snapshot_heatmap"
  | "snapshot_correlation"
  | "snapshot_rootcause"
  | "snapshot_dashboard"
  | "snapshot_page"

  // CONTROL
  | "control_view"
  | "control_status_open"
  | "policy_engine_open"
  | "action_effects_open"
  | "control_loop_open"
  | "control_recommendations_open"

  // EXECUTIVE
  | "executive_view"
  | "executive_insights_open"
  | "executive_kpi_open"
  | "resilience_open"
  | "volatility_open"
  | "impactscore_open"
  | "forecast_confidence_open"
  | "costforecast_open"
  | "alerts_open"
  | "executive_resilience_open"
  | "executive_risk_open"
  | "executive_risk_timeline_open"
  | "executive_topfactors_open"
  | "energytrend_open"


  // GLOSSARY
  | "glossary_view"

  // DASHBOARD
  | "dashboard_view"
  | "dashboard_recommendation_click" 
  | "sensitive_zone_open" 
  | "kpi_open"
  | "kpi_view"
  | "trend_view"


  // SIMULATION
  | "simulation_view"
  | "montecarlo_open"
  | "scenario_composer_open"
  | "scenario_replay_open"
  | "smartforecast_open"
  | "simulation_timeline_open"

  | "quick_action_analysis"
  | "quick_action_executive"
  | "quick_action_control"
  | "quick_action_simulation"
  | "quick_action_glossary";

/* -------------------------------------------------------
 * BADGE IDs
 * ------------------------------------------------------- */
export type BadgeId =
  | "heatmap_explorer"
  | "correlation_reader"
  | "rootcause_analyst"
  | "pdf_author"
  | "insight_reader"
  | "simulation_starter"
  | "alert_responder"
  | "aems_executive"
  | "antifragile_leader";


export type GamificationState = {
  xp: number;
  level: number;
  actionCounts: Record<ActionKey, number>;
  unlockedBadges: BadgeId[];
  version: number;
};


/* -------------------------------------------------------
 * STORAGE
 * ------------------------------------------------------- */
const STORAGE_KEY = "aems_gamification_state_v1";
const CURRENT_VERSION = 1;


/* -------------------------------------------------------
 * XP VALUES (pro Aktion)
 * ------------------------------------------------------- */
export const XP_PER_ACTION: Record<ActionKey, number> = {
  // ANALYSIS
  heatmap_view: 5,
  correlation_view: 5,
  correlation_hover: 1,       // ← NEU
  rootcause_view: 10,
  rootcause_tabs_open: 3,
  rootcause_view_hierarchy: 5,
  rootcause_view_force: 5,
  rootcause_node_click: 3,
  pdf_export: 15,
  insight_view: 10,
  simulation_run: 20,
  alert_view: 10,
  analysis_view: 5,
  correlation_view_bubble: 3,
  correlation_view_square: 3,
  correlation_cell_click: 1,
  rootcause_node_hover: 1,

  
  quick_action_analysis: 5,
  quick_action_executive: 5,
  quick_action_control: 5,
  quick_action_simulation: 5,
  quick_action_glossary: 3,


  // SNAPSHOTS
  snapshot_heatmap: 8,
  snapshot_correlation: 8,
  snapshot_rootcause: 8,
  snapshot_dashboard: 8,
  snapshot_page: 10,

  // CONTROL
  control_view: 5,
  control_status_open: 2,
  policy_engine_open: 2,
  action_effects_open: 2,
  control_loop_open: 2,
  control_recommendations_open: 2,

  // EXECUTIVE
  executive_view: 5,
  executive_insights_open: 3,
  executive_kpi_open: 3,
  resilience_open: 3,
  volatility_open: 3,
  impactscore_open: 3,
  forecast_confidence_open: 3,
  costforecast_open: 3,
  alerts_open: 3,
  executive_resilience_open: 3,
  executive_risk_open: 3,
  executive_risk_timeline_open: 3,
  executive_topfactors_open: 3,
  energytrend_open: 3,


  // GLOSSARY
  glossary_view: 3,

  // DASHBOARD
  dashboard_view: 3,
  dashboard_recommendation_click: 5,
  sensitive_zone_open: 4,
  kpi_open: 2,
  kpi_view: 3,
  trend_view: 5,


  // SIMULATION
  simulation_view: 5,
  montecarlo_open: 5,
  scenario_composer_open: 5,
  scenario_replay_open: 5,
  smartforecast_open: 5,
  simulation_timeline_open: 5,
};


/* -------------------------------------------------------
 * BADGE DEFINITIONS
 * ------------------------------------------------------- */
export const BADGE_DEFINITIONS = [
  {
    id: "heatmap_explorer",
    title: "Heatmap Explorer",
    description: "Zum ersten Mal die Einfluss-Heatmap aktiv genutzt.",
    category: "Einsteiger",
  },
  {
    id: "correlation_reader",
    title: "Correlation Reader",
    description: "Korrelationen wiederholt analysiert.",
    category: "Lernen",
  },
  {
    id: "rootcause_analyst",
    title: "Ursachen-Analyst:in",
    description: "Root-Cause-Bereiche mehrfach analysiert.",
    category: "Lernen",
  },
  {
    id: "pdf_author",
    title: "Report Author",
    description: "Wiederholt AEMS-Reports erzeugt.",
    category: "Executive",
  },
  {
    id: "insight_reader",
    title: "Insight Reader",
    description: "Viele automatische Insights gelesen.",
    category: "Lernen",
  },
  {
    id: "simulation_starter",
    title: "Simulation Starter",
    description: "Zum ersten Mal eine Simulation gestartet.",
    category: "Resilienz",
  },
  {
    id: "alert_responder",
    title: "Alert Responder",
    description: "Mehrfach Alerts geöffnet und geprüft.",
    category: "Resilienz",
  },
  {
    id: "aems_executive",
    title: "AEMS Executive",
    description: "Über 200 XP im AEMS gesammelt.",
    category: "Executive",
  },
  {
    id: "antifragile_leader",
    title: "Antifragile Leader",
    description: "Mehr als 1000 XP gesammelt – antifragile Lernreise.",
    category: "Executive",
  }
] as const;

const BADGE_MAP = Object.fromEntries(
  BADGE_DEFINITIONS.map(b => [b.id, b])
) as Record<BadgeId, typeof BADGE_DEFINITIONS[number]>;


/* -------------------------------------------------------
 * DEFAULT STATE
 * ------------------------------------------------------- */
function emptyActions(): Record<ActionKey, number> {
  return Object.fromEntries(
    Object.keys(XP_PER_ACTION).map(k => [k, 0])
  ) as Record<ActionKey, number>;
}

export function getDefaultState(): GamificationState {
  return {
    xp: 0,
    level: 1,
    actionCounts: emptyActions(),
    unlockedBadges: [],
    version: CURRENT_VERSION,
  };
}


/* -------------------------------------------------------
 * LEVEL LOGIC
 * ------------------------------------------------------- */
function computeLevel(xp: number): number {
  if (xp >= 1000) return 5;
  if (xp >= 500) return 4;
  if (xp >= 250) return 3;
  if (xp >= 100) return 2;
  return 1;
}


/* -------------------------------------------------------
 * LOAD STATE
 * ------------------------------------------------------- */
export function loadGamificationState(): GamificationState {
  if (typeof window === "undefined") return getDefaultState();

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();

    const parsed = JSON.parse(raw);

    if (!parsed.version || parsed.version !== CURRENT_VERSION) {
      return getDefaultState();
    }

    return {
      xp: Number(parsed.xp ?? 0),
      level: computeLevel(parsed.xp ?? 0),
      actionCounts: { ...emptyActions(), ...(parsed.actionCounts ?? {}) },
      unlockedBadges: Array.isArray(parsed.unlockedBadges)
        ? parsed.unlockedBadges
        : [],
      version: CURRENT_VERSION
    };
  } catch {
    return getDefaultState();
  }
}


/* -------------------------------------------------------
 * SAVE STATE
 * ------------------------------------------------------- */
export function saveGamificationState(state: GamificationState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}


/* -------------------------------------------------------
 * BADGE CHECKING
 * ------------------------------------------------------- */
function checkBadges(next: GamificationState, prev: GamificationState): BadgeId[] {
  const newOnes: BadgeId[] = [];
  const A = next.actionCounts;
  const P = prev.actionCounts;

  const unlock = (id: BadgeId, cond: boolean) => {
    if (cond && !prev.unlockedBadges.includes(id)) {
      next.unlockedBadges.push(id);
      newOnes.push(id);
    }
  };

  // Heatmap badge
  unlock("heatmap_explorer", A.heatmap_view >= 1 && P.heatmap_view < 1);

  // Correlation badge — jetzt korrekt, inkl. Hover
  unlock(
    "correlation_reader",
    (A.correlation_view >= 3 && P.correlation_view < 3) ||
    (A.correlation_hover >= 20 && P.correlation_hover < 20)   // ← wie besprochen
  );

  // Rootcause badge — vereint ALLE Rootcause-Actions
  unlock(
    "rootcause_analyst",
    (A.rootcause_view >= 3 && P.rootcause_view < 3) ||
    (A.rootcause_tabs_open >= 3 && P.rootcause_tabs_open < 3) ||
    (A.rootcause_view_hierarchy >= 3 && P.rootcause_view_hierarchy < 3) ||
    (A.rootcause_view_force >= 3 && P.rootcause_view_force < 3) ||
    (A.snapshot_rootcause >= 3 && P.snapshot_rootcause < 3)
  );

  unlock("pdf_author", A.pdf_export >= 3 && P.pdf_export < 3);
  unlock("insight_reader", A.insight_view >= 10 && P.insight_view < 10);
  unlock("simulation_starter", A.simulation_run >= 1 && P.simulation_run < 1);
  unlock("alert_responder", A.alert_view >= 5 && P.alert_view < 5);

  unlock("aems_executive", next.xp >= 200 && prev.xp < 200);
  unlock("antifragile_leader", next.xp >= 1000 && prev.xp < 1000);

  return newOnes;
}


/* -------------------------------------------------------
 * AWARD XP
 * ------------------------------------------------------- */
export function awardXp(action: ActionKey) {
  const prev = loadGamificationState();
  const xpGain = XP_PER_ACTION[action] ?? 0;

  const next: GamificationState = {
    ...prev,
    xp: prev.xp + xpGain,
    level: computeLevel(prev.xp + xpGain),
    actionCounts: {
      ...prev.actionCounts,
      [action]: prev.actionCounts[action] + 1,
    },
  };

  const unlocked = checkBadges(next, prev);

  saveGamificationState(next);

  if (typeof window !== "undefined") {    
    window.dispatchEvent(
      new CustomEvent("aems-gamification-updated", { detail: next })
    );
    if (unlocked.length) {
      window.dispatchEvent(
        new CustomEvent("aems-gamification-badges-unlocked", {
          detail: unlocked,
        })
      );
    }
  }

  return { state: next, newlyUnlocked: unlocked };
}


/* -------------------------------------------------------
 * BADGE METADATA
 * ------------------------------------------------------- */
export function getBadgeDefinition(id: BadgeId) {
  return BADGE_MAP[id];
}


