import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Must match your GitHub repo name exactly (for GitHub Pages).
// If deploying to a custom domain / WordPress subdirectory, set base: "/"
const REPO_NAME = "actelis-accessory-selector";

export default defineConfig({
  plugins: [react()],
  base: `/${REPO_NAME}/`,
  build: { outDir: "dist", sourcemap: false },
});
