import path from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import rollupNodePolyFill from "rollup-plugin-polyfill-node";

import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ["mqtt"],
  },
  plugins: [
    vue(),
    svgLoader(),
    NodeGlobalsPolyfillPlugin({
      buffer: true,
      process: true,
    }),
    NodeModulesPolyfillPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      entries: {
        mqtt: ".vite/mqtt.js",
      },
    },
  },
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
    },
  },
});
