import React, { useEffect, useRef, useState } from 'react';

export interface NoteEditorProps {
  noteId?: string;
  onCreateSuccess?: (noteId: string) => void;
}

const NoteEditor = ({ noteId, onCreateSuccess } : NoteEditorProps) => {
  const textInputRef = useRef(null);

  const [formData, setFormData] = useState({
    body: ''
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

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
            ></textarea>

          <div dangerouslySetInnerHTML={{__html: formData.body}} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default NoteEditor;