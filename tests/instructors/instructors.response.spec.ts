/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import test, { expect } from '@playwright/test';

// APIResponse
// APIResponse class represents responses returned by apiRequestContext.get() and similar methods.
// https://playwright.dev/docs/api/class-apiresponse#api-response-headers

test('APIResponse details', async ({ request }) => {
  const response = await request.get('http://localhost:3000/instructors/vflr');
  expect(response.status()).toBe(200);

  // response body
  console.log('👉 response body');
  console.log(await response.body());
  // console.log((await response.body()).toString());
  // console.log(JSON.parse((await response.body()).toString()));

  // response as text
  console.log('👉 response body text');
  console.log(await response.text());

  // response as json
  console.log('👉 response body json');
  console.log(await response.json());

  // status
  console.log('👉 response status');
  console.log(response.status());

  // status text
  console.log('👉 response status text');
  console.log(response.statusText());

  // ok - status in the range 200-299
  console.log('👉 response ok');
  console.log(response.ok());

  // headers
  console.log('👉 response headers');
  console.log(response.headers());

  // headersArray
  console.log('👉 response headersArray');
  console.log(response.headersArray());

  // url
  console.log('👉 response url');
  console.log(response.url());

  // destrukturyzacja danych
  console.log('👉 destrukturyzacja do obiektu');
  const responseData = await response.json();
  const instructorData = {
    instructorId: responseData.id,
    instructorEmail: responseData.email,
  };
  console.log(instructorData);

  console.log('👉 destrukturyzacja skrócone przypisanie obiektu');
  const { id: instructorId, email: instructorEmail } = await response.json();
  const instructorData2 = { instructorId, instructorEmail };
  console.log(instructorData2);
});
