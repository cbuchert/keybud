/// <reference types="vitest" />

import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import reactSWC from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite(), reactSWC()],
  test: {
    environment: "jsdom",
  },
})
