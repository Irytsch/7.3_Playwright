const { test, expect } = require("@playwright/test");

const user = require("../user.js");

test("Successful authorization", async ({ page }) => {
  // Go to https://netology.ru/?modal=sign_in
  await page.goto("https://netology.ru/?modal=sign_in");

  // Click [placeholder="Email"]
  await page.locator('[placeholder="Email"]').click();

  // Fill [placeholder="Email"]
  await page.locator('[placeholder="Email"]').fill(user.userEmail);

  // Click [placeholder="Пароль"]
  await page.locator('[placeholder="Пароль"]').click();

  // Fill [placeholder="Пароль"]
  await page.locator('[placeholder="Пароль"]').fill(user.userPassword);

  // Click [data-testid="login-submit-btn"]
  await page.locator('[data-testid="login-submit-btn"]').click();

  // expect: successful authorization
  await expect(page).toHaveURL("https://netology.ru/profile");
  const header = await page.locator("h2").first();
  await expect(header).toHaveText("Моё обучение");
  await page.screenshot({ path: "screenshot.png" });
}, 30000);

test("Unsuccessful authorization", async ({ page }) => {
  // Go to https://netology.ru/?modal=sign_in
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.locator('[placeholder="Email"]').click();
  await page.locator('[placeholder="Email"]').fill("email@email.ru");
  await page.locator('[placeholder="Пароль"]').click();
  await page.locator('[placeholder="Пароль"]').fill("Password123");
  await page.locator('[data-testid="login-submit-btn"]').click();
  await expect(page.locator('[data-testid="login-error-hint"]')).toHaveText(
    "Вы ввели неправильно логин или пароль"
  );
  await page.screenshot({ path: "screenshotError.png" });
});
