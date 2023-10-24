import React, { useEffect, useReducer, useState } from 'react';

import apiClient, { ENDPOINT } from '@/config/api';
import { Note } from '@/types/note';
import { EditorActionTypes, editorInitialState, editorReducer } from './reducer';

import Loader from '@/components/Loader';
import TextInput from './TextInput';

export interface NoteEditorProps {
  noteId?: string;
  onCreateSuccess?: (noteId: string) => void;
}

const NoteEditor = ({ noteId, onCreateSuccess } : NoteEditorProps) => {
  const [{ note, error }, dispatch] = useReducer(editorReducer, editorInitialState);

  const getNote = async () => {
    if (!noteId) return;

    dispatch({ type: EditorActionTypes.EDITOR_IS_FETCHING });

    try {
      let endpointPath = ENDPOINT.GET_NOTE.replace(':id', noteId.toString());

      const fetchedNote = await apiClient.get<Note>(endpointPath);

      dispatch({ type: EditorActionTypes.EDITOR_SET_NOTE, payload: fetchedNote });
    } catch (error) {
      dispatch({ type: EditorActionTypes.EDITOR_SET_ERROR, payload: error });
    }
  }

  const onTextInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedNote = { ...note, body: event.target.value };

    dispatch({ type: EditorActionTypes.EDITOR_SET_NOTE, payload: updatedNote });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      let savedNote: Note;
      const formData = {...note};

      if (!noteId) {
        savedNote = await apiClient.post<Note>(ENDPOINT.POST_NOTE, formData);
      } else {
        let endpointPath = ENDPOINT.PUT_NOTE.replace(':id', noteId.toString());

        savedNote = await apiClient.put<Note>(endpointPath, formData);
      }

      dispatch({ type: EditorActionTypes.EDITOR_SET_NOTE, payload: savedNote });

      onCreateSuccess && onCreateSuccess(savedNote.id);
    } catch (error) {
      dispatch({ type: EditorActionTypes.EDITOR_SET_ERROR, payload: error });
    }
  };

  useEffect(() => {
    noteId && getNote();
  }, [noteId]);

  if (!note) {
    return (
      <div className="note-editor">
        <div className="note-editor__loading"><Loader /></div>
      </div>
    );
  }

  return (
    <div className="note-editor">
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={noteId} />

        <TextInput
          name="body"
          value={note.body}
          onChange={onTextInputChange} />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default NoteEditor;
