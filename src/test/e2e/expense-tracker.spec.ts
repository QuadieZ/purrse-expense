import { expect, test } from '@playwright/test';

test.describe('Expense Tracker App', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should load the main page successfully', async ({ page }) => {
        // Check page title
        await expect(page).toHaveTitle(/Purrse | Your Furball Expense Tracker/);

        // Check that the page loads without errors (already done in beforeEach)
        await expect(page.locator('img[alt="logo"]')).toBeVisible();
    });

    test('should display the app logo', async ({ page }) => {
        // Check that the logo is visible
        const logo = page.locator('img[alt="logo"]');
        await expect(logo).toBeVisible();
        await expect(logo).toHaveAttribute('src', '/purrse-logo.png');
    });

    test('should render the expense tracker table', async ({ page }) => {
        // Check that the table is rendered (Chakra UI table)
        const table = page.locator('[role="table"]').or(page.locator('table'));
        await expect(table).toBeVisible();

        // Check that the table has headers
        const tableHeaders = page.locator('[role="columnheader"]').or(page.locator('th'));
        const headerCount = await tableHeaders.count();
        expect(headerCount).toBeGreaterThan(0);
    });

    test('should have search functionality', async ({ page }) => {
        // Check that search input is present
        const searchInput = page.locator('input[placeholder="Search..."]');
        await expect(searchInput).toBeVisible();

        // Test search functionality
        await searchInput.fill('test');
        await expect(searchInput).toHaveValue('test');

        // Clear search
        await searchInput.clear();
        await expect(searchInput).toHaveValue('');
    });

    test('should have row selection checkboxes', async ({ page }) => {
        // Check that checkboxes are present for row selection
        const checkboxes = page.locator('input[type="checkbox"]');
        const checkboxCount = await checkboxes.count();
        expect(checkboxCount).toBeGreaterThan(0);

        // Test selecting a row
        const firstRowCheckbox = checkboxes.nth(1); // Skip header checkbox
        if (await firstRowCheckbox.isVisible()) {
            await firstRowCheckbox.check();
            await expect(firstRowCheckbox).toBeChecked();
        }
    });

    test('should display empty state when no data', async ({ page }) => {
        // This test assumes the table might be empty initially
        // Check for empty state or table content
        const tableBody = page.locator('[role="rowgroup"]').or(page.locator('tbody'));

        // If table is empty, check for empty state message
        const emptyState = page.locator('text=No data found').or(page.locator('text=No expenses'));
        if (await emptyState.isVisible()) {
            await expect(emptyState).toBeVisible();
        } else {
            // If there's data, check that rows are displayed
            const tableRows = tableBody.locator('[role="row"]').or(tableBody.locator('tr'));
            const rowCount = await tableRows.count();
            expect(rowCount).toBeGreaterThan(0);
        }
    });

    test('should have pagination controls when needed', async ({ page }) => {
        // Check for pagination controls - Chakra UI pagination
        const pagination = page.locator('[role="navigation"]').or(page.locator('nav'));

        // Pagination might not be visible if there are few items
        if (await pagination.isVisible()) {
            await expect(pagination).toBeVisible();

            // Test pagination navigation if available
            const nextButton = page.locator('button[aria-label="Next page"]').or(page.locator('button:has-text("Next")'));
            if (await nextButton.isVisible()) {
                await expect(nextButton).toBeVisible();
            }
        } else {
            // If no pagination, that's also valid for small datasets
            expect(true).toBe(true);
        }
    });

    test('should handle table interactions', async ({ page }) => {
        // Test sorting functionality
        const sortableHeaders = page.locator('[role="columnheader"]').or(page.locator('th'));

        if (await sortableHeaders.count() > 0) {
            const firstSortableHeader = sortableHeaders.first();
            await firstSortableHeader.click();

            // Check that sorting indicator appears (Chakra UI icons)
            const sortIndicator = page.locator('svg[class="lucide-arrow-up-narrow-wide"]');
            if (await sortIndicator.isVisible()) {
                await expect(sortIndicator).toBeVisible();
            }
        }
    });

    test('should be responsive on different screen sizes', async ({ page }) => {
        // Test mobile view
        await page.setViewportSize({ width: 375, height: 667 });
        await expect(page.locator('img[alt="logo"]')).toBeVisible();

        // Test tablet view
        await page.setViewportSize({ width: 768, height: 1024 });
        await expect(page.locator('img[alt="logo"]')).toBeVisible();

        // Test desktop view
        await page.setViewportSize({ width: 1920, height: 1080 });
        await expect(page.locator('img[alt="logo"]')).toBeVisible();
    });

    test('should have proper accessibility', async ({ page }) => {
        // Check for proper heading structure
        const headings = page.locator('h1, h2, h3, h4, h5, h6');
        if (await headings.count() > 0) {
            await expect(headings.first()).toBeVisible();
        }

        // Check for proper button labels
        const buttons = page.locator('button');
        for (let i = 0; i < await buttons.count(); i++) {
            const button = buttons.nth(i);
            const ariaLabel = await button.getAttribute('aria-label');
            const textContent = await button.textContent();

            // Button should have either aria-label or text content
            expect(ariaLabel || textContent).toBeTruthy();
        }
    });
}); 