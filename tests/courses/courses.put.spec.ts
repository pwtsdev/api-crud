/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { expect, test } from '@fixtures/api.fixture';

test.describe('PUT /courses/:id', () => {
  test('should create and update a course successfully', async ({ request }) => {
    let courseId: string;

    const newCourse = {
      title: 'Introduction to JavaScript',
      instructorId: 'xyz789',
      duration: '8 weeks',
      category: 'Programming',
      description: 'A beginner-friendly JavaScript course.',
    };

    const updatedCourse = {
      title: 'Advanced JavaScript',
      instructorId: 'abc123',
      duration: '10 weeks',
      category: 'Web Development',
      description: 'A deep dive into advanced JavaScript concepts.',
    };

    await test.step('Create a new course', async () => {
      const createResponse = await request.post('/courses', { data: newCourse });

      expect(createResponse.status()).toBe(201);

      const responseData = await createResponse.json();
      courseId = responseData.id;

      expect(responseData).toMatchObject(newCourse);
    });

    await test.step('Update the course details', async () => {
      const updateResponse = await request.put(`/courses/${courseId}`, {
        data: updatedCourse,
      });

      expect(updateResponse.status()).toBe(200);

      const responseData = await updateResponse.json();

      expect(responseData).toMatchObject(updatedCourse);
    });

    await test.step('Verify the updated course', async () => {
      const getResponse = await request.get(`/courses/${courseId}`);

      expect(getResponse.status()).toBe(200);

      const responseData = await getResponse.json();
      expect(responseData).toMatchObject(updatedCourse);
    });
  });
});
