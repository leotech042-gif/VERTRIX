"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { getSession, setSession } from "@/lib/auth";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError("Enter email and password.");
      return;
    }

    const existing = getSession();
    const session = {
      email: email.trim().toLowerCase(),
      name: existing?.name || email.split("@")[0],
      verified: existing?.verified ?? true,
      startedAt: existing?.startedAt || new Date().toISOString(),
    };
    setSession(session);

    if (!session.verified) {
      router.push("/verify-email");
      return;
    }
    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)]">
      <div className="flex items-center justify-between px-5 py-4">
        <Link href="/" className="text-sm font-semibold">
          Veytrix
        </Link>
        <ThemeToggle />
      </div>

      <div className="flex flex-1 items-center justify-center px-4 pb-16">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-semibold">Log in</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Access your trading workspace
          </p>

          <form
            onSubmit={onSubmit}
            className="mt-8 space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
          >
            <div>
              <label className="mb-1.5 block text-xs text-[var(--muted)]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--accent-border)]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-[var(--muted)]">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--accent-border)]"
              />
            </div>
            {error && <p className="text-xs text-[var(--danger)]">{error}</p>}
            <button
              type="submit"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] text-sm font-semibold text-[#050607] hover:opacity-90"
            >
              Log in <ArrowRight size={16} />
            </button>
            <p className="text-center text-xs text-[var(--muted)]">
              New here?{" "}
              <Link href="/signup" className="text-[var(--accent)]">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
