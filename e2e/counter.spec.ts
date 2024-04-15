import { test, expect, chromium } from '@playwright/test';

test('Increasing users count', async ({ page }) => {
  const browser = await chromium.launch();
  const incognitoPage = await browser.newPage();

  await page.goto('http://localhost:1234/');

  page.on('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.accept('TestUser');
  });

  await page.reload();

  await incognitoPage.goto('http://localhost:1234/');

  incognitoPage.on('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.accept('TestUser');
  });

  await incognitoPage.reload();

  await expect(page.locator('#totalUsers')).toContainText('2');
  
  await incognitoPage.close();
  await page.close();
  await browser.close();
});

test('Decreasing users count', async ({ page }) => {
  const browser = await chromium.launch();
  const incognitoPage = await browser.newPage();

  await page.goto('http://localhost:1234/');

  page.on('dialog', async dialog => {
    await dialog.accept('TestUser');
  });

  await page.reload();

  await expect(page.locator('#totalUsers')).toContainText('1');

  await incognitoPage.goto('http://localhost:1234/');

  incognitoPage.on('dialog', async dialog => {
    await dialog.accept('IncognitoUser');
  });

  await incognitoPage.reload();
  
  await expect(page.locator('#totalUsers')).toContainText('2');

  await incognitoPage.close();

  await expect(page.locator('#totalUsers')).toContainText('1');

  await page.close();
  await browser.close();
});