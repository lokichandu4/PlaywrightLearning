import { test, expect, Locator } from '@playwright/test';

test.describe('dropdown Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the page before each test
        await page.goto('https://www.flipkart.com/');
    });

    test('Auto suggest dropdown', async ({ page }) => {
        await page.waitForTimeout(2000);

        
        const button = page.locator("div[tabindex='-1'] div span[role='button']");
        (await button.isVisible()) && await button.click();    
        
        
        await page.locator("input[name='q']").first().fill("smart"); // Search text
        await page.waitForTimeout(2000);

       // Get all the suggested options --> Ctrl+Shift+P on DOM -->emulate focused page
        const options: Locator=page.locator("form[method='GET'] ul li");
        const count=await options.count();
        console.log("Number of suggested options:", count); //8
        console.log("Number of suggested items :", await options.allTextContents()); //8
        //console.log("----------")
        //console.log("Number of suggested items :", await options.allInnerTexts()); //
        // printing all the suggested options in the console
        console.log("5 th option:", await options.nth(5).innerText());
        console.log("Printing all teh auto suggestions.....")
        for(let i=0;i<count;i++)
        {
            console.log(await options.nth(i).innerText());
        }
        await options.filter({ hasText: 'smartphone' }).first().click();



    });

    test.afterEach(async ({ page }) => {
     // Wait for 2 seconds
    await page.waitForTimeout(3000); });
});