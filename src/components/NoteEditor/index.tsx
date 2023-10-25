import React, { useCallback, useEffect, useState } from 'react';

import apiClient, { ENDPOINT } from '@/config/api';
import useQuery from '@/hooks/useQuery';
import { Note } from '@/types/note';
import { User } from '@/types/user';

import MentionInput from '@/components/MentionInput';

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

  const handleChange = useCallback((value: string) => {
    setFormData({ body: value });
  }, [])

  const handleClickTab = (event: React.MouseEvent<HTMLDivElement>) => {
    const container = event.currentTarget.closest('.note-editor__tab')
    const target = event.target as HTMLButtonElement;
    const pane = target.dataset.target;

    if (pane) {
      const activeTab = container?.querySelector('.note-editor__tab-item.active');
      const activePane = container?.querySelector('.note-editor__tab-pane.active');

      if (activeTab && activePane) {
        activeTab.classList.remove('active');
        activePane.classList.remove('active');
      }

      target.classList.add('active');
      container?.querySelector(`.note-editor__tab-pane[data-pane="${pane}"]`)?.classList.add('active');
    }
  };

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

        <div className="note-editor__tab">
          <div className="note-editor__tab-list" onClick={handleClickTab}>
            <button type="button" className="note-editor__tab-item active" data-target="editor-write">Write</button>
            <button type="button" className="note-editor__tab-item" data-target="editor-preview">Preview</button>
          </div>

          <div className="note-editor__tab-content">
            <div className="note-editor__tab-pane active" data-pane="editor-write">
              <MentionInput
                name="body"
                value={formData.body}
                mentionUsers={collaborators ?? []}
                onChange={handleChange} />
            </div>
            <div className="note-editor__tab-pane" data-pane="editor-preview">
              <div
                className="mention-input__canvas"
                dangerouslySetInnerHTML={{__html: formData.body }} />
            </div>
          </div>
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default NoteEditor;
