export type Candle = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

export type Ticker = {
  symbol: string;
  price: number;
  changePercent: number;
  high24h?: number;
  low24h?: number;
};

/** Map our UI symbols to data provider symbols */
export const SYMBOL_MAP: Record<
  string,
  { provider: "binance" | "yahoo"; id: string }
> = {
  "BTC/USD": { provider: "binance", id: "BTCUSDT" },
  "ETH/USD": { provider: "binance", id: "ETHUSDT" },
  "EUR/USD": { provider: "yahoo", id: "EURUSD=X" },
  "GBP/USD": { provider: "yahoo", id: "GBPUSD=X" },
  "USD/JPY": { provider: "yahoo", id: "JPY=X" },
  "USD/CHF": { provider: "yahoo", id: "CHF=X" },
  "AUD/USD": { provider: "yahoo", id: "AUDUSD=X" },
  "XAU/USD": { provider: "yahoo", id: "GC=F" },
  "XAG/USD": { provider: "yahoo", id: "SI=F" },
  US100: { provider: "yahoo", id: "NQ=F" },
  US500: { provider: "yahoo", id: "ES=F" },
  USOIL: { provider: "yahoo", id: "CL=F" },
};

export function getProviderSymbol(symbol: string) {
  return SYMBOL_MAP[symbol] ?? null;
}

/** Interval mapping for Yahoo */
const YAHOO_INTERVAL: Record<string, string> = {
  "1m": "1m",
  "5m": "5m",
  "15m": "15m",
  "1h": "60m",
  "4h": "60m",
  "1d": "1d",
};

/** Interval mapping for Binance */
const BINANCE_INTERVAL: Record<string, string> = {
  "1m": "1m",
  "5m": "5m",
  "15m": "15m",
  "1h": "1h",
  "4h": "4h",
  "1d": "1d",
};

export async function fetchBinanceKlines(
  symbol: string,
  interval = "15m",
  limit = 150,
): Promise<Candle[]> {
  const iv = BINANCE_INTERVAL[interval] ?? "15m";
  const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${iv}&limit=${limit}`;

  const res = await fetch(url, { next: { revalidate: 30 } });
  if (!res.ok) throw new Error(`Binance error ${res.status}`);

  const data = await res.json();

  return data.map((k: (string | number)[]) => ({
    time: Math.floor(Number(k[0]) / 1000),
    open: parseFloat(String(k[1])),
    high: parseFloat(String(k[2])),
    low: parseFloat(String(k[3])),
    close: parseFloat(String(k[4])),
  }));
}

export async function fetchYahooKlines(
  symbol: string,
  interval = "15m",
  range = "5d",
): Promise<Candle[]> {
  const iv = YAHOO_INTERVAL[interval] ?? "15m";
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
    symbol,
  )}?interval=${iv}&range=${range}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
    next: { revalidate: 30 },
  });

  if (!res.ok) throw new Error(`Yahoo error ${res.status}`);

  const json = await res.json();
  const result = json?.chart?.result?.[0];
  if (!result) throw new Error("No Yahoo data");

  const timestamps: number[] = result.timestamp ?? [];
  const quote = result.indicators?.quote?.[0];
  if (!quote) throw new Error("No quote data");

  const candles: Candle[] = [];

  for (let i = 0; i < timestamps.length; i++) {
    const open = quote.open?.[i];
    const high = quote.high?.[i];
    const low = quote.low?.[i];
    const close = quote.close?.[i];

    if (
      open == null ||
      high == null ||
      low == null ||
      close == null ||
      Number.isNaN(open)
    ) {
      continue;
    }

    candles.push({
      time: timestamps[i],
      open: +open.toFixed(5),
      high: +high.toFixed(5),
      low: +low.toFixed(5),
      close: +close.toFixed(5),
    });
  }

  return candles;
}

export async function fetchBinanceTicker(symbol: string): Promise<Ticker> {
  const url = `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`;
  const res = await fetch(url, { next: { revalidate: 10 } });
  if (!res.ok) throw new Error(`Binance ticker error ${res.status}`);

  const data = await res.json();

  return {
    symbol,
    price: parseFloat(data.lastPrice),
    changePercent: parseFloat(data.priceChangePercent),
    high24h: parseFloat(data.highPrice),
    low24h: parseFloat(data.lowPrice),
  };
}

export async function fetchYahooTicker(symbol: string): Promise<Ticker> {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
    symbol,
  )}?interval=1d&range=2d`;

  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
    next: { revalidate: 15 },
  });

  if (!res.ok) throw new Error(`Yahoo ticker error ${res.status}`);

  const json = await res.json();
  const result = json?.chart?.result?.[0];
  const meta = result?.meta;

  if (!meta?.regularMarketPrice) throw new Error("No price");

  const price = meta.regularMarketPrice;
  const prev = meta.chartPreviousClose ?? meta.previousClose ?? price;
  const changePercent = prev ? ((price - prev) / prev) * 100 : 0;

  return {
    symbol,
    price,
    changePercent: +changePercent.toFixed(2),
    high24h: meta.regularMarketDayHigh,
    low24h: meta.regularMarketDayLow,
  };
}

/** Generate fallback candles when live data fails */
export function generateFallbackCandles(
  basePrice = 100,
  count = 120,
): Candle[] {
  const candles: Candle[] = [];
  let price = basePrice;
  const now = Math.floor(Date.now() / 1000);
  const interval = 15 * 60;

  for (let i = count; i >= 0; i--) {
    const time = now - i * interval;
    const open = price;
    const change = (Math.random() - 0.48) * (basePrice * 0.002);
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * (basePrice * 0.001);
    const low = Math.min(open, close) - Math.random() * (basePrice * 0.001);

    candles.push({
      time,
      open: +open.toFixed(5),
      high: +high.toFixed(5),
      low: +low.toFixed(5),
      close: +close.toFixed(5),
    });

    price = close;
  }

  return candles;
}
