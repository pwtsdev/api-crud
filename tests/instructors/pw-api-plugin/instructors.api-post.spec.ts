import { getRandomInstructorData } from '@datafactory/instructor.data';
import { expect, test } from '@playwright/test';
import { apiPost } from 'pw-api-plugin';

test.describe('apiPOST /instructors', () => {
  test('should create a new instructor successfully', async ({ request, page }) => {
    const newInstructor = getRandomInstructorData();

    const response = await apiPost({ request, page }, '/instructors', {
      data: newInstructor,
    });

    expect(response.status()).toBe(201);
  });
});
