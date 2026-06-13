import { test, expect,Locator } from '@playwright/test';

/*
test('Handle Dynamic Elements using PW Locators', async ({ page }) => {
await page.goto('https://testautomationpractice.blogspot.com/');
// Loop to click the button 5 times
for (let i=1; i <= 3; i++) {
// Locate button by role and dynamic name
const button = page.getByRole('button', { name: /START|STOP/});
// Click the button
await button.click();
// Wait for 2 seconds
await page.waitForTimeout(2000);
}
});

*/

test('Text Input Actions', async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");
const textBox: Locator=page.locator('#name');
await expect(textBox).toBeVisible();
await expect(textBox).toBeEnabled();
const maxLength: string | null = await textBox.getAttribute("maxlength"); // Returns value of maxlength attribute of the el
expect (maxLength).toBe ('15');
var Fname:string = "John Canedy"
await textBox.fill(Fname);
console.log("text content of FirstName:", await textBox.textContent()); // returns empty as the value not in dom
var EnteredName :string = await textBox.inputValue();
expect(EnteredName).toBe(Fname);
console.log("text content of FirstName:", EnteredName); 

// Wait for 2 seconds
await page.waitForTimeout(2000);
});