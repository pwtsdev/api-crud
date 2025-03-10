/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { expect, test } from '@fixtures/api.fixture';

test.describe('PUT /instructors/:id', () => {
  test('should create and update an instructor successfully', async ({ request }) => {
    let instructorId: string;

    const newInstructor = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      specialization: 'Python & Backend',
      bio: 'Experienced Python & Backend developer and mentor.',
    };

    const updatedInstructor = {
      name: 'Joe Black',
      email: 'joeblack@example.com',
      specialization: 'JavaScript & Frontend',
      bio: 'Updated bio with new specialization.',
    };

    await test.step('Create a new instructor', async () => {
      const createResponse = await request.post('/instructors', { data: newInstructor });

      expect(createResponse.status()).toBe(201);

      const responseData = await createResponse.json();
      instructorId = responseData.id;

      expect(responseData).toMatchObject(newInstructor);
    });

    await test.step('Update the instructor details', async () => {
      const updateResponse = await request.put(`/instructors/${instructorId}`, {
        data: updatedInstructor,
      });

      expect(updateResponse.status()).toBe(200);

      const responseData = await updateResponse.json();

      expect(responseData).toMatchObject(updatedInstructor);
    });

    await test.step('Verify the updated instructor', async () => {
      const getResponse = await request.get(`/instructors/${instructorId}`);

      expect(getResponse.status()).toBe(200);

      const responseData = await getResponse.json();
      expect(responseData).toMatchObject(updatedInstructor);
    });
  });
});
