import { test, expect, Locator } from '@playwright/test';

test.describe('dropdown Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page before each test
    await page.goto('https://testautomationpractice.blogspot.com/');
  });

  test('Dynamic web table chrome cpu usage',  async ({ page }) => {
    const table: Locator = page.locator("table[id='taskTable'] tbody");
    const tableHeader: Locator = page.locator("table[id='taskTable'] thead tr th");
    await table.scrollIntoViewIfNeeded();
    await expect(table).toBeVisible();

    // Step 1: For Chrome process get value of CPU load.
    // Read each row to check Chrome presence
    // Step 2: Find the index of the "Price" column
    let cpuColIndex = -1;
    for (let i = 0; i < await tableHeader.count(); i++) {
      const headerText = (await tableHeader.nth(i).innerText()).trim();
      if (headerText.toUpperCase() === 'CPU (%)') {
        cpuColIndex = i;
        break;
      }
    }

    if (cpuColIndex === -1) {
      throw new Error('CPU column not found!');
    }else{
      console.log(`CPU Column found at column index: ${cpuColIndex}`);
    }

    // Step 3: Iterate rows and locate Chrome in the first column
    const rows = table.locator('tr');
    const rowCount = await rows.count();

    let chromeIndex = -1;
    for (let i = 0; i < rowCount; i++) {
      const firstColumnCell = await rows.nth(i).locator('td').nth(0).innerText();
       //console.log(`Row ${i} :  ${firstColumnCell}`);
      if (firstColumnCell.toLowerCase() === 'chrome') {
        chromeIndex = i;
        break;
      }
    }

    if (chromeIndex === -1) {
      console.log('Chrome not found in the first column!');
    } else {
      console.log(`Chrome found at row index: ${chromeIndex}`);
    }

    const chromeCPUPercentage = await rows.nth(chromeIndex).locator('td').nth(cpuColIndex).innerText(); 
    console.log('Chrome CPU Percentage = ',chromeCPUPercentage)

    //Step2: Compare it with value in the yellow label.
    let yellowboxtext: string=await page.locator(".chrome-cpu").innerText();
    console.log("Chrome CPU load from yellow box:", yellowboxtext);

    expect(yellowboxtext).toMatch(chromeCPUPercentage);

    //await expect(yellowboxtext).toContainText('Chrome');



  });


test('Dynamic web table chrome cpu usage - optimized', async ({ page }) => {
/*
Why this is better
• Robust header detection: finds CPU column by header text rather than hard-coded index.
• Accurate first-column lookup: checks the first td of each tbody row (no header row confusion).
• Reduced DOM calls: caches locators and uses .nth() only when needed.
• Resilient parsing: strips % and non-numeric characters before parseFloat.
• Clear error handling: logs or throws when CPU column or Chrome row is missing.
*/
  // Locate the table body and ensure it's visible
  const tableBody: Locator = page.locator("table#taskTable tbody");
  await expect(tableBody).toBeVisible({ timeout: 10000 });

  // Locate header cells and determine the CPU column index (zero-based)
  const headers = page.locator("table#taskTable thead tr th");
  const headerCount = await headers.count();
  let cpuColIndex = -1;
  for (let i = 0; i < headerCount; i++) {
    const text = (await headers.nth(i).innerText()).trim().toLowerCase();
    if (text === 'cpu (%)' || text === 'cpu' || text.includes('cpu')) {
      cpuColIndex = i;
      break;
    }
  }
  if (cpuColIndex === -1) {
    throw new Error('CPU column not found in table header');
  }
  console.log(`CPU column index: ${cpuColIndex}`);

  // Get all rows from tbody
  const rows = tableBody.locator('tr');
  const rowCount = await rows.count();
  if (rowCount === 0) {
    throw new Error('No rows found in table body');
  }

  // Find the row index where first column equals "Chrome" (case-insensitive)
  let chromeRowIndex = -1;
  for (let i = 0; i < rowCount; i++) {
    // first column cell
    const firstCell = rows.nth(i).locator('td').first();
    const cellText = (await firstCell.innerText()).trim().toLowerCase();
    if (cellText === 'chrome') {
      chromeRowIndex = i;
      break;
    }
  }

  if (chromeRowIndex === -1) {
    console.log('Chrome not found in the first column');
    return; // or throw if you want the test to fail
  }
  console.log(`Chrome found at row index (zero-based): ${chromeRowIndex}`);

  // Read CPU value from the found row using the cpuColIndex
  const cpuCell = rows.nth(chromeRowIndex).locator('td').nth(cpuColIndex);
  await expect(cpuCell).toBeVisible({ timeout: 5000 });

  let cpuText = (await cpuCell.innerText()).trim();
  // Normalize value: remove percent sign and any non-numeric characters, then parse
  cpuText = cpuText.replace('%', '').replace(/[^0-9.\-]/g, '').trim();
  const cpuValue = cpuText === '' ? NaN : parseFloat(cpuText);

  if (Number.isNaN(cpuValue)) {
    console.log('Unable to parse CPU value for Chrome:', await cpuCell.innerText());
  } else {
    console.log('Chrome CPU Percentage =', cpuValue);
    // Optional assertion example
    expect(cpuValue).toBeGreaterThanOrEqual(0);
  }
});

