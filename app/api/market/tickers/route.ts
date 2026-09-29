import { NextResponse } from "next/server";
import {
  fetchBinanceTicker,
  fetchYahooTicker,
  getProviderSymbol,
  SYMBOL_MAP,
} from "@/lib/market-data";

export async function GET() {
  const symbols = Object.keys(SYMBOL_MAP);

  const results = await Promise.allSettled(
    symbols.map(async (uiSymbol) => {
      const mapped = getProviderSymbol(uiSymbol);
      if (!mapped) return null;

      try {
        if (mapped.provider === "binance") {
          const t = await fetchBinanceTicker(mapped.id);
          return { uiSymbol, source: "binance" as const, ...t };
        }
        const t = await fetchYahooTicker(mapped.id);
        return { uiSymbol, source: "yahoo" as const, ...t };
      } catch {
        return {
          uiSymbol,
          source: "error" as const,
          price: null,
          changePercent: null,
        };
      }
    }),
  );

  const tickers = results
    .map((r) => (r.status === "fulfilled" ? r.value : null))
    .filter(Boolean);

  return NextResponse.json({ tickers, updatedAt: Date.now() });
}
