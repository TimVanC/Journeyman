import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { SPORT } from "../sports/active";
import { supabase } from "../lib/supabase";
import { computeStats, fetchResults, SCORE_BUCKETS, type Stats } from "../lib/cloud";

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
/** Supabase never errors on a duplicate sign-up (that would let anyone probe
 *  which emails/numbers are registered). Instead it refuses to create the
 *  account and hands back an obfuscated user with an EMPTY identities array.
 *  That empty array is the only signal the client gets, for email and phone
 *  alike — so it's how we spot "you already have an account". */
function isExistingAccount(user: User | null): boolean {
  return !!user && user.identities?.length === 0;
}

function parseIdentifier(raw: string): { email: string } | { phone: string } | null {
  const t = raw.trim();
  // lowercase the email so "Tim@x.com" and "tim@x.com" can't look like two
  // different accounts (Supabase also normalizes server-side, but this keeps
  // the client consistent)
  if (t.includes("@")) return { email: t.toLowerCase() };
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
  const [showPw, setShowPw] = useState(false);
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
          if (isExistingAccount(data.user)) {
            onSwitchView("signin");
            setError("That email already has an account — sign in instead.");
          } else if (data.session) {
            setMessage("Account created — you're in!");
          } else {
            setMessage("Check your email to confirm your account, then sign in.");
          }
        } else {
          const { data, error } = await supabase.auth.signUp({ phone: id.phone, password });
          if (error) throw error;
          if (isExistingAccount(data.user)) {
            // same guard as email: don't march an existing user through a
            // "create account" OTP flow that only re-auths them anyway
            onSwitchView("signin");
            setError("That number already has an account — sign in instead.");
          } else if (data.session) {
            setMessage("Account created — you're in!");
          } else {
            setConfirmPhone(id.phone); // genuinely new — Supabase texted a code
          }
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

  const resendCode = async () => {
    if (!confirmPhone) return;
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      const { error } = await supabase.auth.resend({ type: "sms", phone: confirmPhone });
      if (error) throw error;
      setMessage("New code sent.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't resend the code");
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
          className="w-full rounded-lg border-2 border-ink bg-card px-3 py-2.5"
        />
        <button type="submit" className="btn btn-primary w-full py-2.5" disabled={busy}>
          {busy ? "…" : "Confirm code"}
        </button>
        <p className="text-center text-xs text-ink-soft">
          Didn't get it?{" "}
          <button type="button" className="underline" onClick={resendCode} disabled={busy}>
            Resend code
          </button>
        </p>
        {message && <p className="font-bold text-[#2e7d43]">{message}</p>}
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
        <div className="relative">
          <input
            type={showPw ? "text" : "password"}
            required
            // only enforce length when CREATING a password; at sign-in let the
            // server judge so a valid existing password is never client-blocked
            minLength={view === "signup" ? 6 : undefined}
            autoComplete={view === "signup" ? "new-password" : "current-password"}
            placeholder={view === "signup" ? "Password (6+ characters)" : "Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border-2 border-ink bg-card px-3 py-2.5 pr-14"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-3 text-xs font-bold uppercase tracking-wide text-ink-soft"
            onClick={() => setShowPw((s) => !s)}
            aria-label={showPw ? "Hide password" : "Show password"}
          >
            {showPw ? "Hide" : "Show"}
          </button>
        </div>
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
    fetchResults(SPORT.sport).then((rows) => setStats(computeStats(rows, today)));
  }, [today]);

  // one shared scale so the bars compare honestly, DNF included
  const maxBar = stats ? Math.max(1, ...stats.scoreDist, stats.dnf) : 1;

  return (
    <div className="mt-3 space-y-4 text-sm">
      <p className="text-xs text-ink-soft">
        {session.user.email ?? session.user.phone} · {SPORT.league} stats
      </p>

      {stats === null ? (
        <p className="text-ink-soft">Loading stats…</p>
      ) : (
        <>
          <div className="grid grid-cols-4 border-y border-line py-3 text-center">
            <StatCell label="Played" value={stats.played} />
            <StatCell label="Win %" value={stats.winPct} />
            <StatCell label="Current Streak" value={stats.currentStreak} />
            <StatCell label="Max Streak" value={stats.maxStreak} />
          </div>
          <div className="-mt-4 grid grid-cols-2 border-b border-line py-3 text-center">
            <StatCell label="Perfect Games" value={stats.perfect} />
            <StatCell label="Avg Score" value={stats.avgScore ?? "—"} />
          </div>

          <div>
            <p className="mb-1.5 text-[0.68rem] font-bold uppercase tracking-widest">
              Score distribution
            </p>
            <div className="space-y-1">
              {SCORE_BUCKETS.map((b, i) => (
                <DistBar key={b.label} label={b.label} count={stats.scoreDist[i]} max={maxBar} />
              ))}
              <DistBar label="0" count={stats.dnf} max={maxBar} muted />
            </div>
          </div>

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

function StatCell({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="px-1">
      <div className="font-display text-3xl leading-none tabular-nums">{value}</div>
      <div className="mt-1 text-[0.58rem] font-medium uppercase tracking-wide text-ink-soft">
        {label}
      </div>
    </div>
  );
}

function DistBar({
  label,
  count,
  max,
  muted = false,
}: {
  label: string;
  count: number;
  max: number;
  muted?: boolean;
}) {
  // stub-width bars (zero or tiny counts) center their number; long bars
  // right-align it Wordle-style
  const stub = count === 0 || count / max < 0.15;
  return (
    <div className="flex items-center gap-2 text-xs tabular-nums">
      <span className="w-9 shrink-0 text-right font-bold">{label}</span>
      <div className="h-5 flex-1">
        <div
          className={`flex h-full items-center rounded-sm text-[0.65rem] font-bold text-[#faf6ec] ${
            stub ? "justify-center" : "justify-end px-1.5"
          } ${muted ? "bg-ink-soft" : "bg-wood-deep"}`}
          style={{ width: count > 0 ? `${(count / max) * 100}%` : "1.4rem", minWidth: "1.4rem" }}
        >
          {count}
        </div>
      </div>
    </div>
  );
}
