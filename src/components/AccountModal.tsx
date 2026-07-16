import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { computeStats, fetchResults, type Stats } from "../lib/cloud";
import { FlameIcon } from "./Icons";

interface Props {
  session: Session | null;
  /** current daily puzzle number (for streak math) */
  today: number;
  onClose: () => void;
}

/** Sign-up / sign-in when logged out; profile + lifetime stats when in. */
export default function AccountModal({ session, today, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={session ? "Your account" : "Create a free account"}
        className="modal-panel p-5"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-display text-2xl">
            {session ? "Your locker" : "Join the league"}
          </h2>
          <button type="button" className="chip cursor-pointer" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {session ? <SignedIn session={session} today={today} /> : <AuthForm />}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function AuthForm() {
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: location.origin },
        });
        if (error) throw error;
        // depending on project settings, sign-up may need email confirmation
        if (data.session) setMessage("Account created — you're in!");
        else setMessage("Check your email for a confirmation link, then sign in.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: location.origin },
    });
    if (error) setError(error.message);
  };

  return (
    <div className="mt-3 space-y-3 text-sm">
      <p className="leading-relaxed">
        <strong>100% free.</strong> An account saves your streak and stats
        across devices and unlocks the <strong>Archive</strong> — every past
        puzzle, playable any time.
      </p>

      <div className="flex gap-1.5" role="tablist" aria-label="Sign up or sign in">
        <button
          type="button"
          role="tab"
          aria-selected={mode === "signup"}
          className={`btn flex-1 py-2 ${mode === "signup" ? "btn-primary" : ""}`}
          onClick={() => setMode("signup")}
        >
          Sign up
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "signin"}
          className={`btn flex-1 py-2 ${mode === "signin" ? "btn-primary" : ""}`}
          onClick={() => setMode("signin")}
        >
          Sign in
        </button>
      </div>

      <form onSubmit={submit} className="space-y-2">
        <input
          type="email"
          required
          autoComplete="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border-2 border-ink bg-card px-3 py-2.5"
        />
        <input
          type="password"
          required
          minLength={6}
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          placeholder={mode === "signup" ? "Password (6+ characters)" : "Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border-2 border-ink bg-card px-3 py-2.5"
        />
        <button type="submit" className="btn btn-primary w-full py-2.5" disabled={busy}>
          {busy ? "…" : mode === "signup" ? "Create free account" : "Sign in"}
        </button>
      </form>

      <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-widest text-ink-soft">
        <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
      </div>

      <button type="button" className="btn w-full py-2.5" onClick={google}>
        Continue with Google
      </button>

      {message && <p className="font-bold text-[#2e7d43]">{message}</p>}
      {error && <p className="font-bold text-[#b3362a]">{error}</p>}

      <p className="text-xs leading-relaxed text-ink-soft">
        Free forever — no card, no spam. Just your streaks, safe.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function SignedIn({ session, today }: { session: Session; today: number }) {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetchResults().then((rows) => setStats(computeStats(rows, today)));
  }, [today]);

  const maxDist = stats ? Math.max(1, ...Object.values(stats.distribution)) : 1;
  const distKeys = stats
    ? Object.keys(stats.distribution).map(Number).sort((a, b) => a - b)
    : [];

  return (
    <div className="mt-3 space-y-4 text-sm">
      <p className="text-xs text-ink-soft">{session.user.email}</p>

      {stats === null ? (
        <p className="text-ink-soft">Loading stats…</p>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-1.5 text-center">
            <StatBox label="Played" value={stats.played} />
            <StatBox label="Win %" value={stats.winPct} />
            <StatBox
              label="Streak"
              value={
                <>
                  <FlameIcon size={14} className="text-wood-deep" /> {stats.currentStreak}
                </>
              }
            />
            <StatBox label="Best" value={stats.maxStreak} />
          </div>

          {distKeys.length > 0 && (
            <div>
              <p className="mb-1 text-[0.65rem] font-bold uppercase tracking-widest text-ink-soft">
                Solved at N jerseys
              </p>
              <div className="space-y-1">
                {distKeys.map((k) => (
                  <div key={k} className="flex items-center gap-2 text-xs tabular-nums">
                    <span className="w-3 text-right font-bold">{k}</span>
                    <div className="h-4 flex-1 rounded-sm bg-line/40">
                      <div
                        className="flex h-full items-center justify-end rounded-sm bg-wood px-1 text-[0.6rem] font-bold text-paper"
                        style={{ width: `${(stats.distribution[k] / maxDist) * 100}%`, minWidth: "1.1rem" }}
                      >
                        {stats.distribution[k]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {stats.archivePlayed > 0 && (
            <p className="text-xs text-ink-soft">
              Archive: {stats.archiveWins}/{stats.archivePlayed} solved
            </p>
          )}
        </>
      )}

      <button
        type="button"
        className="btn w-full py-2"
        onClick={() => supabase.auth.signOut()}
      >
        Sign out
      </button>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-line bg-card px-1 py-2">
      <div className="flex items-center justify-center gap-0.5 font-display text-xl leading-none tabular-nums">
        {value}
      </div>
      <div className="mt-1 text-[0.55rem] font-bold uppercase tracking-widest text-ink-soft">
        {label}
      </div>
    </div>
  );
}
