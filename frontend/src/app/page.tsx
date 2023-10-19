"use client";
import { useEffect } from 'react';
import { redirect, RedirectType } from 'next/navigation';

export default function Home() {
  redirect('/events', RedirectType.replace)

  return (<></>)
}
