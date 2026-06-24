import { test, expect } from "@playwright/test";

test.describe("HomeView", () => {
    
    test.beforeEach( async ({ page }) => {
        await page.goto("/");
    });

    // FEATURED

    test("Show 'Loading...' message", async ({ page }) => {
        await expect(page.getByText("Loading...")).toBeVisible();
    })

    test("Show .featured-card when page is loaded", async ({ page }) => {
        await expect(page.locator(".featured-card")).toBeVisible({ timeout: 15000 });
    });

    test("Show title of anime", async ({ page }) => {
        await expect(page.locator(".featured-anime-title")).not.toBeEmpty({ timeout: 10000 });
    });

    test("Show the badge 'Anime of the week'", async ({ page }) => {
        await expect(page.getByText("Anime of the week")).toBeVisible({ timeout: 10000 })
    });

    // GALLERY

    test("Show the title 'Animes'", async ({ page }) => {
        await expect(page.getByText('Animes')).toBeVisible()
    });

    test("Show the cards of products", async ({ page }) => {
        await expect(page.locator(".products_grid .product-card").first())
            .toBeVisible({ timeout: 10000 });
    });

    test("Show more than 1 product card", async ({ page }) => {
        await page.waitForSelector(".products_grid .product-card", { timeout: 10000 });
        const cards = page.locator(".products_grid .product-card");
        expect(await cards.count()).toBeGreaterThan(1);
    });

    // FILTERS

    test("Show the search field", async ({ page }) => {
        await expect(page.locator(".search_field")).toBeVisible();
    });

    test("Show the filter controls", async ({ page }) => {
        await expect(page.locator(".filter_controls")).toBeVisible({ timeout: 10000 })
    });

    // PAGINATION

    test("Show pagination after the loading", async ({ page }) => {
        await expect(page.locator(".pag_container")).toBeVisible({ timeout: 10000 });
    });

    test("Pagination has page buttons", async ({ page }) => {
        await page.waitForSelector(".pag_page", { timeout: 10000 });
        const pages = page.locator(".pag_page");
        expect(await pages.count()).toBeGreaterThan(0);
    });

    // USABILITY

    test("Click on product card redirects to Details Page", async ({ page }) => {
        await page.waitForSelector(".product-card", { timeout: 15000 });
        await page.locator(".product-card").first().click();
        await expect(page).toHaveURL(/\/detail\/\d+/);
    });

    test("Search does filter on products cards", async ({ page }) => {
        await page.waitForSelector(".product-card", { timeout: 15000 })
        const beforeCount = await page.locator(".product-card").count();

        await page.locator(".search_field input").fill("Naruto");
        await page.waitForTimeout(300);

        const afterCount = await page.locator(".product-card").count();
        await expect(afterCount).toBeLessThan(beforeCount);
    });

    test("Next page of pagination works good", async ({ page }) => {
        await page.waitForSelector(".pag_arrows", { timeout: 15000 });
        const arrows = page.locator(".pag_arrows");
        const nextPage = arrows.last();

        // check for button not to be disabled
        await expect(nextPage).not.toHaveClass(/disabled/);
        await nextPage.click();

        // first page is not active anymore
        await expect(page.locator(".pag_page.active").first()).not.toHaveText("1");
    });

});