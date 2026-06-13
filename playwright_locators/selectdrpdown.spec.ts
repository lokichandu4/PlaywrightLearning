import { test, expect, Locator } from '@playwright/test';

test.describe('dropdown Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page before each test
    await page.goto('https://testautomationpractice.blogspot.com/');
  });

   test('should verify select drop down visible text', async ({ page }) => {
   
    //1) select option from teh drop down (4 ways)
    await page.locator('#country').selectOption('India'); // visible text


  });

  test('should verify select drop down value', async ({ page }) => {
   await page.locator('#country').selectOption({value:'uk'}); // by using value attribute

  });

  test('should verify select drop down label', async ({ page }) => {
   
    await page.locator('#country').selectOption({label: 'India'}); // by using label
  });

  test('should verify select drop down index', async ({ page }) => {
   await page.locator('#country').selectOption({index:3}); // by using ind

  });

  test('check option count in select drop down', async ({ page }) => {
   const dropdowns:Locator= await page.locator('#country option');
    await expect(dropdowns).toHaveCount(10);

  });

  test('check option present in select drop down', async ({ page }) => {
    const dropdowns:Locator=  page.locator('#country option');
    const optionstext:string[] = (await dropdowns.allTextContents()).map(text => text.trim());
    expect(optionstext).toContain('India'); 
    console.log(optionstext)
  });

  test('should verify multi select drop down visible text', async ({ page }) => {
   
    //1) select option from teh drop down (4 ways)
   let multiselect:Locator =  await page.locator('#colors')
   await multiselect.scrollIntoViewIfNeeded();
   await multiselect.selectOption(['Red','Blue','Green']); // visible text
  });

  test('should verify multi select drop down value', async ({ page }) => {
   
    //1) select option from teh drop down (4 ways)
   let multiselect:Locator =  await page.locator('#colors')
   await multiselect.scrollIntoViewIfNeeded();
   await multiselect.selectOption(['yellow','red','white','green']); // visible text
  });

  test('check option count in multi select drop down', async ({ page }) => {
   const dropdowns:Locator= await page.locator('#colors option');
    await expect(dropdowns).toHaveCount(7);

  });

  test('check option present in multi select drop down', async ({ page }) => {
    const dropdowns:Locator=  page.locator('#colors option');
    const optionstext:string[] = (await dropdowns.allTextContents()).map(text => text.trim());
    expect(optionstext).toContain('Green'); 
    console.log(optionstext)
  });

  test('verify dropdown is sorted', async ({ page }) => {
    const dropdowns:Locator=  page.locator('#colors option');
    const optionstext:string[] = (await dropdowns.allTextContents()).map(text => text.trim());
    const originalList: string[]=[...optionstext];
    const sortedList:string[]=[...optionstext].sort();

    console.log("Original list:", originalList);
    console.log("Sorted list:", sortedList);

    expect(originalList).not.toEqual(sortedList);
    
  });

  test.only('verify dropdown has duplicates', async ({ page }) => {
    const dropdowns:Locator=  page.locator('#colors option');
    const options:string[] = (await dropdowns.allTextContents()).map(text => text.trim());
   
    
    // Check for duplicates
  const duplicates = options.filter((item, index) => options.indexOf(item) !== index);
// Assert no duplicates
  expect(duplicates.length).not.toBe(0);
    
  });


   test.afterEach(async ({ page }) => {
     // Wait for 2 seconds
    await page.waitForTimeout(5000); });
});