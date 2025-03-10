/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { expect, test } from '@fixtures/api.fixture';

test.describe('PATCH /courses/:id', () => {
  test('should partially update a course successfully', async ({ request }) => {
    let courseId: string;

    const newCourse = {
      title: 'Introduction to JavaScript',
      instructorId: 'xyz789',
      duration: '8 weeks',
      category: 'Programming',
      description: 'A beginner-friendly JavaScript course.',
    };

    const partialUpdate = {
      duration: '12 weeks',
    };

    await test.step('Create a new course', async () => {
      const createResponse = await request.post('/courses', { data: newCourse });

      expect(createResponse.status()).toBe(201);

      const responseData = await createResponse.json();
      courseId = responseData.id;

      expect(responseData).toMatchObject(newCourse);
    });

    await test.step('Partially update the course details', async () => {
      const updateResponse = await request.patch(`/courses/${courseId}`, {
        data: partialUpdate,
      });

      expect(updateResponse.status()).toBe(200);

      const responseData = await updateResponse.json();

      expect(responseData.duration).toBe(partialUpdate.duration);
      expect(responseData.title).toBe(newCourse.title);
    });

    await test.step('Verify the updated course', async () => {
      const getResponse = await request.get(`/courses/${courseId}`);

      expect(getResponse.status()).toBe(200);

      const responseData = await getResponse.json();
      expect(responseData.duration).toBe(partialUpdate.duration);
      expect(responseData.title).toBe(newCourse.title);
    });
  });
});
