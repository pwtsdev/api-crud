/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { expect, test } from '@fixtures/api.fixture';
import { VALID_ID } from '@helpers/validators';

test.describe('POST /courses', () => {
  test('should create a new course successfully', async ({ request }) => {
    const newCourse = {
      title: 'Python Data Analysis',
      instructorId: 'qdk1',
      duration: '10 weeks',
      category: 'Data Science',
      description: 'Learn data analysis using Python and Pandas.',
    };

    const response = await request.post('/courses', {
      data: newCourse,
    });

    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    expect(responseBody.id).toMatch(VALID_ID);
    expect(responseBody.title).toBe(newCourse.title);
    expect(responseBody.instructorId).toBe(newCourse.instructorId);
    expect(responseBody.duration).toBe(newCourse.duration);
    expect(responseBody.category).toBe(newCourse.category);
    expect(responseBody.description).toBe(newCourse.description);
  });
});
