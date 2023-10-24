'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

import AppHeader from '@/components/AppHeader';
import AppMain from '@/components/AppMain';
import NoteEditor from '@/components/NoteEditor';
import type { NoteEditorProps } from '@/components/NoteEditor';

const EditNotePage = () => {
  const params = useParams();

  const editorProps: NoteEditorProps = {
    noteId: params.id as string
  };

  return (
    <>
      <AppHeader
        title="Edit Note"
        leftSection={<Link href="/" className="button-link">Back</Link>} />
      <AppMain>
        <NoteEditor {...editorProps} />
      </AppMain>
    </>
  );
};

export default EditNotePage;
