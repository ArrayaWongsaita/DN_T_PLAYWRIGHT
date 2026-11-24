import type { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly error: Locator;

  constructor(private readonly page: Page) {
    this.error = page.getByText("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
  }

  async goto(next?: string): Promise<void> {
    await this.page.goto(next ? `/shop/login?next=${next}` : "/shop/login");
  }

  async login(user: string, pass: string): Promise<void> {
    await this.page.getByLabel("ชื่อผู้ใช้").fill(user);
    await this.page.getByLabel("รหัสผ่าน").fill(pass);
    await this.page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
  }
}
