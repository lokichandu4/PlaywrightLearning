
import { test, expect } from '@playwright/test';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

const csvPath = 'playwright_locators/testdata/data.csv';
const fileContent = fs.readFileSync(csvPath, 'utf-8');
const records = parse(fileContent, {
  columns: true,
  skip_empty_lines: true,
});

test.describe('Login data driven test', () => {
  for (const data of records) {
    test(`Login test with email: "${data.email}" and password: "${data.password}"`, async ({ page }) => {
      await page.goto('https://demowebshop.tricentis.com/login');
      await page.locator('#Email').fill(data.email);
      await page.locator('#Password').fill(data.password);
      await page.locator('input[value="Log in"]').click();

      if (data.validity.toLowerCase() === 'valid') {
        const logoutLink = page.locator('a[href="/logout"]');
        await expect(logoutLink).toBeVisible({ timeout: 5000 });
      } else {
        const errorMessage = page.locator('.validation-summary-errors');
        await expect(errorMessage).toBeVisible({ timeout: 5000 });
        await expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
      }
    });
  }
});