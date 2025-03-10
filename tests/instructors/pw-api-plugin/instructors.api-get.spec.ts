import { expect, test } from '@fixtures/api.fixture';
import { apiGet } from 'pw-api-plugin';

test.describe('apiGET /instructors', () => {
  test('should return all instructors', async ({ request, page }) => {
    const response = await apiGet({ request, page }, '/instructors');

    expect(response.status()).toBe(200);
  });

  test('should return instructor details when a valid ID is provided', async ({ request, page }) => {
    const instructorId = 'vflr';
    const response = await apiGet({ request, page }, `/instructors/${instructorId}`);

    expect(response.status()).toBe(200);
  });
});
