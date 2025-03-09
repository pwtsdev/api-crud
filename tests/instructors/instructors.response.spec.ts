import test, { expect } from '@playwright/test';

test('APIResponse details', async ({ request }) => {
  const response = await request.get('http://localhost:3000/instructors/vflr');
  expect(response.status()).toBe(200);

  console.log('👉 response body');
  console.log(await response.body());
  console.log((await response.body()).toString());
  console.log(JSON.parse((await response.body()).toString()));
});
