import { test, expect } from "./fixtures";

test("เลือกสินค้า -> ตะกร้า -> login -> สั่งซื้อสำเร็จ", async ({ page, productList, cart, loginPage }) => {
  await test.step("เลือกชากับกาแฟ", async () => {
    await productList.goto();
    await productList.add("ชา");
    await productList.add("กาแฟ");
  });

  await test.step("ตรวจตะกร้า", async () => {
    await productList.cartLink.click();
    await expect(cart.total).toHaveText("รวม ฿130");
  });

  await test.step("ไปชำระเงินแต่ยังไม่ login จึงถูกส่งไปหน้า login", async () => {
    await cart.checkout();
    await expect(page).toHaveURL(/\/shop\/login\?next=\/shop\/checkout/);
  });

  await test.step("login แล้วกลับมาหน้า checkout", async () => {
    await loginPage.login("demo", "1234");
    await expect(page).toHaveURL(/\/shop\/checkout$/);
  });

  await test.step("ยืนยันการสั่งซื้อ ตะกร้าต้องว่าง", async () => {
    await page.getByRole("button", { name: "ยืนยันการสั่งซื้อ" }).click();
    await expect(page.getByText("สั่งซื้อสำเร็จ")).toBeVisible();
    await cart.goto();
    await expect(page.getByText("ตะกร้าว่างเปล่า")).toBeVisible();
  });
});
