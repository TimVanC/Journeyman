import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import App from "./App";
import { initAnalytics } from "./lib/analytics";

// dev-only jersey QA sheet: ?jerseys shows every renderer × era × colorway
const gallery =
  import.meta.env.DEV && new URLSearchParams(location.search).has("jerseys");
const JerseyGallery = lazy(() => import("./components/JerseyGallery"));

initAnalytics();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {gallery ? (
      <Suspense>
        <JerseyGallery />
      </Suspense>
    ) : (
      <App />
    )}
    <Analytics />
  </StrictMode>
);
