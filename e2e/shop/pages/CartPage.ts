import type { Locator, Page } from "@playwright/test";

export class CartPage {
  readonly total: Locator;
  readonly items: Locator;

  constructor(private readonly page: Page) {
    this.total = page.getByText(/^รวม ฿/);
    this.items = page.getByRole("listitem");
  }

  async goto(): Promise<void> {
    await this.page.goto("/shop/cart");
  }

  async checkout(): Promise<void> {
    await this.page.getByRole("button", { name: "ไปชำระเงิน" }).click();
  }
}
