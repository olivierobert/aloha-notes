import React, { useEffect, useReducer, useRef, useState } from 'react';

import apiClient, { ENDPOINT } from '@/config/api';
import { Note } from '@/types/note';
import { EditorActionTypes, editorInitialState, editorReducer } from './reducer';

export interface NoteEditorProps {
  noteId?: string;
  onCreateSuccess?: (noteId: string) => void;
}

const NoteEditor = ({ noteId, onCreateSuccess } : NoteEditorProps) => {
  const textInputRef = useRef(null);

  const [formData, setFormData] = useState({ body: '' });
  const [{ note, error }, dispatch] = useReducer(editorReducer, editorInitialState);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const getNote = async () => {
    if (!noteId) return;

    dispatch({ type: EditorActionTypes.EDITOR_IS_FETCHING });

    try {
      let endpointPath = ENDPOINT.GET_NOTE.replace(':id', noteId.toString());

      const fetchedNote = await apiClient.get<Note>(endpointPath);

      setFormData({ body: fetchedNote.body });
      dispatch({ type: EditorActionTypes.EDITOR_SET_NOTE, payload: fetchedNote });
    } catch (error) {
      dispatch({ type: EditorActionTypes.EDITOR_SET_ERROR, payload: error });
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      let savedNote: Note;

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

  return (
    <div className="rich-text-editor">
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={noteId} />

        <div>
          <label htmlFor="body">Body</label>:
          <textarea
            name="body"
            placeholder="What's on your mind?"
            defaultValue={formData.body}
            ref={textInputRef}
            onChange={handleInputChange}
            ></textarea>
        </div>

        <div dangerouslySetInnerHTML={{__html: formData.body }} />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default NoteEditor;
