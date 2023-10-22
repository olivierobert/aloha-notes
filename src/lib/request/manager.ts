import { RequestError } from '../error';

class RequestManager {

  public async get<T>(url: string): Promise<T | RequestError> {
    try {
      const response = await fetch(`${url}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const responseData = await response.json();

      return responseData;
    } catch (error) {
      throw new RequestError({ message: (error as Error)?.message });
    }
  }

  public async post<T>(url: string, body: Record<string, any>): Promise<T | RequestError> {
    try {
      const response = await fetch(`${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const responseData = await response.json();

      return responseData;
    } catch (error) {
      throw new RequestError({ message: (error as Error)?.message });
    }
  }

  public async put<T>(url: string, body: Record<string, any>): Promise<T | RequestError> {
    try {
      const response = await fetch(`${url}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const responseData = await response.json();

      return responseData;
    } catch (error) {
      throw new RequestError({ message: (error as Error)?.message });
    }
  }
}

export default RequestManager;
