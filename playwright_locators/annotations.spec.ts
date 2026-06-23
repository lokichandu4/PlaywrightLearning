
/*
only
skip
fail
fixme
slow
*/

import { test, expect } from '@playwright/test';

test('test1', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await expect(page).toHaveTitle('Google');
});

test('test2', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await expect(page).toHaveTitle('Google');
});

test.skip('test3', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await expect(page).toHaveTitle('Google');
});


//skip -based on teh condition
test('test5', async ({ page, browserName}) => {
  test.skip(browserName==='firefox', 'this test skipped if browser is firfox');
  await page.goto('https://www.google.com/');
  await expect(page).toHaveTitle('Google');
});

//fail
test.fail('test4', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await expect(page).toHaveTitle('Google');
});


//fail
test.fixme('test6', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await expect(page).toHaveTitle('Google');
});


//slow
test('test7', async ({ page }) => {

test.slow(); // triple the default timeout (default: 30 secs, after tripling: 90 secs)
await page.goto('https://www.google.com/');
await expect(page).toHaveTitle('Google');
});