export default function AnalysisPage() {
  return (
    <Section
      title="AI Analysis"
      body="Python multi-timeframe structure engine (Phase 3). Request analysis for any supported symbol once the analysis service is wired."
    />
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="mt-3 max-w-2xl text-sm text-[var(--muted)]">{body}</p>
    </div>
  );
}
