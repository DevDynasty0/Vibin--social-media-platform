import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:8000",
      // "/api": "https://vibin-c5r0.onrender.com",
    },
  },
  plugins: [react()],
});
