import type { Locator, Page } from "@playwright/test";

// Page Object ของหน้า /shop
// 👉 เติมให้ครบ (ดูโจทย์ในไฟล์ e2e/shop/15-page-object.spec.ts)
export class ProductListPage {
  // 👉 ลิงก์ตะกร้า (ชื่อขึ้นต้นด้วย "ตะกร้า") ใช้ page.getByRole("link", { name: /^ตะกร้า/ })
  cartLink!: Locator;

  constructor(private readonly page: Page) {
    // 👉 กำหนด this.cartLink ตรงนี้
  }

  // 👉 เปิดหน้า /shop
  async goto(): Promise<void> {}

  // 👉 กดปุ่ม "เพิ่ม <name> ลงตะกร้า"
  async add(name: string): Promise<void> {}
}
