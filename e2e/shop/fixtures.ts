import { test as base } from "@playwright/test";
import { ProductListPage } from "./pages/ProductListPage";
import { CartPage } from "./pages/CartPage";
import { LoginPage } from "./pages/LoginPage";

type ShopFixtures = {
  productList: ProductListPage;
  cart: CartPage;
  loginPage: LoginPage;
};

// 👉 เติมตัว fixture แต่ละตัว: สร้าง Page Object ด้วย page แล้วส่งต่อให้ test ด้วย await use(...)
// ตัวอย่าง:
//   productList: async ({ page }, use) => {
//     await use(new ProductListPage(page));
//   },
export const test = base.extend<ShopFixtures>({
  productList: async ({ page }, use) => {
    // 👉 await use(new ProductListPage(page));
  },
  cart: async ({ page }, use) => {
    // 👉 await use(new CartPage(page));
  },
  loginPage: async ({ page }, use) => {
    // 👉 await use(new LoginPage(page));
  },
});

export { expect } from "@playwright/test";
