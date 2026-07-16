import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import { syncUp } from "./cloud";

/** Live Supabase session. `undefined` = still loading, `null` = signed out.
 *  On sign-in, local history is pushed up once so nothing is lost. */
export function useSession(): Session | null | undefined {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((event, s) => {
      setSession(s);
      if (event === "SIGNED_IN") void syncUp();
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return session;
}
