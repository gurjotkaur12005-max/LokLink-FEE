import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite configuration: the React plugin lets Vite understand JSX.
export default defineConfig({
  plugins: [react()],
});
