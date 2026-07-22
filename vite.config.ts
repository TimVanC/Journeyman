import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // honour $PORT when something upstream assigns one (preview harnesses,
  // container runtimes); otherwise vite's own default. Read off globalThis so
  // this stays typecheckable without pulling in @types/node.
  server: { port: Number((globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env.PORT) || undefined },
});
