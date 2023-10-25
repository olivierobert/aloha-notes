'use client';

import { useEffect, useState } from "react";
import Link from 'next/link';

import { ENDPOINT } from '@/config/api';
import useQuery from '@/hooks/useQuery';
import { Note } from '@/types/note';

import AppHeader from '@/components/AppHeader';
import AppMain from '@/components/AppMain';
import Loader from '@/components/Loader';
import ListNote from '@/components/ListNote';

export default function Home() {
  const { resource: notes, isLoading } = useQuery<Note[]>(ENDPOINT.GET_NOTES);

  return (
    <>
      <AppHeader
        title="Notes"
        rightSection={<Link href="/notes/new" className="button-link">New</Link>} />
      <AppMain>
        {isLoading ? <Loader /> : <ListNote notes={notes ?? []} />}
      </AppMain>
    </>
  )
}
