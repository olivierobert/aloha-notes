'use client';

import { useEffect, useState } from "react";
import Link from 'next/link';

import useNotes from '@/hooks/useNotes';

import AppHeader from '@/components/AppHeader';
import AppMain from '@/components/AppMain';
import ListNote from '@/components/ListNote';

export default function Home() {
  const { notes, isLoading } = useNotes();

  return (
    <>
      <AppHeader
        title="Notes"
        rightSection={<Link href="/notes/new" className="button-link">New</Link>} />
      <AppMain>
        {isLoading ? <div className="app-loader">Loading...</div> : <ListNote notes={notes} />}
      </AppMain>
    </>
  )
}
