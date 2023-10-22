'use client';

import { useEffect, useState } from "react";
import Link from 'next/link';

import apiClient, { ENDPOINT } from '@/config/api';
import { Note } from '@/types/note';

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);

  const getNotes = async () => {
    try {
      const response = await apiClient.get<Note[]>(ENDPOINT.GET_NOTES);

      setNotes(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNotes();
  },[]);

  return (
    <>
      <main>
        <h1>Notes</h1>
        {notes.length === 0 && <p>No notes yet</p>}
        <ul>
          {notes.length && notes.map((note) => (
            <li key={`aloha-note-${note.id}`}>
              <div>{note.body}</div>
              <Link href={`/notes/${note.id}`}>Edit</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}
