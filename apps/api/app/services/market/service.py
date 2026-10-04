from __future__ import annotations

from typing import Any

from app.services.market.providers import (
    SYMBOL_MAP,
    fetch_binance_klines,
    fetch_binance_ticker,
    fetch_yahoo_klines,
    fetch_yahoo_ticker,
    normalize_symbol,
)


class MarketDataService:
    def list_symbols(self) -> list[dict[str, str]]:
        out = []
        for sym, meta in SYMBOL_MAP.items():
            out.append(
                {
                    "symbol": sym,
                    "provider": meta["provider"],
                    "display": self._display(sym),
                }
            )
        return out

    def _display(self, sym: str) -> str:
        if sym.endswith("USD") and len(sym) == 6 and sym[:3] in ("EUR", "GBP", "AUD", "USD"):
            return f"{sym[:3]}/{sym[3:]}"
        if sym in ("XAUUSD", "XAGUSD"):
            return f"{sym[:3]}/{sym[3:]}"
        if sym in ("BTCUSD", "ETHUSD"):
            return f"{sym[:3]}/{sym[3:]}"
        return sym

    async def get_klines(self, symbol: str, timeframe: str, limit: int) -> dict[str, Any]:
        key = normalize_symbol(symbol)
        meta = SYMBOL_MAP.get(key)
        if not meta:
            raise ValueError(f"Unsupported symbol: {symbol}")

        if meta["provider"] == "binance":
            candles = await fetch_binance_klines(meta["id"], timeframe, limit)
            source = "binance"
        else:
            candles = await fetch_yahoo_klines(meta["id"], timeframe, limit)
            source = "yahoo"

        return {
            "symbol": key,
            "timeframe": timeframe,
            "source": source,
            "delayed": source == "yahoo",
            "candles": candles,
            "count": len(candles),
        }

    async def get_ticker(self, symbol: str) -> dict[str, Any]:
        key = normalize_symbol(symbol)
        meta = SYMBOL_MAP.get(key)
        if not meta:
            raise ValueError(f"Unsupported symbol: {symbol}")

        if meta["provider"] == "binance":
            t = await fetch_binance_ticker(meta["id"])
        else:
            t = await fetch_yahoo_ticker(meta["id"])

        return {"symbol": key, **t, "delayed": meta["provider"] == "yahoo"}
