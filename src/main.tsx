import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import App from "./App";
import { initAnalytics } from "./lib/analytics";

// dev-only QA pages:
//   ?jerseys — every renderer × era × colorway, plus the icon sets
//   ?cards   — a real JerseyCard carrying every accolade for the league
// Available on localhost AND on Vercel preview builds (so branches can be
// reviewed on staging), but never on the live domain — these pages reveal
// artwork and card internals that would spoil the daily.
const qaAllowed =
  import.meta.env.DEV ||
  /(^localhost$|\.vercel\.app$)/.test(location.hostname);
const qaParams = new URLSearchParams(location.search);
const qa = !qaAllowed
  ? null
  : qaParams.has("jerseys")
    ? "jerseys"
    : qaParams.has("cards")
      ? "cards"
      : null;
const JerseyGallery = lazy(() => import("./components/JerseyGallery"));
const CardPreview = lazy(() => import("./components/CardPreview"));

initAnalytics();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {qa ? (
      <Suspense>{qa === "jerseys" ? <JerseyGallery /> : <CardPreview />}</Suspense>
    ) : (
      <App />
    )}
    <Analytics />
  </StrictMode>
);
