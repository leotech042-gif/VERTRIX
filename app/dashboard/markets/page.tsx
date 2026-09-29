"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Bookmark,
  ChartCandlestick,
  ChevronRight,
  Clock3,
  Search,
  Star,
  WifiOff,
} from "lucide-react";
import { PriceChart } from "@/components/charts/price-chart";

type Category = "Forex" | "Metals" | "Crypto" | "Indices" | "Energies";

type Instrument = {
  symbol: string;
  name: string;
  category: Category;
  description: string;
};

const instruments: Instrument[] = [
  {
    symbol: "EUR/USD",
    name: "Euro / US Dollar",
    category: "Forex",
    description: "Major currency pair",
  },
  {
    symbol: "GBP/USD",
    name: "British Pound / US Dollar",
    category: "Forex",
    description: "Major currency pair",
  },
  {
    symbol: "USD/JPY",
    name: "US Dollar / Japanese Yen",
    category: "Forex",
    description: "Major currency pair",
  },
  {
    symbol: "USD/CHF",
    name: "US Dollar / Swiss Franc",
    category: "Forex",
    description: "Major currency pair",
  },
  {
    symbol: "AUD/USD",
    name: "Australian Dollar / US Dollar",
    category: "Forex",
    description: "Major currency pair",
  },
  {
    symbol: "XAU/USD",
    name: "Gold / US Dollar",
    category: "Metals",
    description: "Precious metal",
  },
  {
    symbol: "XAG/USD",
    name: "Silver / US Dollar",
    category: "Metals",
    description: "Precious metal",
  },
  {
    symbol: "BTC/USD",
    name: "Bitcoin / US Dollar",
    category: "Crypto",
    description: "Cryptocurrency",
  },
  {
    symbol: "ETH/USD",
    name: "Ethereum / US Dollar",
    category: "Crypto",
    description: "Cryptocurrency",
  },
  {
    symbol: "US100",
    name: "US Tech 100",
    category: "Indices",
    description: "Equity index",
  },
  {
    symbol: "US500",
    name: "US 500",
    category: "Indices",
    description: "Equity index",
  },
  {
    symbol: "USOIL",
    name: "US Crude Oil",
    category: "Energies",
    description: "Energy instrument",
  },
];

const categories = [
  "All",
  "Forex",
  "Metals",
  "Crypto",
  "Indices",
  "Energies",
  "Watchlist",
] as const;

type Filter = (typeof categories)[number];

