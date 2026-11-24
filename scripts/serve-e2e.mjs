// เปิดเซิร์ฟเวอร์สำหรับ Playwright: build ถ้ายังไม่มี build หรือโค้ดใหม่กว่า build แล้ว next start
// เขียนเป็น Node เพื่อใช้ได้ทั้ง macOS, Linux และ Windows (ไม่พึ่ง syntax ของ shell)
import { spawn, spawnSync } from "node:child_process";
import { existsSync, readdirSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";

const nextBin = createRequire(import.meta.url).resolve("next/dist/bin/next");
const watched = ["app", "components", "lib", "public", "next.config.ts", "package.json"];

function newest(path) {
  if (!existsSync(path)) return 0;
  const st = statSync(path);
  if (!st.isDirectory()) return st.mtimeMs;
  return readdirSync(path).reduce((m, name) => Math.max(m, newest(join(path, name))), st.mtimeMs);
}

const buildId = ".next/BUILD_ID";
const stale = !existsSync(buildId) || watched.some((p) => newest(p) > statSync(buildId).mtimeMs);

if (stale) {
  console.log("กำลัง build แอป (ครั้งแรกหรือโค้ดเปลี่ยน ใช้เวลาประมาณ 20 วินาที)...");
  const build = spawnSync(process.execPath, [nextBin, "build"], { stdio: "inherit" });
  if (build.status !== 0) {
    console.error("next build ไม่สำเร็จ ดู error ด้านบน");
    process.exit(build.status ?? 1);
  }
}

const server = spawn(process.execPath, [nextBin, "start"], { stdio: "inherit", env: process.env });
for (const sig of ["SIGINT", "SIGTERM"]) process.on(sig, () => server.kill(sig));
server.on("exit", (code) => process.exit(code ?? 0));
