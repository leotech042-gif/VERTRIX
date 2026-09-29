import { NextRequest, NextResponse } from "next/server";
import {
  fetchBinanceTicker,
  fetchYahooTicker,
  getProviderSymbol,
} from "@/lib/market-data";

export async function GET(req: NextRequest) {
  const symbol = req.nextUrl.searchParams.get("symbol") ?? "XAU/USD";
  const mapped = getProviderSymbol(symbol);

  try {
    if (!mapped) {
      return NextResponse.json(
        { error: "Unsupported symbol" },
        { status: 400 },
      );
    }

    if (mapped.provider === "binance") {
      const ticker = await fetchBinanceTicker(mapped.id);
      return NextResponse.json({ source: "binance", ...ticker, uiSymbol: symbol });
    }

    const ticker = await fetchYahooTicker(mapped.id);
    return NextResponse.json({ source: "yahoo", ...ticker, uiSymbol: symbol });
  } catch (error) {
    console.error("Ticker fetch failed:", error);
    return NextResponse.json(
      {
        error: "Live price unavailable",
        uiSymbol: symbol,
        price: null,
        changePercent: null,
      },
      { status: 502 },
    );
  }
}
