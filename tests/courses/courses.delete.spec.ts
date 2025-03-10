/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { expect, test } from '@fixtures/api.fixture';

test.describe('DELETE /courses/:id', () => {
  test('should create and delete a course successfully', async ({ request }) => {
    let courseId: string;

    const newCourse = {
      title: 'Introduction to JavaScript',
      instructorId: 'xyz789',
      duration: '8 weeks',
      category: 'Programming',
      description: 'A beginner-friendly JavaScript course.',
    };

    await test.step('Create a new course', async () => {
      const createResponse = await request.post('/courses', { data: newCourse });

      expect(createResponse.status()).toBe(201);

      const responseData = await createResponse.json();
      courseId = responseData.id;
    });

    await test.step('Delete the course', async () => {
      const deleteResponse = await request.delete(`/courses/${courseId}`);

      expect(deleteResponse.status()).toBe(200);
    });

    await test.step('Verify the deleted course', async () => {
      const getResponse = await request.get(`/courses/${courseId}`);

      expect(getResponse.status()).toBe(404);
    });
  });
});
