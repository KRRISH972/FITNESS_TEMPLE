import { execSync, spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const serverEntry = path.join(
  root,
  "artifacts",
  "api-server",
  "dist",
  "index.mjs",
);
const frontendIndex = path.join(
  root,
  "artifacts",
  "fitness-temple",
  "dist",
  "public",
  "index.html",
);
const port = process.env.PORT ?? "8080";

function runBuild() {
  console.log("\n[1/1] Building API server + frontend...\n");
  execSync(
    "pnpm --filter @workspace/api-server run build && pnpm --filter @workspace/fitness-temple run build",
    { cwd: root, stdio: "inherit", shell: true },
  );
}

if (!fs.existsSync(serverEntry) || !fs.existsSync(frontendIndex)) {
  runBuild();
} else {
  console.log("\n[ok] Build output found. Run again with FORCE_BUILD=1 to rebuild.\n");
  if (process.env.FORCE_BUILD) runBuild();
}

console.log(`\nFitness Temple starting on http://localhost:${port}\n`);

const child = spawn(
  process.execPath,
  ["--enable-source-maps", serverEntry],
  {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, PORT: port, NODE_ENV: "production" },
  },
);

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    child.kill(signal);
  });
}

child.on("exit", (code) => process.exit(code ?? 0));