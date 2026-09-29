# Veytrix project notes

Next.js App Router project. Prefer existing design tokens in `app/globals.css` (`--accent`, `--surface`, etc.).

- Charts: `lightweight-charts` v5 → use `chart.addSeries(CandlestickSeries, options)`
- Theme: `next-themes` with `attribute="data-theme"`
- Live data: `/api/market/*` routes in `app/api/market`
