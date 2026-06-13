import { test, expect,Locator } from '@playwright/test';

test('Xapth Locators strategy', async ({ page }) => {

    await page.goto("https://demowebshop.tricentis.com/") ;

    await page.waitForTimeout(2000); // waits 2 seconds
    //1. Absolute xpath - logo
    const absolutelogo: Locator=page.locator("/html/body/div[4]/div[1]/div[1]/div[1]/a/img");
    //await expect (absolutelogo).toBeVisible();
    //2. Relative xpath - logo
    const relativelogo:Locator =page.locator("//img[@alt='Tricentis Demo Web Shop' ]");
    await expect (relativelogo).toBeVisible();

    //3. contains ()
    const products: Locator=page.locator("//h2/a[contains(@href, 'computer')]");
    const productsCount: number= await products.count();
    expect (productsCount). toBeGreaterThan(0);

    console. log("First computer related product:", await products.first(). textContent ()) ;
    console.log("Last computer related product:", await products.last(). textContent ()) ;
    console.log("Nth computer related product:", await products.nth (1). textContent ()) ;

    let productTitles:string[]=await products.allTextContents(); // getting all the matched products in to an array
    for (let pt of productTitles)
        console.log(pt);

    const buildignProducts:Locator = page.locator("//h2/a[starts-with(@href,'/build')]"); // returns multiple elements
    const count : number = await buildignProducts.count();
    expect(count).toBeGreaterThan(0);
    console.log('count ',count)

    //5. text()..
    const reglink: Locator=page.locator("//a[text()='Register']");
    await expect (reglink).toBeVisible();

        //6. last()
    const lastitem: Locator=page.locator("//div[@class='column follow-us']//li[last()]");
    await expect(lastitem).toBeVisible(); 
    //7. position()
    const positionitem: Locator=page.locator("//div[@class='column follow-us']//li[position()=1]"); ///position starts from 1
    await expect (positionitem).toBeVisible();

    const positionitem5: Locator=page.locator("//div[@class='column follow-us']//li[position()=5]"); ///position starts from 1
    console.log(await (positionitem5).textContent());
        
    await page.goto('https://testautomationpractice.blogspot.com/');

        // Loop to click the button 5 times
    //for (let i=1; i <= 1; i++) {

        let button0: Locator = page.locator('//button [text()="STOP" or text()="START"]'); // Locate the button with either 'STOP' ο
        await button0.click();
        console.log(await (button0).textContent());

        let button2 =  page.locator('//button[@name="start" or @name="stop"]');
        await button2.click();
        console.log(await (button2).textContent());

        let button1:Locator =  page.locator('//button[@name="start"]');
        console.log(await (button1).textContent());
        await button1.click();
        

        let button3 =  page.locator('//button [contains (@name,"st")]');
        await button3.click();
        console.log(await (button3).textContent());

        let button4 =  page.locator('//button [starts-with(@name, "st")]');
        await button4.click();
        console.log(await (button4).textContent());
        
    //}

 });   
    /*
  test('should find element by exact text', async ({ page }) => {
    await page.goto('https://example.com');
    const element = page.locator("//button[text()='Submit']");
    await expect(element).toBeVisible();
  });

  
  test('should find element by partial text', async ({ page }) => {
    await page.goto('https://example.com');
    const element = page.locator("//div[contains(text(), 'Welcome')]");
    await expect(element).toBeVisible();
  });

  test('should find element by attribute', async ({ page }) => {
    await page.goto('https://example.com');
    const element = page.locator("//input[@type='email']");
    await expect(element).toBeVisible();
  });

  test('should find element by multiple attributes', async ({ page }) => {
    await page.goto('https://example.com');
    const element = page.locator("//input[@type='password'][@name='pwd']");
    await expect(element).toBeVisible();
  });

  test('should find parent element', async ({ page }) => {
    await page.goto('https://example.com');
    const element = page.locator("//button[@id='submit']/parent::form");
    await expect(element).toBeVisible();
  });

  test('should find sibling element', async ({ page }) => {
    await page.goto('https://example.com');
    const element = page.locator("//label[@for='email']/following-sibling::input");
    await expect(element).toBeVisible();
  });

  test('should find nth element', async ({ page }) => {
    await page.goto('https://example.com');
    const element = page.locator("(//button)[1]");
    await expect(element).toBeVisible();
  });

  test('should use starts-with function', async ({ page }) => {
    await page.goto('https://example.com');
    const element = page.locator("//input[starts-with(@id, 'field-')]");
    await expect(element).toBeVisible();
  });
  */
  

