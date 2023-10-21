'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import Form from '@/components/Form';
import type { FormProps } from '@/components/Form';

const CreateNotePage = () => {
  const router = useRouter()
  const redirectToEdit = (noteId: string): void => {
    router.push(`/notes/${noteId}`);
  };

  const formProps: FormProps = {
    onCreateSuccess: redirectToEdit,
  };

  return (
    <main>
      <h1>New Note</h1>
      <Form {...formProps} />
    </main>
  );
};

export default CreateNotePage;
