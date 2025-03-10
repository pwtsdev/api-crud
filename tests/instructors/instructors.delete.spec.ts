/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { expect, test } from '@fixtures/api.fixture';
import { createNewInstructorRequest } from '@requests/instructors/create.instructor.request';
import { readNonExistingInstructorByIdRequest } from '@requests/instructors/read.instructor.request';

test.describe('DELETE /instructors/:id', () => {
  test('should create and delete an instructor successfully', async ({ request }) => {
    let instructorId: string;

    await test.step('Create a new instructor', async () => {
      const responseData = await (await createNewInstructorRequest()).json();
      instructorId = responseData.id;
    });

    await test.step('Delete the instructor', async () => {
      const updateResponse = await request.delete(`/instructors/${instructorId}`);

      expect(updateResponse.status()).toBe(200);
    });

    await test.step('Verify the updated instructor', async () => {
      await readNonExistingInstructorByIdRequest(instructorId);
    });
  });
});
