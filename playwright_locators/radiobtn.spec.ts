import { test, expect, Locator } from '@playwright/test';

test.describe('Radio Button Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page before each test
    await page.goto('https://testautomationpractice.blogspot.com/');
  });

  test('should select a radio button', async ({ page }) => {
    
    const maleRadio:Locator =page.locator('#male'); // Male radio button
    await expect (maleRadio). toBeVisible();
    await expect (maleRadio). toBeEnabled();
    expect (await maleRadio.isChecked()).toBe (false);
    if((await maleRadio.isChecked())==false){
        await (maleRadio).check();
    }
    if((await maleRadio.isChecked())==true){
        await (maleRadio).uncheck();
    }
   
  });

  test('should verify radio button is checked', async ({ page }) => {
    const femaleRadio:Locator =page.locator('#female'); // FeMale radio button
     await (femaleRadio).check();
    console.log(await expect(femaleRadio).toBeChecked());

  });

   test('should handle checkbox box', async ({ page }) => {
        
        // 1. Select specific checkbox (Sunday) using getByLabel and assert
        const sundayCheckbox:Locator=page.getByLabel('Sunday');
        await sundayCheckbox.scrollIntoViewIfNeeded();
        await sundayCheckbox.check();
        await expect (sundayCheckbox).toBeChecked();

  });

  test('should handle multiple checkbox box', async ({ page }) => {
        
        // 1. Select specific checkbox (Sunday) using getByLabel and assert
       const days: string[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
       const days_loc:Locator [] = days.map(index =>page.getByLabel(index));
       for(const day of days_loc) { 
            await day.check();
            await expect(day).toBeChecked();
       }

  });

   test('should handle last 3 checkbox box', async ({ page }) => {
        
        // 1. Select specific checkbox (Sunday) using getByLabel and assert
       const days: string[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
       const days_loc:Locator [] = days.map(index =>page.getByLabel(index));
       for(const day of days_loc.slice(-3)) { 
            await day.check();
            await expect(day).toBeChecked();
       }
       for(const day of days_loc.slice(-3)) { 
            await day.uncheck();
            await expect(day).not.toBeChecked();
       }

  });

  test.only('should handle dynamic check box', async ({ page }) => {
    // 1. Select specific checkbox (Sunday) using getByLabel and assert
        var day :string = 'Monday';
        const sundayCheckbox:Locator=page.getByLabel(day);
        await sundayCheckbox.scrollIntoViewIfNeeded();
        await sundayCheckbox.check();
        await expect (sundayCheckbox).toBeChecked();  
    });

  test.afterEach(async ({ page }) => {
     // Wait for 2 seconds
    await page.waitForTimeout(2000); });
});
