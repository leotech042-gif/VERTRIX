"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { getSession } from "@/lib/auth";
import {
  filterByPeriod,
  summarize,
  type Period,
  type TradeRecord,
} from "@/lib/performance";

const KEY = "veytrix-trades";

const PERIODS: { id: Period; label: string }[] = [
  { id: "week", label: "Last week" },
  { id: "3weeks", label: "Last 3 weeks" },
  { id: "month", label: "1 month" },
  { id: "4months", label: "4 months" },
  { id: "year", label: "Last year" },
  { id: "total", label: "Total" },
];

export default function JournalPage() {
  const [trades, setTrades] = useState<TradeRecord[]>([]);
  const [period, setPeriod] = useState<Period>("total");
  const [ready, setReady] = useState(false);
  const [startedAt, setStartedAt] = useState<string | undefined>();

  const [symbol, setSymbol] = useState("XAU/USD");
  const [side, setSide] = useState<"Long" | "Short">("Long");
  const [result, setResult] = useState<TradeRecord["result"]>("Open");
  const [notes, setNotes] = useState("");
  const [rMultiple, setRMultiple] = useState("");

  useEffect(() => {
    const s = getSession();
    setStartedAt(s?.startedAt);
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setTrades(JSON.parse(raw));
    } catch {
      // ignore
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify(trades));
  }, [trades, ready]);

  const filtered = useMemo(
    () => filterByPeriod(trades, period, startedAt),
    [trades, period, startedAt],
  );
  const stats = useMemo(() => summarize(filtered), [filtered]);

  function addTrade(e: React.FormEvent) {
    e.preventDefault();
    const t: TradeRecord = {
      id: crypto.randomUUID(),
      symbol: symbol.trim().toUpperCase(),
      side,
      entry: 0,
      result,
      openedAt: new Date().toISOString(),
      closedAt: result === "Open" ? undefined : new Date().toISOString(),
      notes: notes.trim() || undefined,
      rMultiple: rMultiple ? parseFloat(rMultiple) : undefined,
    };
    setTrades((prev) => [t, ...prev]);
    setNotes("");
    setRMultiple("");
  }

  function remove(id: string) {
    setTrades((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <main className="min-h-screen px-4 py-7 sm:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <header>
          <p className="text-xs text-[var(--muted)]">Workspace / Journal</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Journal & performance</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Track results by period from when you started using the app.
            {startedAt && (
              <span className="ml-1 text-[var(--muted-strong)]">
                Started {new Date(startedAt).toLocaleDateString()}
              </span>
            )}
          </p>
        </header>

        <div className="flex flex-wrap gap-2">
          {PERIODS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPeriod(p.id)}
              className={`rounded-lg border px-3 py-1.5 text-xs transition ${
                period === p.id
                  ? "border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent)]"
                  : "border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-4">
          {[
            ["Trades", String(stats.total)],
            ["Win rate", `${stats.winRate}%`],
            ["Wins / Losses", `${stats.wins} / ${stats.losses}`],
            ["Avg R", String(stats.avgR)],
          ].map(([l, v]) => (
            <div
              key={l}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <p className="text-xs text-[var(--muted)]">{l}</p>
              <p className="mt-2 text-xl font-semibold">{v}</p>
            </div>
          ))}
        </div>

        <form
          onSubmit={addTrade}
          className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
        >
          <p className="text-sm font-semibold">Log trade</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <input
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              placeholder="Symbol"
              className="h-10 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--accent-border)]"
            />
            <select
              value={side}
              onChange={(e) => setSide(e.target.value as "Long" | "Short")}
              className="h-10 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm"
            >
              <option value="Long">Long</option>
              <option value="Short">Short</option>
            </select>
            <select
              value={result}
              onChange={(e) => setResult(e.target.value as TradeRecord["result"])}
              className="h-10 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm"
            >
              <option value="Open">Open</option>
              <option value="Win">Win</option>
              <option value="Loss">Loss</option>
              <option value="BE">Break even</option>
            </select>
            <input
              value={rMultiple}
              onChange={(e) => setRMultiple(e.target.value)}
              placeholder="R multiple (e.g. 1.5)"
              className="h-10 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--accent-border)]"
            />
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Why you took it · what happened · lesson"
            rows={2}
            className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--accent-border)]"
          />
          <button
            type="submit"
            className="mt-3 inline-flex h-10 items-center gap-2 rounded-xl bg-[var(--accent)] px-4 text-sm font-semibold text-[#050607]"
          >
            <Plus size={15} /> Add
          </button>
        </form>

        <div className="space-y-2">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="flex items-start justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{t.symbol}</span>
                  <span className="text-[10px] text-[var(--muted)]">{t.side}</span>
                  <span className="text-[10px] text-[var(--muted)]">{t.result}</span>
                  {t.rMultiple != null && (
                    <span className="text-[10px] text-[var(--accent)]">{t.rMultiple}R</span>
                  )}
                </div>
                <p className="mt-1 text-[10px] text-[var(--muted)]">
                  Opened {new Date(t.openedAt).toLocaleString()}
                  {t.closedAt && ` · Closed ${new Date(t.closedAt).toLocaleString()}`}
                </p>
                {t.notes && (
                  <p className="mt-2 text-sm text-[var(--muted-strong)]">{t.notes}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => remove(t.id)}
                className="rounded-lg border border-[var(--border)] p-2 text-[var(--muted)] hover:text-[var(--danger)]"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="py-10 text-center text-sm text-[var(--muted)]">
              No trades in this period yet.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
