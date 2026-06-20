//npx palywright codegen

//npx palywright codegen -o codegenttestgen.spec.ts
//npx palywright codegen --output codegenttestgen.spec.ts
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.locator('#loginusername').fill('pavanol');
  await page.locator('#loginpassword').fill('test@123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Log out' }).click();
});
