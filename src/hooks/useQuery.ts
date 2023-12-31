import { useCallback, useEffect, useState } from 'react';

import apiClient, { ENDPOINT } from '@/config/api';
import { Note } from '@/types/note';

function useQuery<T>(endpoint: string) {
  const [resource, setResource] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getResource = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await apiClient.get<T>(endpoint);

      setIsLoading(false);
      setResource(response);
    } catch (error) {
      setError((error as Error)?.message);
    }
  }, [endpoint]);

  useEffect(() => {
    getResource();
  }, [getResource]);

  return {
    resource,
    isLoading,
    error
  };
}

export default useQuery;
