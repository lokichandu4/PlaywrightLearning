
import { test, expect } from '@playwright/test';
const loginTestData: string[][] = [
    ["laura.taylor1234@example.com", "test123", "valid"],
    ["invaliduser@example.com", "test321", "invalid"],
    ["validuser@example.com", "testxyz", "invalid"],
    ["", "", "invalid"],
];

for (const [email, password, validaity] of loginTestData) {
    test.describe('Login data driven test', async () => {
        test(`Login test ${email}`, async ({ page }) => {
            await page.goto('https://demowebshop.tricentis.com/login');
            // Fill login form
            await page.locator('#Email').fill("abc@gmail.com");
            await page.locator('#Password').fill("test@123");
            await page.locator('input[value="Log in"]').click();

            if (validaity.toLowerCase() === 'valid') {
                // Assert logout link is visible - indicates successful login
                const logoutLink = page.locator('a[href="/logout"]');
                await expect(logoutLink).toBeVisible({ timeout: 5000 });
            } else {
                // Assert error message is visible
                const errorMessage = page.locator('.validation-summary-errors');
                await expect(errorMessage).toBeVisible({ timeout: 5000 });
                // Assert user is still on the login page
                await expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
            }
        })
    })
}