test('Dynamic web table chrome cpu usage - optimized and functionized', async ({ page }) => {
/*
Why this is better
• Robust header detection: finds CPU column by header text rather than hard-coded index.
• Accurate first-column lookup: checks the first td of each tbody row (no header row confusion).
• Reduced DOM calls: caches locators and uses .nth() only when needed.
• Resilient parsing: strips % and non-numeric characters before parseFloat.
• Clear error handling: logs or throws when CPU column or Chrome row is missing.
*/
  // Locate the table body and ensure it's visible
  const tableBody: Locator = page.locator("table#taskTable tbody");
  await expect(tableBody).toBeVisible({ timeout: 10000 });
  await tableBody.scrollIntoViewIfNeeded();
  // Locate header cells and determine the CPU column index (zero-based)
  const tableHeader = page.locator("table#taskTable thead tr th");

  // Use the generic function
  const cpuColIndex = await getColumnIndexByName(tableHeader, 'CPU (%)');
  if (cpuColIndex === -1) throw new Error('CPU column not found!');
  console.log(`CPU column index: ${cpuColIndex}`);

  // Get all rows from tbody
  const rows = tableBody.locator('tr');
  // const rowCount = await rows.count();
  // if (rowCount === 0) {
  //   throw new Error('No rows found in table body');
  // }

   // Use the generic function
    const chromeRowIndex = await getRowIndexByName(rows,"Chrome");
    if (chromeRowIndex === -1) throw new Error('Chrome row not found!');
    console.log(`Chrome row index: ${chromeRowIndex}`);

   
  
    //Step2: Compare it with value in the yellow label.
  let yellowboxtext: string=await page.locator(".chrome-cpu").innerText();
  console.log("Chrome CPU load from yellow box:", yellowboxtext);

  //const chromeCPUPercentage = await rows.nth(chromeRowIndex).locator('td').nth(cpuColIndex).innerText();
  const cpuText:string = await getCellValueByColumnName(rows,chromeRowIndex,cpuColIndex)
  console.log('Chrome CPU Percentage = ',cpuText)
  expect(yellowboxtext).toMatch(cpuText);

  // Use the generic function to find Memory Size column
  const memoryColIndex = await getColumnIndexByName(tableHeader, 'Memory (MB)');
  if (memoryColIndex === -1) throw new Error('Memory (MB) column not found!');
  console.log(`Memory (MB) column index: ${memoryColIndex}`);

   // Use the generic function to find Firefox Row
    const firefoxRowIndex = await getRowIndexByName(rows,"Firefox");
    if (firefoxRowIndex === -1) throw new Error('Firefox row not found!');
    console.log(`Chrome row index: ${firefoxRowIndex}`);

      //Step2: Compare it with value in the blue label.
  let blueboxtext: string=await page.locator(".firefox-memory").innerText();
  console.log("Firefox Memory from blue box:", blueboxtext);

  
  const memoryText:string = await getCellValueByColumnName(rows,firefoxRowIndex,memoryColIndex)
  console.log('Firefox Memory MB = ',memoryText)
  expect(blueboxtext).toMatch(memoryText);

    // Use the generic function to find Network speed column
  const networkColIndex = await getColumnIndexByName(tableHeader, 'Network (Mbps)');
  if (networkColIndex === -1) throw new Error('Network (Mbps) column not found!');
  console.log(`Network (Mbps) column index: ${networkColIndex}`);


     //Step2: Compare it with value in the blue label.
  let orangeboxtext: string=await page.locator(".chrome-network").innerText();
  console.log("Chrome Network speed from blue box:", orangeboxtext);

  const networkText:string = await getCellValueByColumnName(rows,chromeRowIndex,networkColIndex)
  console.log('Chrome Network (Mbps) = ',networkText)
  expect(orangeboxtext).toMatch(networkText);

    // Use the generic function to find Disk space of Firefox process column
  const diskColIndex = await getColumnIndexByName(tableHeader, 'Disk (MB/s)');
  if (diskColIndex === -1) throw new Error('Disk (MB/s) column not found!');
  console.log(`Disk (MB/s) column index: ${diskColIndex}`);

     //Step2: Compare it with value in the blue label.
  let viletboxtext: string=await page.locator(".firefox-disk").innerText();
  console.log("Disk space of Firefox process column:", viletboxtext);

  const diskText:string = await getCellValueByColumnName(rows,firefoxRowIndex,diskColIndex)
  console.log('Firefox Disk (MB/s) = ',diskText)
  expect(viletboxtext).toMatch(diskText);

  });

 async function getCellValueByColumnName( rows: Locator,rowIndex: number,columnIndex: number): Promise<string> {
  // Read CPU value from the found row using the cpuColIndex
  const cellVal = rows.nth(rowIndex).locator('td').nth(columnIndex);
  await expect(cellVal).toBeVisible({ timeout: 5000 });

  return (await cellVal.innerText()).trim();
  
}


async function getColumnIndexByName(headers: Locator, columnName: string): Promise<number> {
  const headerCount = await headers.count();
  for (let i = 0; i < headerCount; i++) {
    const text = (await headers.nth(i).innerText()).trim().toLowerCase();
    if (text === columnName.toLowerCase() || text.includes(columnName.toLowerCase())) {
      return i;
    }
  }
  return -1;
}


async function getRowIndexByName(rows:Locator, rowName :string ) : Promise<number> {
  // Find the row index where first column equals 
  const rowCount = await rows.count();
  let chromeRowIndex = -1;
  for (let i = 0; i < rowCount; i++) {
    // first column cell
    const firstCell = rows.nth(i).locator('td').first();
    const cellText = (await firstCell.innerText()).trim().toLowerCase();
    if (cellText.toLowerCase() ===  rowName.toLowerCase()) {
      return i;
    }
  }
  return -1;
}

  test.afterEach( async ({ page }) => {
    // Wait for 2 seconds
    await page.waitForTimeout(5000);
  });
});  