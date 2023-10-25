import apiClient, { ENDPOINT } from '@/config/api';
import { Note } from '@/types/note';

export const saveNote = async (noteData: { body: string }): Promise<Note> => {
  return await apiClient.post<Note>(ENDPOINT.POST_NOTE, noteData);
}

export const updateNote = async (noteId, noteData: { body: string }): Promise<Note> => {
  let endpointPath = ENDPOINT.PUT_NOTE.replace(':id', noteId.toString());

  return await apiClient.put<Note>(endpointPath, noteData);
}
