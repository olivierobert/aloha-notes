import { ApiClient } from "@/lib/api/client";

const apiClient = new ApiClient({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL as string });

export default apiClient;