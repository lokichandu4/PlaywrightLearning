import { test, expect, Locator } from '@playwright/test';

test.describe('dropdown Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page before each test
    await page.goto('URL');
  });

   test('Test Case Name', async ({ page }) => {
   
    

  });

   test.afterEach(async ({ page }) => {
     // Wait for 2 seconds
    await page.waitForTimeout(5000); });
}); 