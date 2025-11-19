"use client";

type Status = "ok" | "warning" | "critical";

const STATUS_CONFIG: Record<
  Status,
  { label: string; dot: string; bg: string; text: string }
> = {
  ok: {
    label: "Stabil",
    dot: "bg-[var(--aems-color-ok)]",
    bg: "bg-[color:var(--aems-color-accent-soft)]",
    text: "text-[var(--aems-color-ok)]",
  },
  warning: {
    label: "Achtung",
    dot: "bg-[var(--aems-color-warning)]",
    bg: "bg-yellow-500/10",
    text: "text-yellow-400",
  },
  critical: {
    label: "Kritisch",
    dot: "bg-[var(--aems-color-critical)]",
    bg: "bg-red-500/10",
    text: "text-red-400",
  },
};

export function StatusBadge({
  status,
  label,
}: {
  status: Status;
  label?: string;
}) {
  const cfg = STATUS_CONFIG[status];

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}
    >
      <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
      <span>{label ?? cfg.label}</span>
    </span>
  );
}
