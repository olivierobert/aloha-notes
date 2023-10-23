import React from 'react';
import Link from 'next/link';

import { Note } from '@/types/note';

import BlankSlate from '@/components/BlankSlate';

interface ListNotesProps {
  notes: Note[];
}

const ListNote: React.FC<ListNotesProps> = ({ notes }) => {
  if (!notes.length) {
    return (
      <BlankSlate message="No notes yet :-(" />
    );
  }

  return (
    <div className="list-note">
      <ul className="list-note__container" data-test-id="list-note">
        {notes.map((note) => (
          <li key={`aloha-note-${note.id}`} className="list-note__item" data-test-id="list-note-item">
            <Link href={`/notes/${note.id}`}>
              <div className="list-note__card">
                <div className="list-note__content">
                  {note.body}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListNote;
