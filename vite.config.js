import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://vibin-social-media-platform-backend.onrender.com",
    },
  },
  plugins: [react()],
});
