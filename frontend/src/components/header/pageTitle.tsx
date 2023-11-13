import React from 'react';
import { usePathname } from 'next/navigation';
import { Typography } from '@mui/material';

const currentPages = [
  { label: 'Home', path: '/events' },
  { label: 'Sign up', path: '/signup' },
  { label: 'History', path: '/history' },
  { label: 'My profile', path: '/user' },
  { label: 'Created Event', path: '/organizer-events' },
  { label: 'create Event', path: '/events/new' },
];

export default function PageTitle() {
  const pathname = usePathname();
  const currentPage = currentPages.find((p) => p.path === pathname);
  return <>{currentPage ? <Typography variant='h2'>{currentPage.label}</Typography> : <></>}</>;
}
