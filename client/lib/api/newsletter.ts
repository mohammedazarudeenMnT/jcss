import { axiosInstance } from "../axios";
import type {
  Newsletter,
  CreateNewsletterInput,
  UpdateNewsletterInput,
} from "../types/newsletter";

const API_BASE = "/api/newsletters";

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    pages: number;
  };
}

export async function getNewsletters(
  status?: string,
  page: number = 1,
  limit: number = 10,
): Promise<PaginatedResponse<Newsletter>> {
  const url = `${API_BASE}?page=${page}&limit=${limit}${status ? `&status=${status}` : ""}`;
  const response = await axiosInstance.get<PaginatedResponse<Newsletter>>(url);
  return response.data;
}

export async function getNewsletterById(id: string): Promise<Newsletter> {
  const response = await axiosInstance.get<Newsletter>(`${API_BASE}/${id}`);
  return response.data;
}

export async function getNewsletterBySlug(slug: string): Promise<Newsletter> {
  const response = await axiosInstance.get<Newsletter>(
    `${API_BASE}/slug/${slug}`,
  );
  return response.data;
}

export async function createNewsletter(
  data: CreateNewsletterInput,
): Promise<Newsletter> {
  const response = await axiosInstance.post<Newsletter>(API_BASE, data);
  return response.data;
}

export async function updateNewsletter(
  id: string,
  data: UpdateNewsletterInput,
): Promise<Newsletter> {
  const response = await axiosInstance.put<Newsletter>(
    `${API_BASE}/${id}`,
    data,
  );
  return response.data;
}

export async function deleteNewsletter(id: string): Promise<void> {
  await axiosInstance.delete(`${API_BASE}/${id}`);
}
