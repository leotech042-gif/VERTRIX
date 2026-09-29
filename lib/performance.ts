export type TradeRecord = {
  id: string;
  symbol: string;
  side: "Long" | "Short";
  entry: number;
  exit?: number;
  result: "Win" | "Loss" | "BE" | "Open";
  openedAt: string;
  closedAt?: string;
  notes?: string;
  rMultiple?: number;
};

export type Period =
  | "week"
  | "3weeks"
  | "month"
  | "4months"
  | "year"
  | "total";

export function filterByPeriod(
  trades: TradeRecord[],
  period: Period,
  startedAt?: string,
): TradeRecord[] {
  const now = Date.now();
  const startMs = (() => {
    switch (period) {
      case "week":
        return now - 7 * 86400000;
      case "3weeks":
        return now - 21 * 86400000;
      case "month":
        return now - 30 * 86400000;
      case "4months":
        return now - 120 * 86400000;
      case "year":
        return now - 365 * 86400000;
      case "total":
      default:
        return startedAt ? new Date(startedAt).getTime() : 0;
    }
  })();

  return trades.filter((t) => {
    const tMs = new Date(t.closedAt || t.openedAt).getTime();
    return tMs >= startMs;
  });
}

export function summarize(trades: TradeRecord[]) {
  const closed = trades.filter((t) => t.result !== "Open");
  const wins = closed.filter((t) => t.result === "Win").length;
  const losses = closed.filter((t) => t.result === "Loss").length;
  const be = closed.filter((t) => t.result === "BE").length;
  const open = trades.filter((t) => t.result === "Open").length;
  const winRate = closed.length ? (wins / closed.length) * 100 : 0;
  const avgR =
    closed.length > 0
      ? closed.reduce((s, t) => s + (t.rMultiple ?? 0), 0) / closed.length
      : 0;

  return {
    total: trades.length,
    closed: closed.length,
    wins,
    losses,
    be,
    open,
    winRate: +winRate.toFixed(1),
    avgR: +avgR.toFixed(2),
  };
}
