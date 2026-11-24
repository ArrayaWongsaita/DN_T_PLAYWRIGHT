import type { Locator, Page } from "@playwright/test";

// Page Object ของหน้า /shop/cart
export class CartPage {
  // 👉 ข้อความยอดรวม (ขึ้นต้นด้วย "รวม ฿") ใช้ page.getByText(/^รวม ฿/)
  total!: Locator;
  // 👉 รายการสินค้าในตะกร้า (role listitem)
  items!: Locator;

  constructor(private readonly page: Page) {
    // 👉 กำหนด this.total และ this.items ตรงนี้
  }

  // 👉 เปิดหน้า /shop/cart
  async goto(): Promise<void> {}

  // 👉 กดปุ่ม "ไปชำระเงิน"
  async checkout(): Promise<void> {}
}
