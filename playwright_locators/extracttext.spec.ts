import { test, expect, Locator } from '@playwright/test';

test.describe('dropdown Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page before each test
    await page.goto('https://demowebshop.tricentis.com/');
  });

   test('Extract text innertext vs textContent', async ({ page }) => {
   
            
        
        const products: Locator=page.locator('.product-title');
        //1) innerText() Vs textContent()
        //extract plain text
        console.log(await products.nth (1).innerText()); //14.1-inch Laptop
        //extract text , white spaces ., etc
        console.log(await products.nth(1).textContent());

        console.log(await products.allInnerTexts());

        console.log(await products.allTextContents());

        //3) all() converts Locator----> Locator[]
        const productsLocators: Locator[]= await products.all();
        console.log(productsLocators);
        console.log(await productsLocators [1].innerText());

  });

   test.afterEach(async ({ page }) => {
     // Wait for 2 seconds
    await page.waitForTimeout(5000); });
});  