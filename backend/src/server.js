import app from "./app.js";
import env from "./config/env.js";
import { connectDatabase } from "./config/db.js";
import logger from "./utils/logger.js";
import { executeScraper } from "./scraper/hackerNewsScraper.js";

function startHttpServer() {
  return new Promise((resolve, reject) => {
    const server = app.listen(env.port, () => {
      logger.info(`Server listening on port ${env.port}.`);
      resolve(server);
    });

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        reject(
          new Error(
            `Port ${env.port} is already in use. Stop the existing process or change PORT in backend/.env.`
          )
        );
        return;
      }

      reject(error);
    });
  });
}

async function bootstrap() {
  await connectDatabase();

  logger.info("Running startup scraper job.");
  await executeScraper({ trigger: "startup" });

  await startHttpServer();
}

bootstrap().catch((error) => {
  logger.error("Server bootstrap failed.", { error: error.message });
  process.exit(1);
});
