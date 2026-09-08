import { spawnSync } from "node:child_process";
const env = { ...process.env, SITES_STATIC_PREVIEW: "1" };
for (const args of [["node_modules/prisma/build/index.js", "generate"], ["node_modules/next/dist/bin/next", "build"]]) {
  const result = spawnSync(process.execPath, args, { stdio: "inherit", env });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
