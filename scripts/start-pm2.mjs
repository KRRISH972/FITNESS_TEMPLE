import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ecosystem = path.join(root, "ecosystem.config.cjs");

console.log("\n[1/2] Building API server + frontend...\n");
execSync(
  "pnpm --filter @workspace/api-server run build && pnpm --filter @workspace/fitness-temple run build",
  { cwd: root, stdio: "inherit", shell: true },
);

console.log("\n[2/2] Starting background service with pm2...\n");
execSync(`pm2 startOrRestart "${ecosystem}" --update-env`, {
  cwd: root,
  stdio: "inherit",
  shell: true,
});
execSync("pm2 save", { cwd: root, stdio: "inherit", shell: true });

execSync("pm2 status", { cwd: root, stdio: "inherit", shell: true });

console.log(
  "\nDone! Website ab background me chal rahi hai — terminal bnd karne par bhi nahi rukegi.",
);
console.log("  Local link  : http://localhost:8080");
try {
  const ip = execSync(
    "powershell -NoProfile -Command \"(Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -notlike '127.*'} | Select-Object -First 1).IPAddress\"",
    { cwd: root, encoding: "utf8" },
  ).trim();
  if (ip) console.log(`  LAN link    : http://${ip}:8080`);
} catch {
  // ignore
}
console.log("  Stop (bg)   : pnpm stop");
console.log("  Logs        : pnpm logs");