"""Provider adapters — normalize external feeds to internal candles."""

from __future__ import annotations

from typing import Any

import httpx

# Internal symbol → provider mapping
SYMBOL_MAP: dict[str, dict[str, str]] = {
    "BTCUSD": {"provider": "binance", "id": "BTCUSDT"},
    "ETHUSD": {"provider": "binance", "id": "ETHUSDT"},
    "EURUSD": {"provider": "yahoo", "id": "EURUSD=X"},
    "GBPUSD": {"provider": "yahoo", "id": "GBPUSD=X"},
    "USDJPY": {"provider": "yahoo", "id": "JPY=X"},
    "XAUUSD": {"provider": "yahoo", "id": "GC=F"},
    "XAGUSD": {"provider": "yahoo", "id": "SI=F"},
    "US100": {"provider": "yahoo", "id": "NQ=F"},
    "US500": {"provider": "yahoo", "id": "ES=F"},
    "USOIL": {"provider": "yahoo", "id": "CL=F"},
}

BINANCE_INTERVAL = {
    "1m": "1m",
    "5m": "5m",
    "15m": "15m",
    "30m": "30m",
    "1h": "1h",
    "4h": "4h",
    "1d": "1d",
}

YAHOO_INTERVAL = {
    "1m": "1m",
    "5m": "5m",
    "15m": "15m",
    "30m": "30m",
    "1h": "60m",
    "4h": "60m",
    "1d": "1d",
}


def normalize_symbol(symbol: str) -> str:
    return symbol.replace("/", "").replace("-", "").upper()


async def fetch_binance_klines(symbol_id: str, interval: str, limit: int) -> list[dict[str, Any]]:
    iv = BINANCE_INTERVAL.get(interval, "15m")
    url = "https://api.binance.com/api/v3/klines"
    params = {"symbol": symbol_id, "interval": iv, "limit": limit}
    async with httpx.AsyncClient(timeout=20.0) as client:
        r = await client.get(url, params=params)
        r.raise_for_status()
        data = r.json()
    candles = []
    for k in data:
        candles.append(
            {
                "time": int(k[0]) // 1000,
                "open": float(k[1]),
                "high": float(k[2]),
                "low": float(k[3]),
                "close": float(k[4]),
                "volume": float(k[5]),
            }
        )
    return candles


async def fetch_yahoo_klines(symbol_id: str, interval: str, limit: int) -> list[dict[str, Any]]:
    iv = YAHOO_INTERVAL.get(interval, "15m")
    # range heuristic
    range_map = {"1m": "1d", "5m": "5d", "15m": "5d", "30m": "1mo", "1h": "1mo", "4h": "3mo", "1d": "1y"}
    rng = range_map.get(interval, "5d")
    url = f"https://query1.finance.yahoo.com/v8/finance/chart/{symbol_id}"
    params = {"interval": iv, "range": rng}
    headers = {"User-Agent": "Mozilla/5.0"}
    async with httpx.AsyncClient(timeout=20.0, headers=headers) as client:
        r = await client.get(url, params=params)
        r.raise_for_status()
        json_data = r.json()
    result = json_data.get("chart", {}).get("result", [None])[0]
    if not result:
        raise RuntimeError("No Yahoo chart result")
    timestamps = result.get("timestamp") or []
    quote = (result.get("indicators") or {}).get("quote", [None])[0] or {}
    candles = []
    for i, ts in enumerate(timestamps):
        o, h, l, c = (
            quote.get("open", [None])[i],
            quote.get("high", [None])[i],
            quote.get("low", [None])[i],
            quote.get("close", [None])[i],
        )
        if o is None or h is None or l is None or c is None:
            continue
        vol = (quote.get("volume") or [0])[i] or 0
        candles.append(
            {
                "time": int(ts),
                "open": float(o),
                "high": float(h),
                "low": float(l),
                "close": float(c),
                "volume": float(vol),
            }
        )
    return candles[-limit:]


async def fetch_binance_ticker(symbol_id: str) -> dict[str, Any]:
    url = "https://api.binance.com/api/v3/ticker/24hr"
    async with httpx.AsyncClient(timeout=15.0) as client:
        r = await client.get(url, params={"symbol": symbol_id})
        r.raise_for_status()
        d = r.json()
    return {
        "price": float(d["lastPrice"]),
        "change_percent": float(d["priceChangePercent"]),
        "high_24h": float(d["highPrice"]),
        "low_24h": float(d["lowPrice"]),
        "source": "binance",
    }


async def fetch_yahoo_ticker(symbol_id: str) -> dict[str, Any]:
    url = f"https://query1.finance.yahoo.com/v8/finance/chart/{symbol_id}"
    params = {"interval": "1d", "range": "2d"}
    headers = {"User-Agent": "Mozilla/5.0"}
    async with httpx.AsyncClient(timeout=15.0, headers=headers) as client:
        r = await client.get(url, params=params, headers=headers)
        r.raise_for_status()
        json_data = r.json()
    meta = json_data["chart"]["result"][0]["meta"]
    price = float(meta["regularMarketPrice"])
    prev = float(meta.get("chartPreviousClose") or meta.get("previousClose") or price)
    ch = ((price - prev) / prev) * 100 if prev else 0.0
    return {
        "price": price,
        "change_percent": round(ch, 2),
        "high_24h": meta.get("regularMarketDayHigh"),
        "low_24h": meta.get("regularMarketDayLow"),
        "source": "yahoo",
    }
