// Verity Product Sorting and Information Retrieval
// 1. Navigate to the Webpage:
// Open the URL https://www.bstackdemo.com/
// 2. Interact with the "Order by" Dropdown:
// Locate the "Order by" dropdown element.
// Verify the dropdown is displayed and enabled.
// Select the option "Lowest to highest" from the dropdown.
// 3. Retrieve and Print Product Information:
// Retrieve the list of product price elements.
// Retrieve the list of product name elements.
// Verify Product names and their prices count are equal.
// Print each product name along with its corresponding price in the console.
// 4. Identify and Print the Lowest Priced Product:
// Access the first element of the product prices list and the first element of the
// product names list.
// Print the lowest priced product name and its price in the console.
// 5. Identify and Print the Highest Priced Product:
// Access the last element of the product prices list and the last element of the
// product names list.
// Print the highest priced product name and its price in the console.

import { test, expect, Locator } from '@playwright/test';

test.describe('dropdown Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page before each test
    await page.goto('https://www.bstackdemo.com/');
  });


    test.only('Verity Product Sorting and Information Retrieval', async ({ page }) => {
    
        const dropdown = page.locator('select');
        await (dropdown).isVisible();
        await (dropdown).isEnabled();

        // Step 2: Interact with the "Order by" Dropdown: Lowest to highest 
        await dropdown.selectOption({ label: 'Lowest to highest' });
        
        await page.waitForTimeout(500);

        const prices = await page.$$eval('.shelf-item__price .val ', els =>
             els.map(e => parseFloat(e.textContent?.replace('$', '').trim() || '0'))  );

        console.log("Product Prices = ",prices)    

        // Step 3: Retrieve the list of product name elements
        const names = await page.$$eval('.shelf-item__title', els =>
            els.map(e => e.textContent?.trim() || '')
        );
        console.log("Product Names = ",names)  
        // Step 4: Verify Product names and their prices count are equal
        expect(names.length).toBe(prices.length);

       // Step 5: Print product names with their prices
        names.forEach((name, i) => {
        console.log(`${name} - ${prices[i]}`);});
       
        // Step 4: Find the lowest price and its index
        const minPrice = Math.min(...prices);
        const minIndex = prices.indexOf(minPrice);

        // Step 5: Print the lowest priced product name and its price
        console.log(`Lowest priced product: ${names[minIndex]} - $${minPrice}`);
        console.log(`Lowest priced product: ${names[0]} - ${prices[0]}`);


        // Step 6: Find the highest price and its index
        const maxPrice = Math.max(...prices);
        const maxIndex = prices.indexOf(maxPrice);        

        // Step 7: Print the highest priced product name and its price
        console.log(`Highest priced product: ${names[maxIndex]} - $${maxPrice}`);
        console.log(`Lowest priced product: ${names[names.length-1]} - ${prices[prices.length-1]}`);
    });  
  



   test.afterEach(async ({ page }) => {
     // Wait for 2 seconds
    await page.waitForTimeout(5000); });
});