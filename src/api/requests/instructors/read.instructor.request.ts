import { APIResponse, expect, request } from '@playwright/test';

export async function readInstructorByIdRequest(id: string): Promise<APIResponse> {
  const api = await request.newContext();
  const response = await api.get(`/instructors/${id}`);

  expect(response.status()).toBe(200);

  return response;
}
