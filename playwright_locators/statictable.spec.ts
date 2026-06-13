import { test, expect, Locator } from '@playwright/test';

test.describe('dropdown Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page before each test
    await page.goto('https://testautomationpractice.blogspot.com/');
  });

   test('Static web table', async ({ page }) => {
   
        const table: Locator= page.locator("table[name='BookTable'] tbody");
        await table.scrollIntoViewIfNeeded();
        await expect (table).toBeVisible();

        //1) count number of rows in a table
        const rows: Locator=table.locator("tr"); //returns all the rows including header
        const rowCount : number=await rows.count();
        await expect(rows).toHaveCount(rowCount); //approach 1

        
        console.log("Number of rows in a table: ", rowCount);
        expect(rowCount).toBe (7); // appraoch 2

        const columns: Locator=table.locator("th"); //returns all the rows including header
         const columnsCount : number=await columns.count();
        await expect(columns).toHaveCount(columnsCount); //approach 1

        
        console.log("Number of columns in a table: ", columnsCount);
        expect(columnsCount).toBe(4); // appraoch 2

        const count = await rows.count();
        for (let i = 1; i < count; i++) { // skip header row
            const cells = rows.nth(i).locator('td');
            const cellTexts = await cells.allInnerTexts();
            console.log(cellTexts.join(' | '));
        }

        console.log("print table content")
        
        for(const row of await rows.all()) {
            console.log(await row.innerText())
        }

                
        for(let row of (await (rows.all())).slice(1)) // slice(1) --> skip header row
        {
        const cols=await row.locator('td').allInnerTexts();
        console.log(cols);
        }


        // 3) Read all data from 2nd row (index 2 means 3rd row including header)
        const secondRowCells: Locator=rows.nth(2).locator('td');
        const secondRowTexts: string[]=await secondRowCells.allInnerTexts();
        console.log("2nd Row data: ", secondRowTexts); //[ 'Learn Java', 'Mukesh', 'Java', '500']
        await expect(secondRowCells).toHaveText([ 'Learn Java', 'Mukesh', 'Java', '500']);

        // 5) Print book names where author is Mukesh
        console.log("Books written by Mukesh.......")
        
        const mukeshBooks:string[]=[];

        for(let row of (await (rows.all())).slice(1)) // slice(1) --> skip header row
        {
        const cells=await row.locator('td').allInnerTexts();
        const author=cells[1];
        const book=cells[0];

        if(author === 'Mukesh')
        {
        console.log(`${author} \t ${book}`)
         mukeshBooks.push(book)
        }
        }

        expect(mukeshBooks).toHaveLength(2); //Assertion

        let total = 0;

        for (let i = 1; i < rowCount; i++) { // start from 1 to skip header
            const cells = rows.nth(i).locator('td');
            const priceText = await cells.nth(3).innerText(); // 4th column = Price
            const price = parseInt(priceText.trim(), 10);
            total += price;
        }

        // Step 3: Print the total sum
        console.log('Total sum of all book prices:', total);

        // Optional: Assert the sum is correct (7100)
        expect(total).toBe(7100);

  });

  test('Calculate sum of book prices using column name', async ({ page }) => {
  

  // Step 1: Locate all headers
  const headers = page.locator('#HTML1 table th');
  const headerCount = await headers.count();

  // Step 2: Find the index of the "Price" column
  let priceColIndex = -1;
  for (let i = 0; i < headerCount; i++) {
    const headerText = (await headers.nth(i).innerText()).trim();
    if (headerText.toLowerCase() === 'price') {
      priceColIndex = i;
      break;
    }
  }

  if (priceColIndex === -1) {
    throw new Error('Price column not found!');
  }

  // Step 3: Iterate rows and sum the Price column
  const rows = page.locator('#HTML1 table tr');
  const rowCount = await rows.count();
  let total = 0;

  for (let i = 1; i < rowCount; i++) { // skip header row
    const cells = rows.nth(i).locator('td');
    const priceText = await cells.nth(priceColIndex).innerText();
    total += parseInt(priceText.trim(), 10);
  }

  console.log('Total sum of all book prices:', total);
});

   test.afterEach(async ({ page }) => {
     // Wait for 2 seconds
    await page.waitForTimeout(2000); });
});  