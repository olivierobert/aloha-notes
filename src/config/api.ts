import { ApiClient } from "@/lib/api/client";

export const ENDPOINT = {
  GET_NOTES: '/notes',
};

const apiClient = new ApiClient({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL as string });

export default apiClient;
