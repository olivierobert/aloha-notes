import { ApiClient } from "@/lib/api/client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const SESSION = process.env.NEXT_PUBLIC_SESSION;

export const ENDPOINT = {
  GET_NOTES: `/${SESSION}/notes`,
  GET_NOTE: `/${SESSION}/notes/:id`,
  POST_NOTE: `/${SESSION}/notes`,
  PUT_NOTE: `/${SESSION}/notes/:id`,
  GET_USERS: '/users',
};

const apiClient = new ApiClient({ baseUrl: API_BASE_URL as string });

export default apiClient;
