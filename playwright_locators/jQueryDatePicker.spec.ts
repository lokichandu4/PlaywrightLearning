import { test, expect, Locator } from '@playwright/test';

test.describe('dropdown Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the page before each test
        await page.goto('https://testautomationpractice.blogspot.com/');
    });

    test('JQuery DatePicker Using Fill', async ({ page }) => {


        const dateInput: Locator = page.locator('#datepicker');
        expect(dateInput).toBeVisible();

        //Approach using fill() method
        await dateInput.fill("06/20/2025"); //mm/dd/yyyy I
        // Simulate pressing Enter
        await dateInput.press('Enter');


    });

    test('JQuery DatePicker Using calender Approach 1', async ({ page }) => {


        const dateInput: Locator = page.locator('#datepicker');
        expect(dateInput).toBeVisible();


        await dateInput.click(); //opens the date picker
        //select target date
        const year = '2023';
        const month = 'June';
        const date = '15';

        while (true) {

            const currentMonth = await page.locator('.ui-datepicker-month').textContent();
            const currentYear = await page.locator('.ui-datepicker-year').textContent();
            if (currentMonth === month && currentYear === year) {
                break;
            }
        }
        //Future
        //await page.locator('.ui-datepicker-next').click();
        //Past
        await page.locator('.ui-datepicker-prev').click();

        const allDates = await page.locator(".ui-datepicker-calendar td").all();

        for (let dt of allDates) {
            const dateText = await dt.innerText();
            if (dateText === date) {
                await dt.click()
                break;
            }
        }



    });

    test.only('JQuery DatePicker Using Fill Approach 2', async ({ page }) => {

        const dateInput: Locator = page.locator('#datepicker');
        expect(dateInput).toBeVisible();


        await dateInput.click(); //opens the date picker
        //select target date
        const year = '2025';
        const month = 'June';
        const date = '15';
        while (true) {
            const currentMonth = await page.locator('.ui-datepicker-month').textContent();
            const currentYear = await page.locator('.ui-datepicker-year').textContent();
            console.log(await currentMonth, " and ", await currentYear);
            if (await currentMonth == month && await currentYear==year) break;
            await page.locator('.ui-datepicker-prev').click();
        }
        // ✅ Directly locate the cell that contains the date text
        const dateCell = page.locator(`.ui-datepicker-calendar td:has-text("${date}")`);

        // Ensure it’s visible and click
        await expect(dateCell).toBeVisible();
        await dateCell.click();

    });

    test.afterEach(async ({ page }) => {
        // Wait for 2 seconds
        await page.waitForTimeout(5000);
    });
}); 