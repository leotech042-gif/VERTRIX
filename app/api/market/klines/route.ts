import { NextRequest, NextResponse } from "next/server";
import {
  fetchBinanceKlines,
  fetchYahooKlines,
  generateFallbackCandles,
  getProviderSymbol,
} from "@/lib/market-data";

export async function GET(req: NextRequest) {
  const symbol = req.nextUrl.searchParams.get("symbol") ?? "XAU/USD";
  const interval = req.nextUrl.searchParams.get("interval") ?? "15m";

  const mapped = getProviderSymbol(symbol);

  try {
    if (!mapped) {
      return NextResponse.json({
        source: "fallback",
        candles: generateFallbackCandles(100),
      });
    }

    if (mapped.provider === "binance") {
      const candles = await fetchBinanceKlines(mapped.id, interval);
      return NextResponse.json({ source: "binance", candles });
    }

    const candles = await fetchYahooKlines(mapped.id, interval);
    return NextResponse.json({ source: "yahoo", candles });
  } catch (error) {
    console.error("Klines fetch failed:", error);

    const base =
      symbol.includes("BTC") ? 95000 :
      symbol.includes("ETH") ? 3500 :
      symbol.includes("XAU") ? 2650 :
      symbol.includes("XAG") ? 30 :
      1.1;

    return NextResponse.json({
      source: "fallback",
      candles: generateFallbackCandles(base),
      error: "Live feed temporarily unavailable",
    });
  }
}
