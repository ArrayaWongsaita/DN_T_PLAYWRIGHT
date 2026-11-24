import type { Locator, Page } from "@playwright/test";

// Page Object ของหน้า /shop/login
export class LoginPage {
  // 👉 ข้อความ error "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" (ใช้ getByText)
  error!: Locator;

  constructor(private readonly page: Page) {
    // 👉 กำหนด this.error ตรงนี้
  }

  // 👉 เปิด /shop/login (ถ้ามี next ให้ต่อท้ายเป็น ?next=<next>)
  async goto(next?: string): Promise<void> {}

  // 👉 กรอกช่อง "ชื่อผู้ใช้" กับ "รหัสผ่าน" แล้วกด "เข้าสู่ระบบ"
  async login(user: string, pass: string): Promise<void> {}
}
