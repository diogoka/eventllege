import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@mui/material';

interface Page {
  label: string;
  path: string;
}

const organizerBtns: Page[] = [
  { label: 'Events', path: '/' },
  { label: 'My events', path: '/user/my-events' },
  { label: 'History', path: '/history' },
  { label: 'Created Event', path: '/organizer-events' },
  { label: 'Create Event', path: '/events/new' },
];

export default function OrganizerListItemPC() {
  const router = useRouter();
  const pathName = usePathname();
  const [currentPage, setCurrentPage] = useState<Page | null>(organizerBtns[0]);

  useEffect(() => {
    // Update the currentPage when the path changes
    if (pathName !== '/user') {
      const page = organizerBtns.find((p) => p.path === pathName);
      if (page) {
        setCurrentPage(page);
      }
    } else {
      setCurrentPage(null);
    }
  }, [pathName]);

  const clickHandler = (path: string) => {
    router.push(path);
  };
  return (
    <>
      {organizerBtns.map((button, index) => (
        <Button
          key={index}
          onClick={() => clickHandler(button.path)}
          variant={
            currentPage && currentPage.path === button.path
              ? 'contained'
              : 'text'
          }
          color={
            currentPage && currentPage.path === button.path
              ? 'primary'
              : 'secondary'
          }
          sx={{
            width: 'auto',
            margin: '0 .5rem',
            padding: '0 .5rem',
          }}
        >
          {button.label}
        </Button>
      ))}
    </>
  );
}
