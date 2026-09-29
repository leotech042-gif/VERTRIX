"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Calculator,
  ShieldCheck,
  Target,
} from "lucide-react";

export default function RiskEnginePage() {
  const [accountBalance, setAccountBalance] = useState("10000");
  const [riskPercent, setRiskPercent] = useState("1");
  const [entry, setEntry] = useState("2648.20");
  const [stop, setStop] = useState("2640.80");
  const [pipValue, setPipValue] = useState("1"); // $ per pip for 0.01 lot (simplified)

  const calc = useMemo(() => {
    const balance = parseFloat(accountBalance) || 0;
    const riskPct = parseFloat(riskPercent) || 0;
    const entryPrice = parseFloat(entry) || 0;
    const stopPrice = parseFloat(stop) || 0;
    const pip = parseFloat(pipValue) || 1;

    const riskAmount = balance * (riskPct / 100);
    const stopDistance = Math.abs(entryPrice - stopPrice);
    // Simplified: assume 1 point = 1 pip for metals demo
    const positionSize =
      stopDistance > 0 ? riskAmount / (stopDistance * pip) : 0;

    return {
      riskAmount: riskAmount.toFixed(2),
      stopDistance: stopDistance.toFixed(2),
      positionSize: positionSize.toFixed(2),
      maxLoss: riskAmount.toFixed(2),
    };
  }, [accountBalance, riskPercent, entry, stop, pipValue]);

  return (
    <main className="min-h-screen px-5 py-7 sm:px-8">
      <div className="mx-auto max-w-[1100px] space-y-7">
        <header>
          <div className="mb-2 flex items-center gap-2 text-xs text-[var(--muted)]">
            <span>Workspace</span>
            <span>/</span>
            <span className="text-[var(--foreground)]">Risk Engine</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-[-0.04em]">
            Risk Engine
          </h1>
          <p className="mt-1.5 text-sm text-[var(--muted)]">
            Calculate position size and risk before you enter the market
          </p>
        </header>

        <div className="grid gap-5 lg:grid-cols-2">
          {/* Inputs */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <div className="flex items-center gap-2">
              <Calculator size={16} className="text-[var(--accent)]" />
              <p className="text-sm font-semibold">Position calculator</p>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs text-[var(--muted)]">
                  Account balance ($)
                </label>
                <input
                  type="number"
                  value={accountBalance}
                  onChange={(e) => setAccountBalance(e.target.value)}
                  className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3.5 text-sm outline-none focus:border-[var(--accent-border)]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs text-[var(--muted)]">
                  Risk per trade (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={riskPercent}
                  onChange={(e) => setRiskPercent(e.target.value)}
                  className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3.5 text-sm outline-none focus:border-[var(--accent-border)]"
                />
                <div className="mt-2 flex gap-2">
                  {["0.5", "1", "1.5", "2"].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setRiskPercent(v)}
                      className={`rounded-lg border px-2.5 py-1 text-[10px] ${
                        riskPercent === v
                          ? "border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent)]"
                          : "border-[var(--border)] text-[var(--muted)]"
                      }`}
                    >
                      {v}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-xs text-[var(--muted)]">
                    Entry price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                    className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3.5 text-sm outline-none focus:border-[var(--accent-border)]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs text-[var(--muted)]">
                    Stop loss
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={stop}
                    onChange={(e) => setStop(e.target.value)}
                    className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3.5 text-sm outline-none focus:border-[var(--accent-border)]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs text-[var(--muted)]">
                  $ per point (0.01 lot)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={pipValue}
                  onChange={(e) => setPipValue(e.target.value)}
                  className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3.5 text-sm outline-none focus:border-[var(--accent-border)]"
                />
                <p className="mt-1.5 text-[10px] text-[var(--muted)]">
                  Simplified for demo. Adjust based on your broker contract size.
                </p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[var(--accent)]" />
                <p className="text-sm font-semibold">Risk summary</p>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  ["Risk amount", `$${calc.riskAmount}`],
                  ["Stop distance", `${calc.stopDistance} pts`],
                  ["Suggested size", `${calc.positionSize} lots`],
                  ["Max loss", `$${calc.maxLoss}`],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3"
                  >
                    <span className="text-xs text-[var(--muted)]">{label}</span>
                    <span className="text-sm font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="flex items-center gap-2">
                <Target size={16} className="text-[var(--accent)]" />
                <p className="text-sm font-semibold">Risk guidelines</p>
              </div>
              <ul className="mt-4 space-y-2.5 text-xs leading-5 text-[var(--muted-strong)]">
                <li className="flex gap-2">
                  <span className="text-[var(--accent)]">•</span>
                  Keep risk per trade between 0.5% – 2% of account equity.
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--accent)]">•</span>
                  Never risk more than you can afford to lose on a single idea.
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--accent)]">•</span>
                  Place stops based on structure, not arbitrary pip counts.
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--accent)]">•</span>
                  Reduce size when volatility expands or confidence is lower.
                </li>
              </ul>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-[var(--warning)]/30 bg-[var(--warning)]/5 p-4">
              <AlertTriangle
                size={16}
                className="mt-0.5 shrink-0 text-[var(--warning)]"
              />
              <p className="text-[11px] leading-4 text-[var(--muted-strong)]">
                This calculator is for educational / planning purposes only. It
                does not account for spreads, swaps, slippage or broker-specific
                contract sizes. Always verify with your broker.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
