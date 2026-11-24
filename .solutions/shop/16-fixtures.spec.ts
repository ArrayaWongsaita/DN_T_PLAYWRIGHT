import { test, expect } from "./fixtures";

test("ใช้ fixture productList และ cart ได้เลยโดยไม่ต้อง new", async ({ productList, cart }) => {
  await productList.goto();
  await productList.add("นม");
  await expect(productList.cartLink).toHaveText("ตะกร้า (1)");
  await cart.goto();
  await expect(cart.total).toHaveText("รวม ฿40");
});

test("ใช้ fixture loginPage", async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login("demo", "ผิด");
  await expect(loginPage.error).toBeVisible();
});
