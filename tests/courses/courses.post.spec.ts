/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getRandomCourseData } from '@datafactory/course.data';
import { expect, test } from '@fixtures/api.fixture';
import { VALID_ID } from '@helpers/validators';
import { createNewCourseRequest } from '@requests/courses/course.requests';

test.describe('POST /courses', () => {
  test('should create a new course successfully', async ({ log }) => {
    const newCourse = getRandomCourseData();
    const response = await createNewCourseRequest(newCourse);

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    log.info(responseBody);

    expect(responseBody.id).toMatch(VALID_ID);
    expect(responseBody.title).toBe(newCourse.title);
    expect(responseBody.instructorId).toBe(newCourse.instructorId);
    expect(responseBody.duration).toBe(newCourse.duration);
    expect(responseBody.category).toBe(newCourse.category);
    expect(responseBody.description).toBe(newCourse.description);
  });
});
