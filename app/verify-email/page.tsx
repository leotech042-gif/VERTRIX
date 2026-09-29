"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSession, setSession } from "@/lib/auth";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const s = getSession();
    if (!s) {
      router.replace("/signup");
      return;
    }
    setEmail(s.email);
    if (s.verified) router.replace("/dashboard");
  }, [router]);

  function confirmDemo() {
    const s = getSession();
    if (!s) return;
    setSession({ ...s, verified: true });
    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4 text-[var(--foreground)]">
      <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
        <h1 className="text-xl font-semibold">Verify your email</h1>
        <p className="mt-3 text-sm text-[var(--muted)]">
          We would send a verification link to{" "}
          <span className="text-[var(--foreground)]">{email || "your email"}</span>.
        </p>
        <p className="mt-3 text-xs leading-relaxed text-[var(--muted)]">
          Real outbound email needs a provider (e.g. Resend). For this demo, confirm below to continue.
        </p>
        <button
          type="button"
          onClick={confirmDemo}
          className="mt-6 h-11 w-full rounded-xl bg-[var(--accent)] text-sm font-semibold text-[#050607] hover:opacity-90"
        >
          I verified my email (demo)
        </button>
        <Link href="/" className="mt-4 block text-xs text-[var(--muted)] hover:text-[var(--foreground)]">
          Back to home
        </Link>
      </div>
    </main>
  );
}
