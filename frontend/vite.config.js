import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext",
      outDir: 'dist', // Ensure the output directory matches what Vercel expects
  },
});
