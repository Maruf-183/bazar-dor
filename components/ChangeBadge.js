import { formatPct } from "@/lib/format";

export default function ChangeBadge({ change }) {
  const pct = Number(change?.pct ?? 0);
  const dir = change?.dir || "flat";

  if (dir === "up") {
    return (
      <span className="rounded-full bg-up-bg px-2 py-0.5 text-xs font-medium text-up">
        ▲ {formatPct(pct)}%
      </span>
    );
  }

  if (dir === "down") {
    return (
      <span className="rounded-full bg-down-bg px-2 py-0.5 text-xs font-medium text-down">
        ▼ {formatPct(pct)}%
      </span>
    );
  }

  return (
    <span className="rounded-full bg-flat-bg px-2 py-0.5 text-xs font-medium text-flat">
      — ০.০%
    </span>
  );
}
