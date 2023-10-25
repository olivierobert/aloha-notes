'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

import { ENDPOINT } from '@/config/api';
import useQuery from '@/hooks/useQuery';
import { Note } from '@/types/note';

import AppHeader from '@/components/AppHeader';
import AppMain from '@/components/AppMain';
import NoteEditor from '@/components/NoteEditor';
import Loader from '@/components/Loader';

const EditNotePage = () => {
  const params = useParams();
  const noteId = params.id as string;

  let endpointPath = ENDPOINT.GET_NOTE.replace(':id', noteId.toString());
  const { resource: note, isLoading } = useQuery<Note>(endpointPath);

  return (
    <>
      <AppHeader
        title="Edit Note"
        leftSection={<Link href="/" className="button-link button-link--secondary">Back</Link>} />
      <AppMain>
        {isLoading ? <Loader /> : <NoteEditor note={note ?? undefined} />}
      </AppMain>
    </>
  );
};

export default EditNotePage;
