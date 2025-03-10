/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { expect, test } from '@fixtures/api.fixture';

// APIResponse
// APIResponse class represents responses returned by apiRequestContext.get() and similar methods.
// https://playwright.dev/docs/api/class-apiresponse#api-response-headers

test('APIResponse details', async ({ request, log }) => {
  const response = await request.get('/instructors/vflr');
  expect(response.status()).toBe(200);

  // response body
  log.info('👉 response body');
  log.info(await response.body());
  // console.log((await response.body()).toString());
  // console.log(JSON.parse((await response.body()).toString()));

  // response as text
  log.info('👉 response body text');
  log.info(await response.text());

  // response as json
  log.info('👉 response body json');
  log.info(await response.json());

  // status
  log.info('👉 response status');
  log.info(response.status());

  // status text
  log.info('👉 response status text');
  log.info(response.statusText());

  // ok - status in the range 200-299
  log.info('👉 response ok');
  log.info(response.ok());

  // headers
  log.info('👉 response headers');
  log.info(response.headers());

  // headersArray
  log.info('👉 response headersArray');
  log.info(response.headersArray());

  // url
  log.info('👉 response url');
  log.info(response.url());

  // destrukturyzacja danych
  log.info('👉 destrukturyzacja do obiektu');
  const responseData = await response.json();
  const instructorData = {
    instructorId: responseData.id,
    instructorEmail: responseData.email,
  };
  log.info(instructorData);

  log.info('👉 destrukturyzacja skrócone przypisanie obiektu');
  const { id: instructorId, email: instructorEmail } = await response.json();
  const instructorData2 = { instructorId, instructorEmail };
  log.info(instructorData2);
});
