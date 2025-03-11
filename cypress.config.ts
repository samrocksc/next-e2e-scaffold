import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { spawn } from "node:child_process";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";

export default defineConfig({
  e2e: {
    // baseUrl: "http://localhost:3000",
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        }),
      );

      let server: any;

      const startServer = () => {
        server = spawn("npm", ["run", "dev"], {
          stdio: "inherit",
          shell: true,
        });

        return new Promise((resolve) => {
          setTimeout(resolve, 4000);
        });
      };

      on("before:browser:launch", () => {
        startServer();
      });

      on("before:run", () => {
        startServer();
      });

      on("before:spec", () => {
        startServer();
      });

      on("after:run", () => {
        if (server) {
          server.kill();
        }
      });

      return config;
    },
    supportFile: false,
    specPattern: "**/*.feature",
  },
});
