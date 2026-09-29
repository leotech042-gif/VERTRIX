"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { setSession } from "@/lib/auth";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim() || password.length < 6) {
      setError("Name, valid email, and password (6+ chars) required.");
      return;
    }
    setLoading(true);

    // Demo auth. Real email verification needs a provider (Resend/SendGrid) + API key.
    setSession({
      email: email.trim().toLowerCase(),
      name: name.trim(),
      verified: false,
      startedAt: new Date().toISOString(),
    });

    router.push("/verify-email");
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
          <h1 className="text-2xl font-semibold tracking-tight">Create account</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Sign up to access the workspace. Email verification is required.
          </p>

          <form
            onSubmit={onSubmit}
            className="mt-8 space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
          >
            <div>
              <label className="mb-1.5 block text-xs text-[var(--muted)]">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--accent-border)]"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-[var(--muted)]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--accent-border)]"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-[var(--muted)]">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--accent-border)]"
                placeholder="Min 6 characters"
              />
            </div>

            {error && <p className="text-xs text-[var(--danger)]">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] text-sm font-semibold text-[#050607] hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Creating…" : "Continue"}
              {!loading && <ArrowRight size={16} />}
            </button>

            <p className="text-center text-xs text-[var(--muted)]">
              Already have an account?{" "}
              <Link href="/login" className="text-[var(--accent)]">
                Log in
              </Link>
            </p>
          </form>

          <p className="mt-4 text-[10px] leading-relaxed text-[var(--muted)]">
            Production email verification requires connecting an email provider API.
            In this build you will confirm on the next screen (demo verify).
          </p>
        </div>
      </div>
    </main>
  );
}
