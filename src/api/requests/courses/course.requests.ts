import { getRandomCourseData } from '@datafactory/course.data';
import { APIResponse, expect, request } from '@playwright/test';

export async function readCourseByIdRequest(id: string): Promise<APIResponse> {
  const api = await request.newContext();
  const response = await api.get(`/courses/${id}`);

  expect(response.status()).toBe(200);

  return response;
}

export async function readNonExistingCourseByIdRequest(id: string): Promise<void> {
  const api = await request.newContext();
  const response = await api.get(`/courses/${id}`);

  expect(response.status()).toBe(404);
}

export async function readAllCoursesRequest(): Promise<APIResponse> {
  const api = await request.newContext();
  const response = await api.get('/courses');

  expect(response.status()).toBe(200);

  return response;
}

export async function createNewCourseRequest(payload?: object): Promise<APIResponse> {
  if (!payload) {
    payload = getRandomCourseData();
  }

  const api = await request.newContext();
  const response = await api.post('/courses', {
    data: payload,
  });

  expect(response.status()).toBe(201);

  return response;
}

export async function updateCourseRequest(id: string, payload: object): Promise<APIResponse> {
  const api = await request.newContext();
  const response = await api.put(`/courses/${id}`, {
    data: payload,
  });

  expect(response.status()).toBe(200);

  return response;
}

export async function patchCourseRequest(id: string, payload: object): Promise<APIResponse> {
  const api = await request.newContext();
  const response = await api.patch(`/courses/${id}`, {
    data: payload,
  });

  expect(response.status()).toBe(200);

  return response;
}

export async function deleteCourseRequest(id: string): Promise<void> {
  const api = await request.newContext();
  const response = await api.delete(`/courses/${id}`);

  expect(response.status()).toBe(200);
}
