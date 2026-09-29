"use client";

import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Briefcase,
  Plus,
  Trash2,
} from "lucide-react";

type Position = {
  id: string;
  symbol: string;
  side: "Long" | "Short";
  size: string;
  entry: string;
  stop: string;
  target: string;
  status: "Open" | "Closed";
  createdAt: string;
};

const KEY = "veytrix-positions";

export default function PositionsPage() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [ready, setReady] = useState(false);
  const [symbol, setSymbol] = useState("XAU/USD");
  const [side, setSide] = useState<"Long" | "Short">("Long");
  const [size, setSize] = useState("0.10");
  const [entry, setEntry] = useState("");
  const [stop, setStop] = useState("");
  const [target, setTarget] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setPositions(JSON.parse(raw));
    } catch {
      // ignore
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify(positions));
  }, [positions, ready]);

  function addPosition(e: React.FormEvent) {
    e.preventDefault();
    if (!symbol.trim() || !entry.trim()) return;

    const pos: Position = {
      id: crypto.randomUUID(),
      symbol: symbol.trim().toUpperCase(),
      side,
      size: size || "0.10",
      entry,
      stop,
      target,
      status: "Open",
      createdAt: new Date().toISOString(),
    };

    setPositions((p) => [pos, ...p]);
    setEntry("");
    setStop("");
    setTarget("");
  }

  function closePosition(id: string) {
    setPositions((p) =>
      p.map((x) => (x.id === id ? { ...x, status: "Closed" } : x)),
    );
  }

  function removePosition(id: string) {
    setPositions((p) => p.filter((x) => x.id !== id));
  }

  const open = positions.filter((p) => p.status === "Open");
  const closed = positions.filter((p) => p.status === "Closed");

  return (
    <main className="min-h-screen px-4 py-7 sm:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <header>
          <p className="text-xs text-[var(--muted)]">Workspace / Positions</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            Positions
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Track open and closed trades. Saved in this browser.
          </p>
        </header>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
            <p className="text-xs text-[var(--muted)]">Open</p>
            <p className="mt-2 text-2xl font-semibold">{open.length}</p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
            <p className="text-xs text-[var(--muted)]">Closed</p>
            <p className="mt-2 text-2xl font-semibold">{closed.length}</p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
            <p className="text-xs text-[var(--muted)]">Total</p>
            <p className="mt-2 text-2xl font-semibold">{positions.length}</p>
          </div>
        </div>

        <form
          onSubmit={addPosition}
          className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
        >
          <div className="flex items-center gap-2">
            <Briefcase size={16} className="text-[var(--accent)]" />
            <p className="text-sm font-semibold">Add position</p>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
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
            <input
              value={size}
              onChange={(e) => setSize(e.target.value)}
              placeholder="Size (lots)"
              className="h-10 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--accent-border)]"
            />
            <input
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              placeholder="Entry"
              className="h-10 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--accent-border)]"
            />
            <input
              value={stop}
              onChange={(e) => setStop(e.target.value)}
              placeholder="Stop loss"
              className="h-10 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--accent-border)]"
            />
            <input
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="Take profit"
              className="h-10 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--accent-border)]"
            />
          </div>

          <button
            type="submit"
            className="mt-4 inline-flex h-10 items-center gap-2 rounded-xl bg-[var(--accent)] px-4 text-sm font-semibold text-[#050607]"
          >
            <Plus size={15} />
            Add position
          </button>
        </form>

        <div className="space-y-3">
          {positions.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-semibold">{p.symbol}</span>
                    <span
                      className={`inline-flex items-center gap-0.5 rounded-md px-2 py-0.5 text-[10px] font-medium ${
                        p.side === "Long"
                          ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                          : "bg-[var(--danger)]/10 text-[var(--danger)]"
                      }`}
                    >
                      {p.side === "Long" ? (
                        <ArrowUpRight size={11} />
                      ) : (
                        <ArrowDownRight size={11} />
                      )}
                      {p.side}
                    </span>
                    <span className="rounded-md border border-[var(--border)] px-2 py-0.5 text-[10px] text-[var(--muted)]">
                      {p.status}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-4 text-xs text-[var(--muted)]">
                    <span>Size {p.size}</span>
                    <span>Entry {p.entry || "—"}</span>
                    <span>SL {p.stop || "—"}</span>
                    <span>TP {p.target || "—"}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {p.status === "Open" && (
                    <button
                      type="button"
                      onClick={() => closePosition(p.id)}
                      className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs hover:border-[var(--accent-border)]"
                    >
                      Close
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => removePosition(p.id)}
                    className="rounded-lg border border-[var(--border)] p-2 text-[var(--muted)] hover:text-[var(--danger)]"
                    aria-label="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {positions.length === 0 && (
            <div className="rounded-2xl border border-dashed border-[var(--border)] py-14 text-center text-sm text-[var(--muted)]">
              No positions yet. Add one above.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
