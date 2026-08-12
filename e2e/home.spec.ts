import { expect, test } from "@playwright/test";

test("renders the application", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("main")).toBeVisible();
});
