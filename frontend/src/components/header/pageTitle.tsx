import React from 'react';
import { usePathname } from 'next/navigation';
import { Typography } from '@mui/material';

const currentPages = [
  { label: 'Home', path: '/' },
  { label: 'My events', path: '/user/my-events' },
  { label: 'History', path: '/history' },
  { label: 'My profile', path: '/user' },
];

export default function PageTitle() {
  const pathname = usePathname();
  const currentPage = currentPages.find((p) => p.path === pathname);
  return <>{currentPage ? <Typography variant='h2'>{currentPage.label}</Typography> : <></>}</>;
}
