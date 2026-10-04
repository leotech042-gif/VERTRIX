"use client";

import { useState } from "react";
import { API_URL } from "@/lib/utils";

export default function RiskPage() {
  const [balance, setBalance] = useState("10000");
  const [risk, setRisk] = useState("0.2");
  const [entry, setEntry] = useState("2650");
  const [stop, setStop] = useState("2643");
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState("");

  async function calculate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const r = await fetch(`${API_URL}/api/v1/risk/position-size`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          balance: parseFloat(balance),
          risk_percent: parseFloat(risk),
          entry: parseFloat(entry),
          stop: parseFloat(stop),
          point_value: 1,
        }),
      });
      if (!r.ok) throw new Error(`API ${r.status}`);
      setResult(await r.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    }
  }

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-semibold">Risk Engine</h1>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Python-calculated position size. Default risk 0.2% of equity.
      </p>

      <form onSubmit={calculate} className="mt-8 max-w-md space-y-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
        {["Balance", "Risk %", "Entry", "Stop"].map((label, i) => {
          const vals = [balance, risk, entry, stop];
          const setters = [setBalance, setRisk, setEntry, setStop];
          return (
            <div key={label}>
              <label className="mb-1 block text-xs text-[var(--muted)]">{label}</label>
              <input
                value={vals[i]}
                onChange={(e) => setters[i](e.target.value)}
                className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 text-sm outline-none focus:border-[var(--accent-border)]"
              />
            </div>
          );
        })}
        <button
          type="submit"
          className="h-10 w-full rounded-xl bg-[var(--accent)] text-sm font-semibold text-[#060708]"
        >
          Calculate
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-[var(--danger)]">{error}</p>}
      {result && (
        <pre className="mt-4 max-w-md overflow-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-xs">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
