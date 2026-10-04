# Veytrix Architecture

## System overview

```
apps/web  (Next.js)  ──REST/WS──►  apps/api (FastAPI)
     │                                  │
     │                                  ├── market/     (OHLCV, providers)
     │                                  ├── analysis/   (structure, SMC, PA)
     │                                  ├── risk/       (sizing, limits)
     │                                  ├── signals/    (lifecycle)
     │                                  ├── trading/    (paper + broker adapters)
     │                                  ├── backtest/
     │                                  └── auth/
     │
     └── chart engine (canvas) renders candles + drawings from API data
```

## Principles

1. **Python owns quantitative truth** — indicators, structure, risk, backtest.
2. **Frontend owns interaction** — chart canvas, drawings, layouts, UX.
3. **Provider adapters** normalize Binance / Yahoo / future brokers into one OHLCV schema.
4. **Paper before live** — execution interface is abstract; live requires explicit credentials + opt-in.
5. **No silent fakes** — delayed, offline, or synthetic feeds are labeled.

## Data contracts (internal)

### Candle
```json
{
  "symbol": "XAUUSD",
  "timeframe": "15m",
  "time": 1710000000,
  "open": 2650.1,
  "high": 2652.0,
  "low": 2648.5,
  "close": 2651.2,
  "volume": 1234.5
}
```

### Analysis result (summary)
Includes instrument, timestamp, HTF bias, structure, zones, scenarios, invalidation, limitations.

## Navigation (web)

Overview · Markets · AI Analysis · AI Signals · Terminal · Positions · History · Backtesting · Strategy Builder · Journal · Risk · Portfolio · Notifications · Subscription · Settings

## Environment

See `apps/api/.env.example` and `apps/web/.env.example`.
