"use client";

import { useMemo, useState } from "react";
import { FlaskConical, Play } from "lucide-react";

export default function BacktestingPage() {
  const [symbol, setSymbol] = useState("XAU/USD");
  const [strategy, setStrategy] = useState("breakout");
  const [risk, setRisk] = useState("1");
  const [trades, setTrades] = useState("50");
  const [ran, setRan] = useState(false);

  const results = useMemo(() => {
    if (!ran) return null;

    const n = Math.max(10, parseInt(trades, 10) || 50);
    const winRate = strategy === "breakout" ? 0.48 : strategy === "mean" ? 0.55 : 0.42;
    const wins = Math.round(n * winRate);
    const losses = n - wins;
    const avgWin = 1.8;
    const avgLoss = 1;
    const expectancy = winRate * avgWin - (1 - winRate) * avgLoss;
    const netR = +(wins * avgWin - losses * avgLoss).toFixed(1);

    return {
      n,
      wins,
      losses,
      winRate: +(winRate * 100).toFixed(1),
      expectancy: +expectancy.toFixed(2),
      netR,
      maxDD: strategy === "mean" ? 8.2 : strategy === "breakout" ? 12.5 : 15.1,
    };
  }, [ran, trades, strategy]);

  function runTest(e: React.FormEvent) {
    e.preventDefault();
    setRan(true);
  }

  return (
    <main className="min-h-screen px-4 py-7 sm:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <header>
          <p className="text-xs text-[var(--muted)]">Workspace / Backtesting</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            Backtesting
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Simulate strategy outcomes. Educational demo — not live historical tick data.
          </p>
        </header>

        <form
          onSubmit={runTest}
          className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
        >
          <div className="flex items-center gap-2">
            <FlaskConical size={16} className="text-[var(--accent)]" />
            <p className="text-sm font-semibold">Simulation setup</p>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs text-[var(--muted)]">
                Symbol
              </label>
              <select
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm"
              >
                {["XAU/USD", "EUR/USD", "BTC/USD", "GBP/USD", "USD/JPY"].map(
                  (s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs text-[var(--muted)]">
                Strategy style
              </label>
              <select
                value={strategy}
                onChange={(e) => setStrategy(e.target.value)}
                className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm"
              >
                <option value="breakout">Breakout</option>
                <option value="mean">Mean reversion</option>
                <option value="trend">Trend following</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs text-[var(--muted)]">
                Risk per trade (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={risk}
                onChange={(e) => setRisk(e.target.value)}
                className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--accent-border)]"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs text-[var(--muted)]">
                Sample trades
              </label>
              <input
                type="number"
                value={trades}
                onChange={(e) => setTrades(e.target.value)}
                className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--accent-border)]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 inline-flex h-10 items-center gap-2 rounded-xl bg-[var(--accent)] px-4 text-sm font-semibold text-[#050607]"
          >
            <Play size={15} />
            Run simulation
          </button>
        </form>

        {results && (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["Trades", String(results.n)],
                ["Win rate", `${results.winRate}%`],
                ["Net R", `${results.netR}R`],
                ["Wins", String(results.wins)],
                ["Losses", String(results.losses)],
                ["Expectancy", `${results.expectancy}R`],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
                >
                  <p className="text-xs text-[var(--muted)]">{label}</p>
                  <p className="mt-2 text-xl font-semibold">{value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <p className="text-sm font-semibold">Summary</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                Simulated <strong>{symbol}</strong> with a{" "}
                <strong>{strategy}</strong> style over {results.n} trades at{" "}
                {risk}% risk. Approximate max drawdown in this sample:{" "}
                {results.maxDD}%. This is a simplified educational model, not a
                guarantee of live results.
              </p>
            </div>
          </div>
        )}

        {!results && (
          <div className="rounded-2xl border border-dashed border-[var(--border)] py-14 text-center text-sm text-[var(--muted)]">
            Configure parameters and run a simulation to see results.
          </div>
        )}
      </div>
    </main>
  );
}
