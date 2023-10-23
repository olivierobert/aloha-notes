import { useState, useEffect } from 'react';

import apiClient, { ENDPOINT } from '@/config/api';
import { Note } from '@/types/note';

function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getNotes = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await apiClient.get<Note[]>(ENDPOINT.GET_NOTES);

      setIsLoading(false);
      setNotes(response);
    } catch (error) {
      setError((error as Error)?.message);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return {
    notes,
    isLoading,
    error
  };
}

export default useNotes;
