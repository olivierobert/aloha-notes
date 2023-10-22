import { ApiClient } from './client';
import { ApiClientError } from './../error';

describe('ApiClient', () => {
  describe('new', () => {
    it('throws an error given an empty base url', () => {
      expect(() => new ApiClient({ baseUrl: '' })).toThrowError(ApiClientError);
    });
  });
});
