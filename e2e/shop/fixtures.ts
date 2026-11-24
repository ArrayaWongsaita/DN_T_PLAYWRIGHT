import { test as base } from "@playwright/test";
import { ProductListPage } from "./pages/ProductListPage";
import { CartPage } from "./pages/CartPage";
import { LoginPage } from "./pages/LoginPage";

type ShopFixtures = {
  productList: ProductListPage;
  cart: CartPage;
  loginPage: LoginPage;
};

export const test = base.extend<ShopFixtures>({
  productList: async ({ page }, use) => {
    await use(new ProductListPage(page));
  },
  cart: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect } from "@playwright/test";
