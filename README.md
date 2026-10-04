# VEYTRIX

Autonomous AI-assisted trading platform.

**Stack**
- `apps/web` — Next.js 15, React, TypeScript, Tailwind (UI + custom charting)
- `apps/api` — Python FastAPI (market data, analysis, risk, backtest, execution adapters)
- PostgreSQL / Supabase (planned)
- Redis (planned for cache / jobs)

## Quick start

### Frontend
```bash
cd apps/web
npm install
npm run dev
```
Open http://localhost:3000

### Backend
```bash
cd apps/api
python -m venv .venv
# Windows: .venv\Scripts\activate
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
API docs: http://localhost:8000/docs

## Architecture

See `docs/ARCHITECTURE.md`.

## Honest product rules

- No fabricated live prices or trade results.
- No guaranteed win-rate claims.
- Paper trading first; live broker execution only via explicit adapters + user opt-in.
- Simulated/demo data is always labeled.

## Implementation phases

1. Foundation (this commit)
2. Market data + custom chart engine
3. Python analysis engine (SMC / price action)
4. Signals + monitoring
5. Paper trading + backtest + journal
6. Subscriptions, admin, hardening
