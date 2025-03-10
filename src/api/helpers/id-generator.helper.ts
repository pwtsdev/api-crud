import { faker } from '@faker-js/faker';

export function generateId(): string {
  return faker.string.alphanumeric(4).toUpperCase();
}
