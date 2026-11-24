import { chromium, defineConfig, devices } from "@playwright/test";
import { existsSync } from "node:fs";

const port = Number(process.env.PORT ?? 3000);
const baseURL = `http://localhost:${port}`;

// ตรวจว่าลง Chromium แล้วหรือยัง ถ้ายังให้บอกวิธีแก้เป็นภาษาไทย
const chromiumPath = chromium.executablePath();
if (!existsSync(chromiumPath)) {
  throw new Error("ยังไม่ได้ติดตั้ง Chromium ให้รัน: pnpm setup:browsers");
}

export default defineConfig({
  testDir: process.env.PW_SOLUTIONS ? "./.solutions" : "./e2e",
  fullyParallel: true,
  reporter: [["html", { open: "never" }], ["list"]],
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "pnpm dev",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    env: { PORT: String(port) },
  },
});
