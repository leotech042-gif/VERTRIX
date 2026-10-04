"use client";

import { useState } from "react";
import { TradingChart } from "@/components/charts/TradingChart";
import { SpreadPanel } from "@/components/charts/SpreadPanel";

const SYMBOLS = [
  "BTCUSD",
  "ETHUSD",
  "SOLUSD",
  "XAUUSD",
  "EURUSD",
  "GBPUSD",
  "USDJPY",
  "US100",
  "USOIL",
];

const TFS = ["1m", "5m", "15m", "30m", "1h", "4h", "1d"] as const;

export default function TerminalPage() {
  const [symbol, setSymbol] = useState("BTCUSD");
  const [tf, setTf] = useState<(typeof TFS)[number]>("15m");

  return (
    <div className="flex min-h-screen flex-col">
      {/* Chart-first header */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[var(--border)] bg-[var(--surface)] px-4 py-3">
        <h1 className="mr-2 text-sm font-semibold tracking-tight">Chart</h1>

        <select
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="h-9 rounded-lg border border-[var(--border)] bg-[var(--bg)] px-2 text-sm outline-none focus:border-[var(--accent-border)]"
        >
          {SYMBOLS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <div className="flex flex-wrap gap-1">
          {TFS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTf(t)}
              className={`h-8 rounded-md px-2.5 text-xs transition ${
                tf === t
                  ? "bg-[var(--accent-soft)] font-medium text-[var(--accent)]"
                  : "text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--fg)]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Full chart workspace */}
      <div className="grid flex-1 gap-0 lg:grid-cols-[1fr_280px]">
        <div className="p-3 lg:p-4">
          <TradingChart symbol={symbol} timeframe={tf} height={560} />
        </div>

        <aside className="border-t border-[var(--border)] p-3 lg:border-l lg:border-t-0 lg:p-4">
          <SpreadPanel symbol={symbol} />

          <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-xs leading-relaxed text-[var(--muted)]">
            <p className="font-medium text-[var(--fg)]">About this chart</p>
            <p className="mt-2">
              Standalone chart terminal. Crypto bid/ask comes from the exchange
              order book (typically a very tight spread). FX/metals use a tight
              synthetic spread when no public book exists — labeled as such.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
