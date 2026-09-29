"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || password.length < 6) {
      setError("Fill all fields. Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "veytrix-session",
        JSON.stringify({ email: email.trim(), name: name.trim(), at: Date.now() }),
      );
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4 text-[var(--foreground)]">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)]">
              <span className="h-2 w-2 rounded-full bg-[#050607]" />
            </span>
            <span className="text-lg font-semibold">Veytrix</span>
          </Link>
          <h1 className="mt-6 text-2xl font-semibold">Create account</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Start your trading workspace
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-[var(--muted-strong)]">
                Name
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3.5 text-sm outline-none focus:border-[var(--accent-border)]"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-[var(--muted-strong)]">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3.5 text-sm outline-none focus:border-[var(--accent-border)]"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-[var(--muted-strong)]">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3.5 pr-11 text-sm outline-none focus:border-[var(--accent-border)]"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                >
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          {error && <p className="mt-3 text-xs text-[var(--danger)]">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] text-sm font-semibold text-[#050607] hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Creating…" : "Create account"}
            {!loading && <ArrowRight size={16} />}
          </button>

          <p className="mt-5 text-center text-xs text-[var(--muted)]">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-[var(--accent)]">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
