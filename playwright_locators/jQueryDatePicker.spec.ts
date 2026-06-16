import { test, expect, Locator, Page } from '@playwright/test';

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



    test('JQuery DatePicker Using Fill Approach 1', async ({ page }) => {

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
            if (await currentMonth == month && await currentYear == year) break;
            await page.locator('.ui-datepicker-prev').click();
        }
        // ✅ Directly locate the cell that contains the date text
        const dateCell = page.locator(`.ui-datepicker-calendar td:has-text("${date}")`);

        // Ensure it’s visible and click
        await expect(dateCell).toBeVisible();
        await dateCell.click();

    });

    test.only('JQuery DatePicker Using calender Approach 2 using function past dates', async ({ page }) => {


        const dateInput: Locator = page.locator('#datepicker');
        expect(dateInput).toBeVisible();


        await dateInput.click(); //opens the date picker
        //select target date
        const year = '2023';
        const month = 'June';
        const date = '15';

        selectDate(year, month, date, page, false);

        const expectedDate = '06/15/2023'; //mm//dd//yyyy
        console.log(await dateInput.getAttribute('value'));
        //await expect(dateInput).toHaveValue(expectedDate);

    });

    test.only('JQuery DatePicker Using calender Approach 2 using function future dates', async ({ page }) => {
        const dateInput1: Locator = page.locator('#datepicker');
        expect(dateInput1).toBeVisible();


        await dateInput1.click(); //opens the date picker
        //select target date
        const year1 = '2027';
        const month1 = 'June';
        const date1 = '15';
        selectDate(year1, month1, date1, page, true);

        const expectedDate1 = '06/15/2027'; //mm//dd//yyyy
        console.log(await dateInput1.textContent());
        //await expect(dateInput1).toHaveValue(expectedDate);
    });

    async function selectDate(targetYear: string, targetMonth: string, targetDate: string, page: Page, isFuture: boolean) {
        while (true) {
            const currentMonth = await page.locator('.ui-datepicker-month').textContent();
            const currentYear = await page.locator('.ui-datepicker-year').textContent();
            //console.log(currentMonth, currentYear)
            if (currentMonth === targetMonth && currentYear === targetYear) {
                break;
            }
            if (isFuture) {
                await page.locator('.ui-datepicker-next').click(); // Future
            } else {
                await page.locator('.ui-datepicker-prev').click(); // Past
            }
        }
        const dateCell = page.locator(`.ui-datepicker-calendar td:has-text("${targetDate}")`);
        await expect(dateCell).toBeVisible();
        await dateCell.click();
    }

    async function clickIfVisible(locator: ReturnType<typeof page.locator>) {
        if (await locator.isVisible()) {
            await locator.click();
        }
    }


    test('Booking.com Date Picker Test - Check-in and Check-out', async ({ page }) => {
        await page.goto('https://www.booking.com/');
        //const dismissBtn = page.locator('button[aria-label="Dismiss sign in information."]');
        ßconst closeBtn = page.locator('button[aria-label="Dismiss sign in information."]');

        // Click only if visible
        if (await closeBtn.isVisible()) {
            await closeBtn.click();
            console.log('Popup closed successfully.');
        } else {
            console.log('Popup not displayed.');
        }


        //await clickIfVisible(page.locator('button:has-text("Dismiss sign in information.")'));


        // Click on the date picker field to open calendar
        await page.getByTestId('searchbox-dates-container').click();
        // ==== Check-in Date Selection ====
        let checkinYear: string = "2026";
        let checkinMonth: string = "June";
        let checkinDay: string = "20";
        // Navigate to the required check-in month and year
        while (true) {
            const checkInMonthYear = await page.locator("h3 [aria-live='polite']").nth(0).innerText();
            const currentMonth = checkInMonthYear.split(" ")[0];
            const currentYear = checkInMonthYear.split(" ")[1];
            if (currentMonth === checkinMonth && currentYear === checkinYear) {
                break;
            } else {
                await page.locator('button[aria-label="Next month"]').click();
            }
        }

        // Select the specific check-in date
        let allDates = await page.locator('table.b8fcb0c66a tbody').nth(0).locator('td').all();
        let checkinDateSelected = false;
        for (let date of allDates) {
            const dateText = await date.innerText();
            if (dateText === checkinDay) {
                await date.click();
                checkinDateSelected = true;
                break;
            }
        }
        // Assertion to confirm check-in date was selected
        expect(checkinDateSelected).toBeTruthy();

        // ==== Check-out Date Selection ====
        let checkoutYear: string = "2026";
        let checkoutMonth: string = "July";
        let checkoutDay: string = "25";

        // Navigate to the required check-out month and year
        while (true) {
            const checkOutMonthYear = await page.locator("h3 [aria-live='polite']").nth(1).innerText();
            const currentMonth = checkOutMonthYear.split(" ")[0];
            const currentYear = checkOutMonthYear.split(" ")[1];

            if (currentMonth === checkoutMonth && currentYear === checkoutYear) {
                break;
            } else {
                await page.locator('button[aria-label="Next month"]').click();
            }
        }

        // Select the specific check-out date
        allDates = await page.locator('table.b8fcb0c66a tbody').nth(1).locator('td').all();
        let checkoutDateSelected = false;

        for (let date of allDates) {
            const dateText = await date.innerText();
            if (dateText === checkoutDay) {
                await date.click();
                checkoutDateSelected = true;
                break;
            }
        }

        // Assertion to confirm check-out date was selected
        expect(checkoutDateSelected).toBeTruthy();
        await page.waitForTimeout(5000); // just to visually observe the result during test run (optional)
    });


    test.afterEach(async ({ page }) => {
        // Wait for 2 seconds
        await page.waitForTimeout(5000);
    });
}); 