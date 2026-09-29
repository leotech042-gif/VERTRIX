# Veytrix

AI-powered trading intelligence platform built with **Next.js 16**, live market data, charts, signals, terminal and risk tools.

## Features

- Live market prices (Binance for crypto, Yahoo for forex/metals/indices)
- Candlestick charts (`lightweight-charts` v5)
- Markets explorer + watchlist (saved in browser)
- AI Signals board
- Trading Terminal (demo order ticket)
- Risk Engine (position size calculator)
- Dark / light theme
- Landing page with live ticker and real charts

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo login

Any email + password on `/login` or `/signup` opens the dashboard (no real auth yet).

## Project structure

```
app/
  page.tsx                 # Landing
  login/ signup/           # Auth (demo)
  dashboard/               # App workspace
    markets/
    signals/
    terminal/
    risk-engine/
  api/market/              # Live data API routes
components/
  charts/                  # PriceChart
  landing/                 # FAQ, ticker, showcase
  theme/                   # Dark mode
  ui/                      # Button, Card, Input, Badge
  dashboard/               # Shared dashboard pieces
hooks/                     # useLiveTickers, useWatchlist
lib/                       # market-data, utils
```

## Scripts

| Command        | Description        |
|----------------|--------------------|
| `npm run dev`  | Development server |
| `npm run build`| Production build   |
| `npm run start`| Start production   |
| `npm run lint` | ESLint             |

## Notes

- Market data is public and may rate-limit; the app falls back gracefully.
- Not financial advice. Trading involves risk.
