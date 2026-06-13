1 /*
3
1) page getByAltText) to locate an element, usually image, by its text alternative.
2) page-getByText) to locate by text content.
5
3) page getByRole() to locate by explicit and implicit accessibility attributes.
4) page getByLabel() to locate a form control by associated label's text.
5) page getByPlaceholder() to locate an input by placeholder.
8
6) page getByTitle() to locate an element by its title attribute.
7) page getByTestId() to locate an element based on its data-testid attribute (other attributes can be configur
10
11*/
import { test, expect,Locator } from '@playwright/test';

test('Playwright Locators strategy', async ({ page }) => {
  await page.goto('https://www.nopcommerce.com/en');

 

  
  // 1. page.getByAltText() - identifies images (and similar elements) based on the alt attribute.
// Use this locator when your element supports alt text such as img and area elements.
const logo: Locator= page.getByAltText("nopCommerce")
await expect (logo).toBeVisible(); 
await expect (logo).toBeEnabled(); 

// 2. page.getByText() - Find an element by the text it contains. You can match by a substring, exact string,
// Locate by visible text
// Use this locator to find non interactive elements like div, span, p, etc.
// For interactive elements like button, a, input, etc. use role locators.
/*
<p>welcome</p>
<div>hellow</div>
*/
const header: Locator= page.getByText("Free and open-source eCommerce platform"); //full string
await expect(header).toBeVisible();

const statsSubtext: Locator= page.getByText("worldwide"); //provided substring
await expect (statsSubtext).toBeVisible();


// 3. page.getByRole() - Locating by Role ( role is not an attribute)
/* Role locators include buttons, checkboxes, headings, links, lists, tables,
and many more and follow W3C specifications for ARIA role.
Prefer for interactive elements like buttons, checkboxes, links, lists, headings, tables, etc.
*/
/*
List of common HTML elements and their corresponding ARIA ro
HTML Element
ARIA Role
<a href="..."> = link
<area href="..."> = link
<button> = button
<form> (with name attribute) = form
<h1>, <h2>, <h3>, <h4>, <h5>, <h6>  = heading
< header> = banner (context-specific)
<img> (with alt) = img
<input type="button"> = button
<input type="checkbox"> = checkbox
<input type="email"> = textbox
<input type="password"> = textbox
<input type="radio"> = radio
<input type="range"> = slider
<input type="reset"> = button
<input type="search"> = searchbox
<input type="submit"> = button
<input type="text"> = textbox
<li> = listitem
<ol>, <ul> = list
<option> = option
<select> = listbox (or combobox, depends on usage)
<table> = table
<tbody>, <thead>, <tfoot> = rowgroup
<td> = cell
<th> = columnheader or rowheader
<textarea> = textbox
<tr> = row
*/

const link_view: Locator= page.getByRole('link', { name:'View all features'}); //
await link_view.isEnabled();

//const header_overview: Locator= page.getByRole('link', { name:'Overview'}); //
//await expect(header_overview).toBeVisible();

await page.goto('https://demoqa.com/text-box');

//  await expect(page.getByTitle('demosite')).toHaveText('demosite');

await page.getByPlaceholder('Full Name').fill('Jon')


//await page.getByLabel('Email').fill("John");

//await page.getByTestId('userName-label').fill("John");

await page.waitForTimeout(2000); // waits 2 seconds
});