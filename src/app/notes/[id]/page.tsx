'use client';

import React from 'react';
import { useParams, redirect } from 'next/navigation';

import Form from '@/components/Form';

const EditNotePage = () => {
  const params = useParams();
  const noteId = params.id;

  return (
    <main>
      <h1>Note {noteId}</h1>
      <Form noteId={noteId} />
    </main>
  );
};

export default EditNotePage;
