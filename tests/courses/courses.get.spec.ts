/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { expect, test } from '@fixtures/api.fixture';
import { NOT_EMPTY_STRING, VALID_ID } from '@helpers/validators';

test.describe('GET /courses', () => {
  test('should return all courses', async ({ request }) => {
    const response = await request.get('/courses');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.length).toBeGreaterThanOrEqual(1);
  });

  test('should return course details when a valid ID is provided', async ({ request }) => {
    const courseId = 'txxg';
    const response = await request.get(`/courses/${courseId}`);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    // id
    expect(responseBody).toHaveProperty('id');
    expect(responseBody.id).toMatch(VALID_ID);

    // title
    expect(responseBody).toHaveProperty('title', 'Python Data Analysis');
    expect(responseBody.title).toMatch(NOT_EMPTY_STRING);

    // instructorId
    expect(responseBody).toHaveProperty('instructorId');
    expect(responseBody.instructorId).toMatch(VALID_ID);

    // duration
    expect(responseBody).toHaveProperty('duration', '10 weeks');
    expect(responseBody.duration).toMatch(NOT_EMPTY_STRING);

    // category
    expect(responseBody).toHaveProperty('category', 'Data Science');
    expect(responseBody.category).toMatch(NOT_EMPTY_STRING);

    // description
    expect(responseBody).toHaveProperty('description', 'Learn data analysis using Python and Pandas.');
    expect(responseBody.description).toMatch(NOT_EMPTY_STRING);
  });
});
