import { test, expect } from '@playwright/test';

import { setupPolly } from '../../polly';

const TestIds = {
  list: 'list-note',
	item: 'list-note-item'
};

test.describe('View Notes', () => {
  test('displays a list of cards', async ({ page }) => {
    const polly = setupPolly(page, 'notes/view-list');

    await page.goto('/');

    await expect(page.getByTestId(TestIds.list)).toBeVisible();

    const cards = await page.getByTestId(TestIds.item);

    expect(cards).toHaveCount(5);

    await polly.stop();
  });
});
