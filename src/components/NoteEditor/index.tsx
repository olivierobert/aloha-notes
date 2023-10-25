import React, { useCallback, useEffect, useState } from 'react';

import apiClient, { ENDPOINT } from '@/config/api';
import useQuery from '@/hooks/useQuery';
import { Note } from '@/types/note';
import { User } from '@/types/user';

import TextInput from '@/components/MentionInput';

export interface NoteEditorProps {
  note?: Note;

  onCreateSuccess?: (noteId: string) => void;
}

const NoteEditor = ({ note, onCreateSuccess } : NoteEditorProps) => {
  const {resource: collaborators} = useQuery<User[]>(ENDPOINT.GET_USERS);

  const [formData, setFormData] = useState({
    body: note?.body || ''
  });
  const [error, setError] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ body: event.target.value });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      let savedNote: Note;

      if (!note) {
        savedNote = await apiClient.post<Note>(ENDPOINT.POST_NOTE, formData);
      } else {
        let endpointPath = ENDPOINT.PUT_NOTE.replace(':id', note.id.toString());

        savedNote = await apiClient.put<Note>(endpointPath, formData);
      }

      onCreateSuccess && onCreateSuccess(savedNote.id);
    } catch (error) {
      setError(error as string);
    }
  };

  return (
    <div className="note-editor">
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={note?.id} />

        <TextInput
          name="body"
          value={formData.body}
          mentionUsers={collaborators ?? []}
          onChange={handleChange} />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default NoteEditor;
