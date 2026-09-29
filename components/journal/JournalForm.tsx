"use client";

import { Plus } from "lucide-react";

export function JournalForm({
  symbol,
  setSymbol,
  side,
  setSide,
  result,
  setResult,
  notes,
  setNotes,
  onSubmit,
}: {
  symbol: string;
  setSymbol: (v: string) => void;
  side: string;
  setSide: (v: string) => void;
  result: string;
  setResult: (v: string) => void;
  notes: string;
  setNotes: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
    >
      <p className="text-sm font-semibold">New journal entry</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Symbol"
          className="h-10 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--accent-border)]"
        />
        <select
          value={side}
          onChange={(e) => setSide(e.target.value)}
          className="h-10 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm"
        >
          <option value="Long">Long</option>
          <option value="Short">Short</option>
        </select>
        <select
          value={result}
          onChange={(e) => setResult(e.target.value)}
          className="h-10 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm"
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
        placeholder="Notes…"
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
  );
}
