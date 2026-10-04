"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/utils";

type Quote = {
  symbol: string;
  display?: string;
  price: number;
  bid: number;
  ask: number;
  mid?: number;
  spread: number;
  spread_bps?: number;
  spread_source?: string;
  change_percent?: number;
  delayed?: boolean;
  source?: string;
};

function fmt(n: number | undefined, digits = 5) {
  if (n == null || Number.isNaN(n)) return "—";
  if (Math.abs(n) >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
  if (Math.abs(n) >= 1) return n.toFixed(Math.min(digits, 4));
  return n.toFixed(digits);
}

export function SpreadPanel({ symbol }: { symbol: string }) {
  const [q, setQ] = useState<Quote | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        const r = await fetch(
          `${API_URL}/api/v1/market/ticker?symbol=${encodeURIComponent(symbol)}`,
        );
        if (!r.ok) throw new Error(`ticker ${r.status}`);
        const j = await r.json();
        if (alive) {
          setQ(j);
          setError("");
        }
      } catch (e) {
        if (alive) setError(e instanceof Error ? e.message : "quote failed");
      }
    }

    load();
    const id = setInterval(load, 2500);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [symbol]);

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-[var(--muted)]">Quote · {q?.display || symbol}</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums">
            {q ? fmt(q.price) : "—"}
          </p>
          {q?.change_percent != null && (
            <p
              className={`mt-0.5 text-xs tabular-nums ${
                q.change_percent >= 0 ? "text-[var(--accent)]" : "text-[var(--danger)]"
              }`}
            >
              {q.change_percent >= 0 ? "+" : ""}
              {q.change_percent.toFixed(2)}%
            </p>
          )}
        </div>
        <div className="text-right text-[10px] text-[var(--muted)]">
          {q?.delayed ? "Delayed feed" : "Live feed"}
          {q?.source && <span className="block">{q.source}</span>}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2.5">
          <p className="text-[9px] uppercase tracking-wider text-[var(--muted)]">Bid</p>
          <p className="mt-1 text-sm font-semibold tabular-nums text-[var(--accent)]">
            {q ? fmt(q.bid) : "—"}
          </p>
        </div>
        <div className="rounded-lg border border-[var(--accent-border)] bg-[var(--accent-soft)] px-3 py-2.5">
          <p className="text-[9px] uppercase tracking-wider text-[var(--accent)]">Spread</p>
          <p className="mt-1 text-sm font-semibold tabular-nums">
            {q ? fmt(q.spread, 6) : "—"}
          </p>
          {q?.spread_bps != null && (
            <p className="text-[9px] text-[var(--muted)]">{q.spread_bps} bps</p>
          )}
        </div>
        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2.5">
          <p className="text-[9px] uppercase tracking-wider text-[var(--muted)]">Ask</p>
          <p className="mt-1 text-sm font-semibold tabular-nums text-[var(--danger)]">
            {q ? fmt(q.ask) : "—"}
          </p>
        </div>
      </div>

      {q?.spread_source === "book" && (
        <p className="mt-3 text-[10px] text-[var(--muted)]">
          Spread from live exchange book (tight).
        </p>
      )}
      {q?.spread_source === "synthetic_tight" && (
        <p className="mt-3 text-[10px] text-[var(--muted)]">
          Tight synthetic spread around mid (provider has no public book).
        </p>
      )}
      {error && <p className="mt-2 text-xs text-[var(--danger)]">{error}</p>}
    </div>
  );
}
