import { expect, test } from '@playwright/test';

test('smoke: homepage loads without error', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
}); 