/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable playwright/expect-expect */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { expect, test } from '@fixtures/api.fixture';
import { VALID_EMAIL, VALID_ID } from '@helpers/validators';

test.describe('POST /instructors', () => {
  test('should create a new instructor successfully', async ({ request }) => {
    const newInstructor = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      specialization: 'Python & Backend',
      bio: 'Experienced Python & Backend developer and mentor.',
    };

    const response = await request.post('/instructors', {
      data: newInstructor,
    });

    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    expect(responseBody.id).toMatch(VALID_ID);
    expect(responseBody).toHaveProperty('name', newInstructor.name);
    expect(responseBody).toHaveProperty('email', newInstructor.email);
    expect(responseBody.email).toMatch(VALID_EMAIL);
    expect(responseBody).toHaveProperty('specialization', newInstructor.specialization);
    expect(responseBody).toHaveProperty('bio', newInstructor.bio);
  });

  test.skip('should return 400 when required fields are missing', async ({ request }) => {
    const response = await request.post('/instructors', { data: {} });

    expect(response.status()).toBe(400);
  });

  test.skip('should return 400 when required fields are empty', async ({ request }) => {
    const newInstructor = {
      name: '',
      email: '',
      specialization: '',
      bio: '',
    };

    const response = await request.post('/instructors', { data: newInstructor });

    expect(response.status()).toBe(400);
  });
});

// Test	Sprawdza
// 1. Poprawne utworzenie	Tworzenie nowego instruktora
// 2. Brak wymaganych pól	Walidacja brakujących danych
// 3. Puste wartości	Walidacja pustych stringów
// 4. Zły format e-maila	Walidacja e-maila
// 5. Istniejący e-mail	Unikalność e-maila
// 6. Ograniczenie długości	Maksymalna liczba znaków
// 7. Zły format danych	Sprawdzanie typów danych
// 8. Nieprawidłowy Content-Type	Wymuszenie application/json
