import React, { useCallback, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { ENDPOINT } from '@/config/api';
import useQuery from '@/hooks/useQuery';
import { Note } from '@/types/note';
import { User } from '@/types/user';

import { createNote, updateNote } from './actions';
import { handleClickTab } from './handlers';
import { highlightMention } from './helpers';

import Loader from '@/components/Loader';
import MentionInput from '@/components/MentionInput';

const DEBOUNCE_DELAY = 1000;
const FEEDBACK_DELAY = 500;

export interface NoteEditorProps {
  note?: Note;

  onCreateSuccess?: (noteId: string) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ note, onCreateSuccess } : NoteEditorProps) => {
  const {resource: collaborators} = useQuery<User[]>(ENDPOINT.GET_USERS);

  const [formData, setFormData] = useState({
    body: note?.body || ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const saveNote = async () => {
    let savedNote: Note = !note ?
        await createNote(formData) : await updateNote(note.id, formData)

    onCreateSuccess && onCreateSuccess(savedNote.id);
  }

  const debouncedSaveNote = useDebouncedCallback(async () => {
    if (!formData.body) return;

    setIsSaving(true);

    try {
      saveNote();
      setTimeout(() => setIsSaving(false), FEEDBACK_DELAY);
    } catch (error) {
      setError(error as string);
    }
  }, DEBOUNCE_DELAY);

  const handleChange = useCallback((value: string) => {
    setFormData({ body: value });
    debouncedSaveNote();
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveNote();
  };

  return (
    <div className="note-editor">
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={note?.id} />

        <div className="note-editor__tab">
          <header className="note-editor__tab-header">
            <div className="note-editor__tab-list" onClick={handleClickTab}>
              <button type="button" className="note-editor__tab-item active" data-target="editor-write">Write</button>
              <button type="button" className="note-editor__tab-item" data-target="editor-preview">Preview</button>
            </div>
            <div className="note-editor__tab-actions">
              {isSaving && <Loader size="xs" />}
            </div>
          </header>

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
                dangerouslySetInnerHTML={{__html: highlightMention(formData.body) }} />
            </div>
          </div>
        </div>

        <button type="submit" className="sr-only">Save</button>
      </form>
    </div>
  );
}

export default NoteEditor;
