import { faker } from '@faker-js/faker';
import { generateId } from '@helpers/id-generator.helper';

export interface CourseData extends Record<string, unknown> {
  title: string;
  instructorId: string;
  duration: string;
  category: string;
  description: string;
}

export function getRandomCourseData(): CourseData {
  return {
    title: faker.lorem.words(3),
    instructorId: generateId(),
    duration: '12 weeks',
    category: faker.lorem.word(),
    description: faker.lorem.sentences(2),
  };
}
