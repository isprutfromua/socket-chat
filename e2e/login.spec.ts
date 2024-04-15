import { test, expect } from '@playwright/test';

test('User login', async ({ page }) => {
  await page.goto('http://localhost:1234/');

  page.on('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.accept('TestUser');
  });

  await page.reload();

  await expect(page.locator('#currentUser')).toContainText('TestUser');
  await expect(page.locator('#totalUsers')).toContainText('1');
  await page.close();
});