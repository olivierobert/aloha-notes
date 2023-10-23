import React from 'react';
import Link from 'next/link';

import { Note } from '@/types/note';

interface ListNotesProps {
  notes: Note[];
}

const ListNote: React.FC<ListNotesProps> = ({ notes }) => {
  if (!notes.length) {
    return (
      <div className="list-note">
        <div className="list-note__blank-slate">No notes yet</div>
      </div>
    );
  }

  return (
    <div className="list-note">
      <ul className="list-note__container">
        {notes.map((note) => (
          <li key={`aloha-note-${note.id}`} className="list-note__item">
            <Link href={`/notes/${note.id}`}>
              <div className="list-note__card">
                {note.body}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListNote;
