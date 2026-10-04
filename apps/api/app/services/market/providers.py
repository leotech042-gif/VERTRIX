"""Provider adapters — normalize external feeds to internal candles + book."""

from __future__ import annotations

from typing import Any

import httpx

SYMBOL_MAP: dict[str, dict[str, str]] = {
    "BTCUSD": {"provider": "binance", "id": "BTCUSDT"},
    "ETHUSD": {"provider": "binance", "id": "ETHUSDT"},
    "SOLUSD": {"provider": "binance", "id": "SOLUSDT"},
    "EURUSD": {"provider": "yahoo", "id": "EURUSD=X"},
    "GBPUSD": {"provider": "yahoo", "id": "GBPUSD=X"},
    "USDJPY": {"provider": "yahoo", "id": "JPY=X"},
    "XAUUSD": {"provider": "yahoo", "id": "GC=F"},
    "XAGUSD": {"provider": "yahoo", "id": "SI=F"},
    "US100": {"provider": "yahoo", "id": "NQ=F"},
    "US500": {"provider": "yahoo", "id": "ES=F"},
    "USOIL": {"provider": "yahoo", "id": "CL=F"},
}

# Typical tight retail-style spreads (points) when book is unavailable — labeled synthetic_spread
TIGHT_SPREAD_POINTS: dict[str, float] = {
    "EURUSD": 0.00008,
    "GBPUSD": 0.00010,
    "USDJPY": 0.008,
    "XAUUSD": 0.12,
    "XAGUSD": 0.015,
    "US100": 0.75,
    "US500": 0.25,
    "USOIL": 0.03,
}

BINANCE_INTERVAL = {
    "1m": "1m",
    "3m": "3m",
    "5m": "5m",
    "15m": "15m",
    "30m": "30m",
    "1h": "1h",
    "2h": "2h",
    "4h": "4h",
    "1d": "1d",
    "1w": "1w",
}

YAHOO_INTERVAL = {
    "1m": "1m",
    "3m": "5m",
    "5m": "5m",
    "15m": "15m",
    "30m": "30m",
    "1h": "60m",
    "2h": "60m",
    "4h": "60m",
    "1d": "1d",
    "1w": "1wk",
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
    range_map = {
        "1m": "1d",
        "3m": "5d",
        "5m": "5d",
        "15m": "5d",
        "30m": "1mo",
        "1h": "1mo",
        "2h": "3mo",
        "4h": "3mo",
        "1d": "1y",
        "1w": "5y",
    }
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
        o = quote.get("open", [None])[i]
        h = quote.get("high", [None])[i]
        l = quote.get("low", [None])[i]
        c = quote.get("close", [None])[i]
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


async def fetch_binance_book(symbol_id: str) -> dict[str, Any]:
    """Real bid/ask from Binance book ticker — tight exchange spread."""
    url = "https://api.binance.com/api/v3/ticker/bookTicker"
    async with httpx.AsyncClient(timeout=15.0) as client:
        r = await client.get(url, params={"symbol": symbol_id})
        r.raise_for_status()
        d = r.json()
    bid = float(d["bidPrice"])
    ask = float(d["askPrice"])
    mid = (bid + ask) / 2.0
    spread = ask - bid
    spread_pts = spread
    spread_bps = (spread / mid) * 10000 if mid else 0.0
    return {
        "bid": bid,
        "ask": ask,
        "mid": mid,
        "spread": spread,
        "spread_points": spread_pts,
        "spread_bps": round(spread_bps, 4),
        "spread_source": "book",
        "bid_qty": float(d.get("bidQty") or 0),
        "ask_qty": float(d.get("askQty") or 0),
    }


async def fetch_binance_ticker(symbol_id: str) -> dict[str, Any]:
    url = "https://api.binance.com/api/v3/ticker/24hr"
    async with httpx.AsyncClient(timeout=15.0) as client:
        r = await client.get(url, params={"symbol": symbol_id})
        r.raise_for_status()
        d = r.json()
    book = await fetch_binance_book(symbol_id)
    return {
        "price": float(d["lastPrice"]),
        "change_percent": float(d["priceChangePercent"]),
        "high_24h": float(d["highPrice"]),
        "low_24h": float(d["lowPrice"]),
        "source": "binance",
        **book,
    }


async def fetch_yahoo_ticker(symbol_id: str, internal: str) -> dict[str, Any]:
    url = f"https://query1.finance.yahoo.com/v8/finance/chart/{symbol_id}"
    params = {"interval": "1d", "range": "2d"}
    headers = {"User-Agent": "Mozilla/5.0"}
    async with httpx.AsyncClient(timeout=15.0, headers=headers) as client:
        r = await client.get(url, params=params)
        r.raise_for_status()
        json_data = r.json()
    meta = json_data["chart"]["result"][0]["meta"]
    price = float(meta["regularMarketPrice"])
    prev = float(meta.get("chartPreviousClose") or meta.get("previousClose") or price)
    ch = ((price - prev) / prev) * 100 if prev else 0.0

    # Yahoo often lacks a live book — apply a tight synthetic half-spread around mid
    half = TIGHT_SPREAD_POINTS.get(internal, price * 0.00005) / 2.0
    bid = price - half
    ask = price + half
    spread = ask - bid
    spread_bps = (spread / price) * 10000 if price else 0.0

    return {
        "price": price,
        "change_percent": round(ch, 2),
        "high_24h": meta.get("regularMarketDayHigh"),
        "low_24h": meta.get("regularMarketDayLow"),
        "source": "yahoo",
        "bid": round(bid, 6),
        "ask": round(ask, 6),
        "mid": price,
        "spread": round(spread, 6),
        "spread_points": round(spread, 6),
        "spread_bps": round(spread_bps, 4),
        "spread_source": "synthetic_tight",
        "bid_qty": None,
        "ask_qty": None,
    }
