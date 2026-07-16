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
  const [view, setView] = useState<"signup" | "signin">("signup");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const heading = session ? "Your locker" : view === "signup" ? "Join the league" : "Sign in";

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={heading}
        className="modal-panel p-5"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-display text-2xl">{heading}</h2>
          <button type="button" className="chip cursor-pointer" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {session ? (
          <SignedIn session={session} today={today} />
        ) : (
          <AuthForm view={view} onSwitchView={setView} />
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

/** One field accepts email OR phone; detect which and route accordingly.
 *  Bare 10-digit numbers are treated as US (+1). Phone accounts still use a
 *  password — the only SMS ever sent is the one confirmation code at sign-up,
 *  so repeat logins cost nothing. */
function parseIdentifier(raw: string): { email: string } | { phone: string } | null {
  const t = raw.trim();
  if (t.includes("@")) return { email: t };
  const digits = t.replace(/\D/g, "");
  if (digits.length === 10) return { phone: `+1${digits}` };
  if (digits.length >= 11 && digits.length <= 15) return { phone: `+${digits}` };
  return null;
}

function AuthForm({
  view,
  onSwitchView,
}: {
  view: "signup" | "signin";
  onSwitchView: (v: "signup" | "signin") => void;
}) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  // set while a phone sign-up waits on its SMS confirmation code
  const [confirmPhone, setConfirmPhone] = useState<string | null>(null);
  const [code, setCode] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = parseIdentifier(identifier);
    if (!id) {
      setError("Enter a valid email address or phone number");
      return;
    }
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      if (view === "signup") {
        if ("email" in id) {
          const { data, error } = await supabase.auth.signUp({
            email: id.email,
            password,
            options: { emailRedirectTo: location.origin },
          });
          if (error) throw error;
          if (data.session) setMessage("Account created — you're in!");
          else setMessage("Check your email for a confirmation link, then sign in.");
        } else {
          const { data, error } = await supabase.auth.signUp({ phone: id.phone, password });
          if (error) throw error;
          if (data.session) setMessage("Account created — you're in!");
          else setConfirmPhone(id.phone); // Supabase just texted a code
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword(
          "email" in id ? { email: id.email, password } : { phone: id.phone, password }
        );
        if (error) throw error;
        // session change flips the modal to the signed-in view
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  const confirmCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmPhone) return;
    setBusy(true);
    setError(null);
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: confirmPhone,
        token: code,
        type: "sms",
      });
      if (error) throw error;
      // verified = signed in; onAuthStateChange re-renders into "Your locker"
    } catch (err) {
      setError(err instanceof Error ? err.message : "That code didn't match");
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

  // phone sign-up confirmation step
  if (confirmPhone) {
    return (
      <form onSubmit={confirmCode} className="mt-3 space-y-2 text-sm">
        <p className="text-xs text-ink-soft">
          We texted a code to {confirmPhone}.{" "}
          <button
            type="button"
            className="underline"
            onClick={() => {
              setConfirmPhone(null);
              setCode("");
              setError(null);
            }}
          >
            Wrong number?
          </button>
        </p>
        <input
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          required
          placeholder="6-digit code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full rounded-lg border-2 border-ink bg-card px-3 py-2.5 tracking-[0.3em]"
        />
        <button type="submit" className="btn btn-primary w-full py-2.5" disabled={busy}>
          {busy ? "…" : "Confirm code"}
        </button>
        {error && <p className="font-bold text-[#b3362a]">{error}</p>}
      </form>
    );
  }

  return (
    <div className="mt-3 space-y-3 text-sm">
      {view === "signup" && (
        <p className="leading-relaxed">
          <strong>100% free.</strong> An account saves your streak and stats
          across devices and unlocks the <strong>Archive</strong> — every past
          puzzle, playable any time.
        </p>
      )}

      <form onSubmit={submit} className="space-y-2">
        <input
          type="text"
          required
          autoComplete="username"
          placeholder="Email or phone number"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="w-full rounded-lg border-2 border-ink bg-card px-3 py-2.5"
        />
        <input
          type="password"
          required
          minLength={6}
          autoComplete={view === "signup" ? "new-password" : "current-password"}
          placeholder={view === "signup" ? "Password (6+ characters)" : "Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border-2 border-ink bg-card px-3 py-2.5"
        />
        <button type="submit" className="btn btn-primary w-full py-2.5" disabled={busy}>
          {busy ? "…" : view === "signup" ? "Create free account" : "Sign in"}
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

      <p className="pt-1 text-center text-xs text-ink-soft">
        {view === "signup" ? (
          <>
            Already have an account?{" "}
            <button
              type="button"
              className="font-bold text-ink underline underline-offset-2"
              onClick={() => onSwitchView("signin")}
            >
              Sign in here
            </button>
          </>
        ) : (
          <>
            New here?{" "}
            <button
              type="button"
              className="font-bold text-ink underline underline-offset-2"
              onClick={() => onSwitchView("signup")}
            >
              Create a free account
            </button>
          </>
        )}
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
      <p className="text-xs text-ink-soft">{session.user.email ?? session.user.phone}</p>

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
