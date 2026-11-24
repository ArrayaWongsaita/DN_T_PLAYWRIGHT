import type { Locator, Page } from "@playwright/test";

export class ProductListPage {
  readonly cartLink: Locator;

  constructor(private readonly page: Page) {
    this.cartLink = page.getByRole("link", { name: /^ตะกร้า/ });
  }

  async goto(): Promise<void> {
    await this.page.goto("/shop");
  }

  async add(name: string): Promise<void> {
    await this.page.getByRole("button", { name: `เพิ่ม ${name} ลงตะกร้า` }).click();
  }
}
