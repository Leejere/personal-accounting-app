import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    // Some libs that can run in both Web and Node.js, such as `axios`, we need to tell Vite to build them in Node.js.
    browserField: false,
    mainFields: ["module", "jsnext:main", "jsnext"],
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/main.js"),
        preload: path.resolve(__dirname, "src/preload.js"),
      },
      external: ["serialport", "sqlite3"],
    },
  },
});
