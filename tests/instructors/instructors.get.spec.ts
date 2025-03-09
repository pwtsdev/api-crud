/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { expect, test } from '@fixtures/api.fixture';

test.describe('GET /instructors', () => {
  test('should return all instructors', async ({ request }) => {
    const response = await request.get('/instructors');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.length).toBeGreaterThanOrEqual(1);
  });

  test('should return instructor details when a valid ID is provided', async ({ request }) => {
    const instructorId = 'vflr';
    const response = await request.get(`/instructors/${instructorId}`);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    // name
    expect(responseBody).toHaveProperty('name');
    expect(responseBody.name).toBe('Ethan Harris');
    expect(responseBody.name.trim().length).toBeGreaterThanOrEqual(3);

    // email
    expect(responseBody).toHaveProperty('email');
    expect(responseBody.email).toBe('ethan.harris@example.com');

    // specialization
    expect(responseBody).toHaveProperty('specialization');
    expect(responseBody.specialization).toBe('JavaScript & Frontend');

    // bio
    expect(responseBody).toHaveProperty('bio');
    expect(responseBody.bio).toBe('Experienced JavaScript & Frontend expert and online instructor.');
  });
});
