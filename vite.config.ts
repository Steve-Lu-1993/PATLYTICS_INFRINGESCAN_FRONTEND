import path from "path"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5373,
    // hmr:false
  },
  // define:{
  //   'import.meta.env.VITE_BACKEND_API_BASE_URL': JSON.stringify(process.env.VITE_BACKEND_API_BASE_URL),
  // },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
