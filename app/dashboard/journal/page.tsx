"use client";

import { useEffect, useState } from "react";
import { BookOpen, Plus, Trash2 } from "lucide-react";

type JournalEntry = {
  id: string;
  symbol: string;
  side: "Long" | "Short";
  result: "Win" | "Loss" | "BE" | "Open";
  notes: string;
  date: string;
};

const STORAGE_KEY = "veytrix-journal";

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [symbol, setSymbol] = useState("XAU/USD");
  const [side, setSide] = useState<"Long" | "Short">("Long");
  const [result, setResult] = useState<JournalEntry["result"]>("Open");
  const [notes, setNotes] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setEntries(JSON.parse(raw));
    } catch {
      // ignore
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries, ready]);

  function addEntry(e: React.FormEvent) {
    e.preventDefault();
    if (!symbol.trim()) return;

    const entry: JournalEntry = {
      id: crypto.randomUUID(),
      symbol: symbol.trim().toUpperCase(),
      side,
      result,
      notes: notes.trim(),
      date: new Date().toISOString().slice(0, 10),
    };

    setEntries((prev) => [entry, ...prev]);
    setNotes("");
  }

  function removeEntry(id: string) {
    setEntries((prev) => prev.filter((x) => x.id !== id));
  }

  const wins = entries.filter((e) => e.result === "Win").length;
  const losses = entries.filter((e) => e.result === "Loss").length;

  return (
    <main className="min-h-screen px-4 py-7 sm:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <header>
          <p className="text-xs text-[var(--muted)]">Workspace / Journal</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            Trade journal
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Log setups and outcomes. Saved in this browser.
          </p>
        </header>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
            <p className="text-xs text-[var(--muted)]">Entries</p>
            <p className="mt-2 text-2xl font-semibold">{entries.length}</p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
            <p className="text-xs text-[var(--muted)]">Wins</p>
            <p className="mt-2 text-2xl font-semibold text-[var(--accent)]">
              {wins}
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
            <p className="text-xs text-[var(--muted)]">Losses</p>
            <p className="mt-2 text-2xl font-semibold text-[var(--danger)]">
              {losses}
            </p>
          </div>
        </div>

        <form
          onSubmit={addEntry}
          className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
        >
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-[var(--accent)]" />
            <p className="text-sm font-semibold">New entry</p>
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
              className="h-10 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none"
            >
              <option value="Long">Long</option>
              <option value="Short">Short</option>
            </select>
            <select
              value={result}
              onChange={(e) =>
                setResult(e.target.value as JournalEntry["result"])
              }
              className="h-10 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none"
            >
              <option value="Open">Open</option>
              <option value="Win">Win</option>
              <option value="Loss">Loss</option>
              <option value="BE">Break even</option>
            </select>
          </div>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes: setup, mistakes, what you did well…"
            rows={3}
            className="mt-3 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--accent-border)]"
          />

          <button
            type="submit"
            className="mt-3 inline-flex h-10 items-center gap-2 rounded-xl bg-[var(--accent)] px-4 text-sm font-semibold text-[#050607]"
          >
            <Plus size={15} />
            Add entry
          </button>
        </form>

        <div className="space-y-3">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold">{entry.symbol}</span>
                    <span className="rounded-md border border-[var(--border)] px-2 py-0.5 text-[10px]">
                      {entry.side}
                    </span>
                    <span
                      className={`rounded-md px-2 py-0.5 text-[10px] font-medium ${
                        entry.result === "Win"
                          ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                          : entry.result === "Loss"
                            ? "bg-[var(--danger)]/10 text-[var(--danger)]"
                            : "text-[var(--muted)]"
                      }`}
                    >
                      {entry.result}
                    </span>
                  </div>
                  <p className="mt-1 text-[10px] text-[var(--muted)]">
                    {entry.date}
                  </p>
                  {entry.notes && (
                    <p className="mt-2 text-sm text-[var(--muted-strong)]">
                      {entry.notes}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeEntry(entry.id)}
                  className="rounded-lg border border-[var(--border)] p-2 text-[var(--muted)] hover:text-[var(--danger)]"
                  aria-label="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}

          {entries.length === 0 && (
            <div className="rounded-2xl border border-dashed border-[var(--border)] py-14 text-center text-sm text-[var(--muted)]">
              No journal entries yet. Add your first trade above.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
