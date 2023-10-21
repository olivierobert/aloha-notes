'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    try {
      const response = await fetch('https://challenge.surfe.com/aloha/notes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const data = await response.json();

      setNotes(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <header>
        <Link href="/notes/new">New Note</Link>
      </header>
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
  );
}
