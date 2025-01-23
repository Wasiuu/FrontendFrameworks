const { test, expect } = require('@playwright/test');

test('has link to login page', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // Click the "Log in" link
    await page.click("text=Log in");

    // Verify the URL of the login page
    await expect(page).toHaveURL('http://localhost:3000/user/signin');

    // Verify the header text
    await expect(page.getByRole('heading', { name: 'Logowanie' })).toContainText('Logowanie');
});
