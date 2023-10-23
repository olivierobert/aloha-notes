'use client';

import { useEffect, useState } from "react";
import Link from 'next/link';

import useNotes from '@/hooks/useNotes';

import AppHeader from '@/components/AppHeader';
import AppMain from '@/components/AppMain';
import Loader from '@/components/Loader';
import ListNote from '@/components/ListNote';

export default function Home() {
  const { notes, isLoading } = useNotes();

  return (
    <>
      <AppHeader
        title="Notes"
        rightSection={<Link href="/notes/new" className="button-link">New</Link>} />
      <AppMain>
        {isLoading ? <Loader /> : <ListNote notes={notes} />}
      </AppMain>
    </>
  )
}
