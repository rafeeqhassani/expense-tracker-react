import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,

        configure(proxy) {
          proxy.on("error", (error, req, res) => {
            console.log("Backend server is unavailable");

            res.writeHead(503, {
              "Content-Type": "application/json",
            });

            res.end(
              JSON.stringify({
                message: "Unable to connect to the server.",
              }),
            );
          });
        },
      },
    },
  },
});
