/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { expect, test } from '@fixtures/api.fixture';
import { NOT_EMPTY_STRING, VALID_EMAIL, VALID_ID } from '@helpers/validators';

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
    expect(responseBody).toHaveProperty('name', 'Ethan Harris');
    expect(responseBody.name).toMatch(NOT_EMPTY_STRING);

    // email
    expect(responseBody).toHaveProperty('email', 'ethan.harris@example.com');
    expect(responseBody.email).toMatch(VALID_EMAIL);

    // specialization
    expect(responseBody).toHaveProperty('specialization', 'JavaScript & Frontend');
    expect(responseBody.name).toMatch(NOT_EMPTY_STRING);

    // bio
    expect(responseBody).toHaveProperty('bio', 'Experienced JavaScript & Frontend expert and online instructor.');
    expect(responseBody.name).toMatch(NOT_EMPTY_STRING);
  });

  test('should return 404 when instructor ID does not exist', async ({ request }) => {
    const instructorId = 'xxxx';
    const response = await request.get(`/instructors/${instructorId}`);

    expect(response.status()).toBe(404);
  });

  test('should return limited number of instructors when _limit is set', async ({ request }) => {
    const response = await request.get('/instructors', {
      params: {
        _limit: '3',
      },
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.length).toBe(3);

    for (const instructor of responseBody) {
      expect(instructor).toHaveProperty('name');
      expect(instructor.name).toMatch(NOT_EMPTY_STRING);
    }
  });

  test('should return valid ID format for all instructors', async ({ request }) => {
    const response = await request.get('/instructors');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    const ids = responseBody.map((instructor: { id: string }) => instructor.id);
    ids.forEach((id: string) => {
      expect(id).toMatch(VALID_ID);
    });
  });
});
