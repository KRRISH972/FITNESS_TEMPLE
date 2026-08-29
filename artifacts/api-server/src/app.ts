import express, { type Express } from "express";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendDist = path.resolve(
  __dirname,
  "..",
  "..",
  "fitness-temple",
  "dist",
  "public",
);
const indexPath = path.join(frontendDist, "index.html");

if (fs.existsSync(indexPath)) {
  app.use(express.static(frontendDist, { index: "index.html" }));
  app.use((req, res, next) => {
    if (req.method !== "GET") {
      next();
      return;
    }
    if (req.path.startsWith("/api/")) {
      next();
      return;
    }
    res.sendFile(indexPath);
  });
} else {
  logger.warn(
    { frontendDist },
    "Frontend build not found. Run 'pnpm run build:prod' so the site is served too.",
  );
}

export default app;
