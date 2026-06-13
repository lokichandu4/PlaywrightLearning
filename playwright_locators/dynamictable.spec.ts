import { test, expect, Locator } from '@playwright/test';

test.describe('dropdown Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page before each test
    await page.goto('https://testautomationpractice.blogspot.com/');
  });

   test('Dynamic web table chrome cpu usage', async ({ page }) => {
   
        const table: Locator= page.locator("table[name='BookTable'] tbody");
        await table.scrollIntoViewIfNeeded();
        await expect (table).toBeVisible();


  });


   test.afterEach(async ({ page }) => {
     // Wait for 2 seconds
    await page.waitForTimeout(2000); });
});  