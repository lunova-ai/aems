"use client";

export type ActionKey =
  | "heatmap_view"
  | "correlation_view"
  | "rootcause_view"
  | "pdf_export"
  | "insight_view"
  | "simulation_run"
  | "alert_view"
  | "control_view"
  | "control_status_open"
  | "policy_engine_open"
  | "action_effects_open"
  | "control_loop_open"
  | "control_recommendations_open";

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

const STORAGE_KEY = "aems_gamification_state_v1";
const CURRENT_VERSION = 1;

/* -------------------------------------------------------
 * XP TABLE
 * ------------------------------------------------------- */
const XP_PER_ACTION: Record<ActionKey, number> = {
  heatmap_view: 5,
  correlation_view: 5,
  rootcause_view: 10,
  pdf_export: 15,
  insight_view: 10,
  simulation_run: 20,
  alert_view: 10,
  control_view: 5,

  // NEW XP ACTIONS
  control_status_open: 5,
  policy_engine_open: 5,
  action_effects_open: 5,
  control_loop_open: 5,
  control_recommendations_open: 5,
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
    description: "Mehrfach mit Korrelationsanalysen gearbeitet.",
    category: "Lernen",
  },
  {
    id: "rootcause_analyst",
    title: "Ursachen-Analyst:in",
    description: "Ursachenbäume wiederholt untersucht.",
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
    description: "Mehr als 1000 XP gesammelt – echte antifragile Lernreise.",
    category: "Executive",
  }
] as const;

const BADGE_MAP = Object.fromEntries(
  BADGE_DEFINITIONS.map(b => [b.id, b])
) as Record<BadgeId, typeof BADGE_DEFINITIONS[number]>;

/* -------------------------------------------------------
 * DEFAULT ACTION COUNTS
 * ------------------------------------------------------- */
function emptyActions(): Record<ActionKey, number> {
  return {
    heatmap_view: 0,
    correlation_view: 0,
    rootcase_view: 0,
    pdf_export: 0,
    insight_view: 0,
    simulation_run: 0,
    alert_view: 0,
    control_view: 0,

    // NEW ACTION KEYS
    control_status_open: 0,
    policy_engine_open: 0,
    action_effects_open: 0,
    control_loop_open: 0,
    control_recommendations_open: 0,
  };
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
 * LEVEL SYSTEM
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
      version: CURRENT_VERSION,
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
 * BADGE LOGIC
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

  unlock("heatmap_explorer", A.heatmap_view >= 1 && P.heatmap_view < 1);
  unlock("correlation_reader", A.correlation_view >= 3 && P.correlation_view < 3);
  unlock("rootcause_analyst", A.rootcause_view >= 3 && P.rootcause_view < 3);
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
    window.dispatchEvent(new CustomEvent("aems-gamification-updated", { detail: next }));
    if (unlocked.length) {
      window.dispatchEvent(new CustomEvent("aems-gamification-badges-unlocked", { detail: unlocked }));
    }
  }

  return { state: next, newlyUnlocked: unlocked };
}

export function getBadgeDefinition(id: BadgeId) {
  return BADGE_MAP[id];
}
