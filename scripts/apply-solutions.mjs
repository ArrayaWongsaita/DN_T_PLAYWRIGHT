// คัดลอกเฉลยจาก .solutions/ ทับลงใน e2e/ แล้วลบ .solutions/ (ใช้ตอนสร้าง branch solutions)
import { cpSync, existsSync, readdirSync, rmSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const src = ".solutions";
const dest = "e2e";

if (!existsSync(src)) {
  console.error("ไม่พบโฟลเดอร์ .solutions (อาจนำเฉลยมาใช้แล้ว)");
  process.exit(1);
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const files = walk(src).filter((f) => !f.endsWith(".gitkeep"));
for (const f of files) {
  const target = join(dest, relative(src, f));
  cpSync(f, target, { recursive: true });
}
rmSync(src, { recursive: true, force: true });
console.log(`คัดลอกเฉลย ${files.length} ไฟล์ไปที่ ${dest}/`);
