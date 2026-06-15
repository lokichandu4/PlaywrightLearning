import { test, expect, Locator } from '@playwright/test';

test.describe('dropdown Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the page before each test
        await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");
    });

    test(' Read data from all the table pages', async ({ page }) => {
        let hasmorepages = true;
        while (hasmorepages) {
            const table = page.locator("#example tbody");
            await table.scrollIntoViewIfNeeded();
            const rows = await table.locator("tr").all();
            for (let row of rows) {
                console.log(await row.innerText());
            }
            await page.waitForTimeout(2000);
            console.log();
            console.log('=================');
            const nextButton: Locator = page.locator("button[aria-label='Next']");
            const isDisabled = await nextButton.getAttribute('class'); // dt-paging-button disabled next
            (isDisabled?.includes('disabled')) ? hasmorepages = false : await nextButton.click()
        }

    });

    test.only("Filter the rows and check the rows count", async ({ page }) => {


        const dropdown: Locator = page.locator("#dt-length-0");
        await dropdown.scrollIntoViewIfNeeded();
        const rowsLocator = page.locator("#example tbody tr");

        // Values to test
        const pageSizes = ['10', '25', '50', '100'];
        for (const size of pageSizes) {

            await dropdown.selectOption({ label: size });

            // Wait for table to update
            await page.waitForTimeout(1000); // or use a smarter wait if table has a loader

            // Get all rows
            const rows = await rowsLocator.all();

            // Assert row count is less than or equal to selected size
            expect(rows.length).toBeLessThanOrEqual(parseInt(size, 10));

            console.log(`Verified row count <= ${size}, actual = ${rows.length}`);

        }
    })

    test('Search for Paul Byrd in DataTable', async ({ page }) => {

        // Step 2: Enter search term
        await page.fill('input[type="search"]', 'Paul Byrd');

        // Step 3: Wait for table update
        const rows = page.locator('#example tbody tr');

        // Step 4: Check if any row is visible
        const rowCount = await rows.count();

        if (rowCount > 0) {
            // Positive condition: Paul Byrd found
            const firstRowText = await rows.first().innerText();
            expect(firstRowText).toContain('Paul Byrd');
            console.log('✅ Paul Byrd found in table');
        } else {
            // Negative condition: No match
            const emptyMessage = await page.locator('#example tbody td').innerText();
            expect(emptyMessage).toContain('No matching records found');
            console.log('❌ Paul Byrd not found');
        }
    });

    test('Paginated table - select all rows across 4 pages', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Locator for table rows and pagination buttons
  const rowsLocator = page.locator('#productTable tbody tr');
  const paginationButtons = page.locator('#pagination li');
  //const paginationPages = page.locator('#pagination li');
  // Loop through first 4 pages
  for (let pageIndex = 0; pageIndex < await paginationButtons.count(); pageIndex++) {
    // Click page number (skip first iteration since page 1 is default)
    if (pageIndex > 0) {
      await paginationButtons.nth(pageIndex).click();
      await page.waitForTimeout(1000); // wait for table update
    }

    const rows = await rowsLocator.all();
    console.log(`Page ${pageIndex + 1} has ${rows.length} rows`);

    // Iterate each row and click the checkbox in the first column
    for (const row of rows) {
      const checkbox = row.locator('td input[type="checkbox"]');
      if (await checkbox.isVisible()) {
        await checkbox.check();
      }
    }
  }
});

    test.afterEach(async ({ page }) => {
        // Wait for 2 seconds
        await page.waitForTimeout(2000);
    });
});  