import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/lessons/06-checkbox-radio-select");
});

test("ปุ่ม สมัคร ใช้ได้หลังติ๊ก ยอมรับเงื่อนไข", async ({ page }) => {
  const submit = page.getByRole("button", { name: "สมัคร" });
  await expect(submit).toBeDisabled();
  await page.getByLabel("ยอมรับเงื่อนไข").check();
  await expect(submit).toBeEnabled();
});

test("เลือก ส่งด่วน แล้ว radio ต้องสลับ", async ({ page }) => {
  await expect(page.getByLabel("ส่งปกติ")).toBeChecked();
  await page.getByLabel("ส่งด่วน").check();
  await expect(page.getByLabel("ส่งด่วน")).toBeChecked();
  await expect(page.getByLabel("ส่งปกติ")).not.toBeChecked();
});

test("เลือกจังหวัดเชียงใหม่", async ({ page }) => {
  await page.getByLabel("จังหวัด").selectOption("เชียงใหม่");
  await expect(page.getByLabel("จังหวัด")).toHaveValue("เชียงใหม่");
});
