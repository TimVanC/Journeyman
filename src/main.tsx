import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// dev-only jersey QA sheet: ?jerseys shows every renderer × era × colorway
const gallery =
  import.meta.env.DEV && new URLSearchParams(location.search).has("jerseys");
const JerseyGallery = lazy(() => import("./components/JerseyGallery"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {gallery ? (
      <Suspense>
        <JerseyGallery />
      </Suspense>
    ) : (
      <App />
    )}
  </StrictMode>
);
