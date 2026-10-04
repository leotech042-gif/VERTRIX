"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/utils";

type SymbolRow = { symbol: string; provider: string; display: string };

export default function MarketsPage() {
  const [symbols, setSymbols] = useState<SymbolRow[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const r = await fetch(`${API_URL}/api/v1/market/symbols`);
        if (!r.ok) throw new Error(`API ${r.status}`);
        const j = await r.json();
        setSymbols(j.symbols || []);
      } catch (e) {
        setError(
          e instanceof Error
            ? e.message
            : "Cannot reach API. Start apps/api on port 8000.",
        );
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-semibold">Markets</h1>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Provider-backed symbol directory from the Python API.
      </p>

      {loading && <p className="mt-8 text-sm text-[var(--muted)]">Loading…</p>}
      {error && (
        <p className="mt-8 rounded-xl border border-[var(--warning)]/40 bg-[var(--warning)]/10 px-4 py-3 text-sm text-[var(--warning)]">
          {error}
        </p>
      )}

      <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--border)]">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[var(--border)] bg-[var(--surface)] text-[10px] uppercase tracking-wider text-[var(--muted)]">
            <tr>
              <th className="px-4 py-3 font-medium">Symbol</th>
              <th className="px-4 py-3 font-medium">Display</th>
              <th className="px-4 py-3 font-medium">Provider</th>
            </tr>
          </thead>
          <tbody>
            {symbols.map((s) => (
              <tr key={s.symbol} className="border-b border-[var(--border)] bg-[var(--surface)]">
                <td className="px-4 py-3 font-medium">{s.symbol}</td>
                <td className="px-4 py-3 text-[var(--muted-2)]">{s.display}</td>
                <td className="px-4 py-3 text-[var(--muted)]">{s.provider}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
