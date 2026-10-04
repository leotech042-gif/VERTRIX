export default function TerminalPage() {
  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-semibold">Trading Terminal</h1>
      <p className="mt-3 max-w-2xl text-sm text-[var(--muted)]">
        Custom canvas chart engine (candles, drawings, indicators, structure
        overlays) lands in Phase 2. Independent user analysis is mandatory — AI
        is optional.
      </p>
      <div className="mt-6 flex h-80 items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--muted)]">
        Chart canvas placeholder — engine under construction
      </div>
    </div>
  );
}