export default function MarketsPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [search, setSearch] = useState("");
  const [selectedSymbol, setSelectedSymbol] = useState("XAU/USD");
  const [watchlist, setWatchlist] = useState<string[]>([
    "XAU/USD",
    "EUR/USD",
    "BTC/USD",
  ]);

  const selectedInstrument =
    instruments.find((item) => item.symbol === selectedSymbol) ??
    instruments[0];

  const visibleInstruments = useMemo(() => {
    const query = search.trim().toLowerCase();

    return instruments.filter((instrument) => {
      const matchesSearch =
        !query ||
        instrument.symbol.toLowerCase().includes(query) ||
        instrument.name.toLowerCase().includes(query) ||
        instrument.category.toLowerCase().includes(query);

      const matchesFilter =
        filter === "All" ||
        (filter === "Watchlist" && watchlist.includes(instrument.symbol)) ||
        instrument.category === filter;

      return matchesSearch && matchesFilter;
    });
  }, [filter, search, watchlist]);

  function toggleWatchlist(symbol: string) {
    setWatchlist((current) =>
      current.includes(symbol)
        ? current.filter((item) => item !== symbol)
        : [...current, symbol],
    );
  }

  return (
    <main className="min-h-screen px-4 py-7 text-[var(--foreground)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px] space-y-7">
        <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs text-[var(--muted)]">
              <span>Workspace</span>
              <ChevronRight size={13} />
              <span className="text-[var(--foreground)]">Markets</span>
            </div>

            <h1 className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
              Markets
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--muted)]">
              Explore instruments, organize your watchlist and open a market
              workspace for deeper analysis.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5">
            <WifiOff size={15} className="text-[var(--warning)]" />
            <span className="text-xs text-[var(--muted-strong)]">
              Demo data · Live feed pending
            </span>
          </div>
        </header>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Instruments",
              value: instruments.length.toString().padStart(2, "0"),
              note: "Initial instrument directory",
              icon: ChartCandlestick,
            },
            {
              label: "Watchlist",
              value: watchlist.length.toString().padStart(2, "0"),
              note: "Saved in this session",
              icon: Bookmark,
            },
            {
              label: "Market data",
              value: "Demo",
              note: "Mock candles active",
              icon: Activity,
            },
            {
              label: "Market hours",
              value: "Unavailable",
              note: "Requires live session data",
              icon: Clock3,
            },
          ].map(({ label, value, note, icon: Icon }) => (
            <div
              key={label}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs text-[var(--muted)]">{label}</p>
                <Icon size={17} className="text-[var(--accent)]" />
              </div>
              <p className="mt-4 text-2xl font-semibold tracking-tight">
                {value}
              </p>
              <p className="mt-1 text-xs text-[var(--muted)]">{note}</p>
            </div>
          ))}
        </section>

        <section className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(340px,0.9fr)]">
          <div className="min-w-0 space-y-5">
            {/* Chart panel */}
            <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">
                    {selectedInstrument.symbol}
                  </p>
                  <p className="mt-0.5 text-[10px] text-[var(--muted)]">
                    {selectedInstrument.name}
                  </p>
                </div>
                <Link
                  href="/dashboard/terminal"
                  className="flex items-center gap-1 rounded-lg border border-[var(--border)] px-3 py-1.5 text-[10px] transition hover:border-[var(--accent-border)] hover:text-[var(--accent)]"
                >
                  Open terminal
                  <ArrowUpRight size={12} />
                </Link>
              </div>
              <PriceChart symbol={selectedInstrument.symbol} height={340} />
            </div>

            {/* Instrument list */}
            <div className="min-w-0 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
              <div className="flex flex-col gap-4 border-b border-[var(--border)] p-4 sm:p-5">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-base font-semibold">
                      Instrument explorer
                    </h2>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      Browse the initial instrument directory
                    </p>
                  </div>

                  <span className="text-xs text-[var(--muted)]">
                    {visibleInstruments.length} results
                  </span>
                </div>

                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                  />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search symbol, instrument or category..."
                    aria-label="Search instruments"
                    className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] pl-10 pr-4 text-sm outline-none transition focus:border-[var(--accent-border)]"
                  />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setFilter(category)}
                      className={`shrink-0 rounded-lg border px-3 py-2 text-xs transition ${
                        filter === category
                          ? "border-[var(--accent-border)] bg-[var(--accent-soft)] font-medium text-[var(--accent)]"
                          : "border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 border-b border-[var(--border)] px-4 py-3 text-[10px] uppercase tracking-wider text-[var(--muted)] sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto] sm:px-5">
                <span>Instrument</span>
                <span className="hidden sm:block">Category</span>
                <span className="text-right">Action</span>
              </div>

              <div>
                {visibleInstruments.map((instrument) => {
                  const isSelected = selectedSymbol === instrument.symbol;
                  const isSaved = watchlist.includes(instrument.symbol);

                  return (
                    <div
                      key={instrument.symbol}
                      className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-[var(--border)] px-4 py-4 transition last:border-b-0 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto] sm:px-5 ${
                        isSelected
                          ? "bg-[var(--accent-soft)]"
                          : "hover:bg-[var(--surface-elevated)]"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedSymbol(instrument.symbol)}
                        className="min-w-0 text-left"
                      >
                        <span className="block truncate text-sm font-semibold">
                          {instrument.symbol}
                        </span>
                        <span className="mt-1 block truncate text-xs text-[var(--muted)]">
                          {instrument.name}
                        </span>
                      </button>

                      <div className="hidden sm:block">
                        <span className="rounded-md border border-[var(--border)] px-2 py-1 text-[10px] text-[var(--muted-strong)]">
                          {instrument.category}
                        </span>
                      </div>

                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => toggleWatchlist(instrument.symbol)}
                          aria-label={
                            isSaved
                              ? `Remove ${instrument.symbol} from watchlist`
                              : `Add ${instrument.symbol} to watchlist`
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--muted)] transition hover:border-[var(--accent-border)] hover:text-[var(--accent)]"
                        >
                          <Star
                            size={15}
                            fill={isSaved ? "currentColor" : "none"}
                            className={isSaved ? "text-[var(--accent)]" : ""}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedSymbol(instrument.symbol)}
                          className="rounded-lg border border-[var(--border)] px-3 py-2 text-xs transition hover:border-[var(--accent-border)] hover:text-[var(--accent)]"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  );
                })}

                {visibleInstruments.length === 0 && (
                  <div className="px-5 py-14 text-center">
                    <Search size={22} className="mx-auto text-[var(--muted)]" />
                    <p className="mt-3 text-sm font-medium">
                      No instruments found
                    </p>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      Try another search or category.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <aside className="min-w-0 space-y-5">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-[var(--muted)]">
                    Selected instrument
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                    {selectedInstrument.symbol}
                  </h2>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    {selectedInstrument.name}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleWatchlist(selectedInstrument.symbol)}
                  aria-label="Toggle selected instrument watchlist"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--muted)] transition hover:border-[var(--accent-border)] hover:text-[var(--accent)]"
                >
                  <Star
                    size={17}
                    fill={
                      watchlist.includes(selectedInstrument.symbol)
                        ? "currentColor"
                        : "none"
                    }
                    className={
                      watchlist.includes(selectedInstrument.symbol)
                        ? "text-[var(--accent)]"
                        : ""
                    }
                  />
                </button>
              </div>

              <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-[var(--muted)]">
                    Current quote
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] text-[var(--warning)]">
                    <WifiOff size={12} />
                    Demo
                  </span>
                </div>

                <p className="mt-3 text-2xl font-semibold tracking-tight">—</p>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  Live quotes require a market-data provider
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[var(--border)] p-3">
                  <p className="text-[10px] text-[var(--muted)]">Category</p>
                  <p className="mt-2 text-sm font-medium">
                    {selectedInstrument.category}
                  </p>
                </div>
                <div className="rounded-xl border border-[var(--border)] p-3">
                  <p className="text-[10px] text-[var(--muted)]">Data status</p>
                  <p className="mt-2 text-sm font-medium text-[var(--warning)]">
                    Demo candles
                  </p>
                </div>
              </div>

              <Link
                href="/dashboard/terminal"
                className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] text-xs font-semibold text-[#050607] transition hover:opacity-90"
              >
                Open analysis
                <ChevronRight size={15} />
              </Link>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Your watchlist</h3>
                <Bookmark size={15} className="text-[var(--accent)]" />
              </div>

              <p className="mt-1 text-xs text-[var(--muted)]">
                Your selected instruments in this session
              </p>

              <div className="mt-4 space-y-1">
                {instruments
                  .filter((item) => watchlist.includes(item.symbol))
                  .map((item) => (
                    <button
                      key={item.symbol}
                      type="button"
                      onClick={() => setSelectedSymbol(item.symbol)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left transition ${
                        selectedSymbol === item.symbol
                          ? "bg-[var(--accent-soft)]"
                          : "hover:bg-[var(--surface-elevated)]"
                      }`}
                    >
                      <span className="text-xs font-medium">{item.symbol}</span>
                      <span className="text-[10px] text-[var(--muted)]">
                        {item.category}
                      </span>
                    </button>
                  ))}

                {watchlist.length === 0 && (
                  <p className="py-4 text-center text-xs text-[var(--muted)]">
                    Add instruments using the star button.
                  </p>
                )}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
