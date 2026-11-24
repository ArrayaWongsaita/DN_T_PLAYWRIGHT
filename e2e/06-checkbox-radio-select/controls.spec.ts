import { test, expect } from "@playwright/test";

// ================================================
// บทที่ 06: checkbox, radio, select
// ฝึก: check, selectOption, toBeChecked, toBeDisabled / toBeEnabled, toHaveValue
//
//   await locator.check()                  ติ๊ก checkbox หรือเลือก radio (ถ้าติ๊กอยู่แล้วก็ไม่ทำอะไร)
//   await locator.selectOption("ค่า")      เลือกตัวเลือกใน <select> (ใช้ value หรือข้อความ)
//   expect(locator).toBeChecked()          ตรวจว่าติ๊กอยู่
//   expect(locator).toBeDisabled()         ตรวจว่ากดไม่ได้ (toBeEnabled คือตรงข้าม)
//   expect(locator).toHaveValue("ค่า")     ตรวจค่าของช่อง
//
// ใช้ getByLabel กับ checkbox และ radio ได้ เหมือน RTL
//
// ตัวอย่าง:
//   await page.getByLabel("ยอมรับเงื่อนไข").check();
//   await expect(page.getByLabel("ยอมรับเงื่อนไข")).toBeChecked();
// ================================================

test.beforeEach(async ({ page }) => {
  await page.goto("/lessons/06-checkbox-radio-select");
});


// ------------------------------------------------
// ข้อ 1: ปุ่ม "สมัคร" ต้องกดไม่ได้ก่อน แล้วกดได้หลังติ๊ก "ยอมรับเงื่อนไข"
// แนวทาง: toBeDisabled() -> check() -> toBeEnabled()
// ------------------------------------------------
test.fixme("ปุ่ม สมัคร ใช้ได้หลังติ๊ก ยอมรับเงื่อนไข", async ({ page }) => {});
// 👉 เขียน test ของข้อ 1 ตรงนี้


// ------------------------------------------------
// ข้อ 2: เริ่มต้น "ส่งปกติ" ถูกเลือก เลือก "ส่งด่วน" แล้วต้องสลับ (ส่งปกติเลิกเลือก)
// แนวทาง: toBeChecked() และ .not.toBeChecked()
// ------------------------------------------------
test.fixme("เลือก ส่งด่วน แล้ว radio ต้องสลับ", async ({ page }) => {});
// 👉 เขียน test ของข้อ 2 ตรงนี้


// ------------------------------------------------
// ข้อ 3: เลือกจังหวัด "เชียงใหม่" แล้วค่าของ select ต้องเป็น "เชียงใหม่"
// แนวทาง: getByLabel("จังหวัด").selectOption(...) แล้ว toHaveValue(...)
// ------------------------------------------------
test.fixme("เลือกจังหวัดเชียงใหม่", async ({ page }) => {});
// 👉 เขียน test ของข้อ 3 ตรงนี้
