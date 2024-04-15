import { test, expect, chromium } from '@playwright/test';

test('User message', async ({ page }) => {
  await page.goto('http://localhost:1234/');

  page.on('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.accept('TestUser');
  });

  await page.reload();

  await page.getByPlaceholder('Type your message...').click();
  await page.getByPlaceholder('Type your message...').fill('test message about smth');
  await page.getByPlaceholder('Type your message...').press('Enter');
  
  await expect(page.locator('[data-e2e="user-name"]')).toContainText('Me');
  await expect(page.locator('[data-e2e="user-msg"]')).toContainText('test message about smth');

  await page.close();
});


test('Second user message', async ({ page }) => {
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
    await expect(page.locator('#currentUser')).toContainText('TestUser');
  
    await page.getByPlaceholder('Type your message...').click();
    await page.getByPlaceholder('Type your message...').fill('my message');
    await page.getByPlaceholder('Type your message...').press('Enter');
  
    await expect(page.locator(':nth-match([data-e2e="user-name"], 1)')).toContainText('Me');
    await expect(page.locator(':nth-match([data-e2e="user-msg"], 1)')).toContainText('my message');
  
    await page.getByPlaceholder('Type your message...').click();
    await page.getByPlaceholder('Type your message...').fill('my second message');
    await page.getByPlaceholder('Type your message...').press('Enter');
  
    await expect(page.locator(':nth-match([data-e2e="user-name"], 2)')).toContainText('Me');
    await expect(page.locator(':nth-match([data-e2e="user-msg"], 2)')).toContainText('my second message');
  
    await expect(incognitoPage.locator(':nth-match([data-e2e="user-name"], 1)')).toContainText('TestUser');
    await expect(incognitoPage.locator(':nth-match([data-e2e="user-msg"], 1)')).toContainText('my message');
  
    await expect(incognitoPage.locator(':nth-match([data-e2e="user-name"], 2)')).toContainText('TestUser');
    await expect(incognitoPage.locator(':nth-match([data-e2e="user-msg"], 2)')).toContainText('my second message');
  
    await incognitoPage.getByPlaceholder('Type your message...').click();
    await incognitoPage.getByPlaceholder('Type your message...').fill('incognito user message');
    await incognitoPage.getByPlaceholder('Type your message...').press('Enter');
  
    await expect(incognitoPage.locator(':nth-match([data-e2e="user-name"], 3)')).toContainText('Me');
    await expect(incognitoPage.locator(':nth-match([data-e2e="user-msg"], 3)')).toContainText('incognito user message');
    
    await expect(page.locator(':nth-match([data-e2e="user-name"], 3)')).toContainText('IncognitoUser');
    await expect(page.locator(':nth-match([data-e2e="user-msg"], 3)')).toContainText('incognito user message');
  
    await page.close();
    await incognitoPage.close();
    await browser.close();
  });