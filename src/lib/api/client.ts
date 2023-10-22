import { ApiClientError } from './../error';
import RequestManager from '../request/manager';


interface ApiClientOptions {
  baseUrl: string;
  requestManager?: any
}

export class ApiClient {
  private readonly baseUrl;
  private RequestManager;

  constructor(options: ApiClientOptions) {
    this.baseUrl = options.baseUrl;
    this.RequestManager = options.requestManager || new RequestManager();

    if (!this.baseUrl) {
      throw new ApiClientError('ApiClient: baseUrl is required');
    }
  }

  public async get<T>(endpoint: string): Promise<T | RequestError> {
    const url = `${this.baseUrl}${endpoint}`;

    return await this.RequestManager.get(url);
  }

  public async post<T>(endpoint: string, body: Record<string, any>): Promise<T | RequestError> {
    const url = `${this.baseUrl}${endpoint}`;

    return await this.RequestManager.post(url, body);
  }

  public async put<T>(endpoint: string, body: Record<string, any>): Promise<T | RequestError> {
    const url = `${this.baseUrl}${endpoint}`;

    return await this.RequestManager.put(url, body);
  }
}
