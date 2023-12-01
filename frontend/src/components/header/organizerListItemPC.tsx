import { useEffect, useContext } from 'react';
import { EventContext } from '@/context/eventContext';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';

interface Page {
  label: string;
  path: string;
}

const organizerBtns: Page[] = [
  { label: 'Events', path: '/' || '/events?isPublished=true' },
  { label: 'My events', path: '/user/my-events' },
  { label: 'History', path: '/history' },
  { label: 'Created Event', path: '/organizer-events' },
  { label: 'Create Event', path: '/events/new' },
];

export default function OrganizerListItemPC() {
  const router = useRouter();
  const { showedPage, setShowedPage, pathName } = useContext(EventContext);

  useEffect(() => {
    // Update the currentPage when the path changes
    if (pathName !== '/user') {
      const page = organizerBtns.find((p) => p.path === pathName);
      if (page) {
        setShowedPage(page);
      }
    } else {
      setShowedPage(null);
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
            showedPage &&
            (showedPage.path === button.path ||
              showedPage?.path === '/events/?isUpdated=true' ||
              showedPage?.path === '/events/?isPublished=true')
              ? 'contained'
              : 'text'
          }
          color={
            showedPage &&
            (showedPage.path === button.path ||
              showedPage?.path === `/events/?isUpdated=true` ||
              showedPage?.path === '/events/?isPublished=true')
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
