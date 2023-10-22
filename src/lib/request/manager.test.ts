import RequestManager from './manager';
import { RequestError } from '../error';

describe('RequestManager', () => {
  const baseUrl = 'https://example.com';
  const requestManager = new RequestManager();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('get', () => {
    it('given returns data given the request is successful', async () => {
      const url = `${baseUrl}/notes/1`;
      const data = { id: 1, body: 'lorem ipsum' };

      const mockFetch = jest.fn().mockResolvedValueOnce({
        status: 200,
        json: jest.fn().mockResolvedValueOnce(data),
      });
      global.fetch = mockFetch;

      const response = await requestManager.get(url);

      expect(mockFetch).toHaveBeenCalledWith(`${url}`,  {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      expect(response).toEqual(data);
    });

    it('throws an error given the request fails', async () => {
      const url = `${baseUrl}/notes/1`;

      const mockFetch = jest.fn().mockRejectedValue(new Error('Internal Server Error'));
      global.fetch = mockFetch;

      await expect(requestManager.get(url)).rejects.toThrowError(RequestError);
    });
  });

  describe('post', () => {
    it('given returns data given the request is successful', async () => {
      const url = `${baseUrl}/notes`;
      const body = { body: 'lorem ipsum' };
      const data = { id: 1, body: 'lorem ipsum' };

      const mockFetch = jest.fn().mockResolvedValueOnce({
        status: 200,
        json: jest.fn().mockResolvedValueOnce(data),
      });
      global.fetch = mockFetch;

      const result = await requestManager.post(url, body);

      expect(mockFetch).toHaveBeenCalledWith(`${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      expect(result).toEqual(data);
    });

    it('throws an error given the request fails', async () => {
      const url = `${baseUrl}/notes`;
      const body = { body: 'lorem ipsum' };

      const mockFetch = jest.fn().mockRejectedValue(new Error('Internal Server Error'));
      global.fetch = mockFetch;

      await expect(requestManager.post(url, body)).rejects.toThrowError(RequestError);
    });
  });

  describe('put', () => {
    it('given returns data given the request is successful', async () => {
      const url = `${baseUrl}/notes/1`;
      const body = {id: 1, body: 'lorem ipsum' };
      const data = { id: 1, body: 'real text' };

      const mockFetch = jest.fn().mockResolvedValueOnce({
        status: 200,
        json: jest.fn().mockResolvedValueOnce(data),
      });
      global.fetch = mockFetch;

      const result = await requestManager.put(url, body);

      expect(mockFetch).toHaveBeenCalledWith(`${url}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      expect(result).toEqual(data);
    });

    it('throws an error given the request fails', async () => {
      const url = `${baseUrl}/notes/1`;
      const body = { body: 'lorem ipsum' };

      const mockFetch = jest.fn().mockRejectedValue(new Error('Internal Server Error'));
      global.fetch = mockFetch;

      await expect(requestManager.put(url, body)).rejects.toThrowError(RequestError);
    });
  });
});
