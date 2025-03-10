/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getRandomInstructorData } from '@datafactory/instructor.data';
import { expect, test } from '@fixtures/api.fixture';
import { createNewInstructorRequest } from '@requests/instructors/create.instructor.request';
import { readInstructorByIdRequest } from '@requests/instructors/read.instructor.request';

test.describe('PATCH /instructors/:id', () => {
  test('should create and update an instructor successfully', async ({ request }) => {
    let instructorId: string;

    const newInstructor = getRandomInstructorData();

    const updatedInstructor = {
      name: 'Joe Black',
    };

    await test.step('Create a new instructor', async () => {
      const responseData = await (await createNewInstructorRequest(newInstructor)).json();
      instructorId = responseData.id;
    });

    await test.step('Partially update the instructor', async () => {
      const updateResponse = await request.patch(`/instructors/${instructorId}`, {
        data: updatedInstructor,
      });

      expect(updateResponse.status()).toBe(200);

      const responseData = await updateResponse.json();
      expect(responseData.name).toBe(updatedInstructor.name);
      expect(responseData.email).toBe(newInstructor.email);
    });

    await test.step('Verify the updated instructor', async () => {
      const responseData = await (await readInstructorByIdRequest(instructorId)).json();
      expect(responseData.name).toBe(updatedInstructor.name);
      expect(responseData.email).toBe(newInstructor.email);
    });
  });
});
