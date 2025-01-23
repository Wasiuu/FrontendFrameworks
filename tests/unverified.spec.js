const { test, expect } = require('@playwright/test');

test("should redirect unverified users to verify page", async ({ page }) => {
    await page.goto("http://localhost:3000/user/signin");

    // Fill in the login form
    await page.fill("input[name=email]", "wasx321@interia.pl"); // Use a valid unverified email
    await page.fill("input[name=password]", "wasx123321414");

    // Submit the form
    await page.click("button[type=submit]");

    // Check if redirected to the verify page
    await expect(page).toHaveURL("http://localhost:3000/user/verify");
});
