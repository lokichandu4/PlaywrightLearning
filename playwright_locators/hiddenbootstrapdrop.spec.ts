import { test, expect, Locator } from '@playwright/test';

test.describe('dropdown Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Step 1: Navigate to login page
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  });

    test('Login and verify Employee Information in PIM', async ({ page }) => {
        
        
        // Step 2: Enter credentials and login
        await page.fill('input[name="username"]', 'Admin');
        await page.fill('input[name="password"]', 'admin123');
        await page.click('button[type="submit"]');

        // Step 3: Navigate to PIM menu
        await page.locator('a[href="/web/index.php/pim/viewPimModule"]').click();

        // Step 4: Wait for Employee Information label to be visible

        const employeeInfoLabel: Locator= page.getByRole('heading', { name:'Employee Information'});
        await expect(employeeInfoLabel).toBeVisible();
       
        // Step 5: Expand Employee Information section
        const expandButton = page.locator('.oxd-table-filter-header button:has(.oxd-icon.bi-caret-down-fill)');
        (await expandButton.isVisible()) && await expandButton.click(); 
        //console.log('Employee Information expanded.');
       
        /* 
        const expandUpButton = page.locator('.oxd-table-filter-header button:has(.oxd-icon.bi-caret-up-fill)');
        (await expandUpButton.isVisible()) && await expandUpButton.click(); 
        */

        
        // Get all the suggested options --> Ctrl+Shift+P on DOM -->emulate focused page
        // Step 5: Collect dropdown contents
      
        var employmentStatusDrpDown :Locator = page.locator('.oxd-input-field-bottom-space:has(label:has-text("Employment Status"))'); 
        console.log(await employmentStatusDrpDown.innerText());
        //console.log(await employmentStatusDrpDown.allTextContents());
        await employmentStatusDrpDown.click();

        await page.waitForTimeout(2000);
        // Locate all options under Employment Status dropdown
        var employmentStatusOptions: Locator = page.locator("div[role='listbox'] span");

        
        // Step 6: Print results
        console.log('Employment Status:', await employmentStatusOptions.allTextContents());
        console.log('Employment Status: count ', await employmentStatusOptions.count());

        await employmentStatusOptions.filter({ hasText: 'Full-Time Permanent' }).first().click();

        var includeDrpDown :Locator = page.locator('.oxd-input-field-bottom-space:has(label:has-text("Include"))'); 
        await includeDrpDown.click();
        await page.waitForTimeout(2000);
        var includeDrpDownOptions: Locator = page.locator("div[role='listbox'] span");
        console.log('includeDrpDown Status:', await includeDrpDownOptions.allTextContents());

        await includeDrpDownOptions.filter({ hasText: 'Current and Past Employees' }).first().click();


         var jobTitleDrpDown :Locator = page.locator('.oxd-input-field-bottom-space:has(label:has-text("Job Title"))'); 
        await jobTitleDrpDown.click();
        await page.waitForTimeout(2000);
        var jobTitleDrpDownOptions: Locator = page.locator("div[role='listbox'] span");
        console.log('jobTitleDrpDown Status:', await jobTitleDrpDownOptions.allTextContents());

        await jobTitleDrpDownOptions.filter({ hasText: 'HR Manager' }).first().click();



});

test.afterEach(async ({ page }) => {
     // Wait for 2 seconds
    console.log('inside after each') 
    await page.waitForTimeout(5000); });
});