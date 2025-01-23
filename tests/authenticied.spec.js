const { test, expect } = require("@playwright/test");

test.describe("Authentication Tests", () => {
    test.beforeEach(async ({ page }) => {
        // Clear cookies to reset authentication state
        await page.context().clearCookies();

        // Clear localStorage using addInitScript to avoid SecurityError
        await page.addInitScript(() => {
            localStorage.clear();
        });
    });

    test("should log in and navigate to the profile page if email is verified", async ({ page }) => {
        await page.goto("http://localhost:3000/user/signin");

        // Fill in the login form with valid credentials
        await page.fill("input[name=email]", "wasx123@interia.pl");
        await page.fill("input[name=password]", "wasx123321414");

        // Submit the form
        await page.click("button[type=submit]");

        // Check if redirected to the profile page
        await expect(page).toHaveURL("http://localhost:3000/user/profile");
    });
});
