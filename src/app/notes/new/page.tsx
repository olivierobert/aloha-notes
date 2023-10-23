'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import AppHeader from '@/components/AppHeader';
import AppMain from '@/components/AppMain';
import NoteEditor from '@/components/NoteEditor';
import type { NoteEditorProps } from '@/components/NoteEditor';

const CreateNotePage = () => {
  const router = useRouter()
  const redirectToEdit = (noteId: string): void => {
    router.push(`/notes/${noteId}`);
  };

  const editorProps: NoteEditorProps = {
    onCreateSuccess: redirectToEdit,
  };

  return (
    <>
      <AppHeader
        title="New Note"
        leftSection={<Link href="/" className="button-link">Back</Link>} />
      <AppMain>
        <NoteEditor {...editorProps} />
      </AppMain>
    </>
  );
};

export default CreateNotePage;
