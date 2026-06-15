// Lab 3: BlazeDemo - Flight Booking Automation
// Step 1: Launch the Website
// * Navigate to https://blazedemo.com/
// Step 2: Select Departure and Destination
// * Select "Boston" as the departure city and "London" as the destination using the
// options.
// Step 3: Search for Flights
// * Click on the Find Flights button after selecting cities.
// Step 4: Capture Flight Prices
// * Locate the results table and extract flight prices.
// * Store all prices in an array and print the total number of available flights.
// Step 5: Identify the Lowest Price
// * Sort the array of prices and determine the flight with the lowest fare.
// Step 6: Choose the Cheapest Flight
// * Find the corresponding table row with the lowest price and click Choose This Flight.
// Step 7: Enter Passenger Information
// * Fill in the booking form with the following details:
//     * Name: John
//     * Address: 1403 American Beauty Ln
//     * City: Columbus
//     * State: OH
//     * Zip Code: 43240
//     * Credit Card Number: 6789 0673 4523 1267
//     * Credit Card Year: 2023
//     * Name on Card: John Canedy
// * Click the Purchase Flight button.
// Step 8: Confirm Purchase
// * Validate the success message: "Thank you for your purchase".
// * Print "Success !! Passed" if the message appears; otherwise, print "Failed".
// Subtitles/closed


import { test, expect, type Locator } from '@playwright/test';

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

test.describe('dropdown Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the page before each test
    });
test('BlazeDemo Flight Booking Automation', async ({ page }) => {
  // Step 1: Launch the Website
  await page.goto('https://blazedemo.com/');

  // Step 2: Select Departure and Destination
  await page.selectOption('select[name="fromPort"]', { label: 'Boston' });
  await page.selectOption('select[name="toPort"]', { label: 'London' });
  
  
  // Step 3: Search for Flights
  await page.click('input[type="submit"]');
  const tableHeaderRows = page.locator('table.table  thead tr th');
  // Step 4: Capture Flight Prices
  // Example: after searching flights, filter all cells with $
  const priceCells = page.locator("table.table tbody tr td:has-text('$')");
  const count = await priceCells.count();

  const prices: number[] = [];
  for (let i = 0; i < count; i++) {
    const text = (await priceCells.nth(i).innerText()).trim();
    const value = parseFloat(text.replace('$', '').trim());
    prices.push(value);
  }
  console.log('Prices', prices);
  console.log('Total flights available:', prices.length);
  // Step 5: Identify the Lowest Price
  const minPrice = Math.min(...prices);
  console.log('Lowest Price:', minPrice);


  // Step 6: Choose the Cheapest Flight
  const minIndex = prices.indexOf(minPrice);
  await page.locator('table.table tbody tr').nth(minIndex).locator('input[type="submit"]').click();
   await page.waitForTimeout(2000);
  // Step 7: Enter Passenger Information
  await page.fill('#inputName', 'John');
  await page.fill('#address', '1403 American Beauty Ln');
  await page.fill('#city', 'Columbus');
  await page.fill('#state', 'OH');
  await page.fill('#zipCode', '43240');
  await page.fill('#creditCardNumber', '6789 0673 4523 1267');
  await page.fill('#creditCardYear', '2023');
  await page.fill('#nameOnCard', 'John Canedy');

  await page.click('input[type="submit"]'); // Purchase Flight button

  // Step 8: Confirm Purchase
  const confirmationText = await page.locator('h1').innerText();
  if (confirmationText.includes('Thank you for your purchase')) {
    console.log('Success !! Passed');
  } else {
    console.log('Failed');
  }

  // Assertion for success
  expect(confirmationText).toContain('Thank you for your purchase');
 /* */
});

    test.afterEach(async ({ page }) => {
        // Wait for 2 seconds
        await page.waitForTimeout(6000);
    });
});  