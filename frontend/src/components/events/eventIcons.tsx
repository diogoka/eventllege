import React from 'react';
import { useContext } from 'react';
import IconsContainer from '../icons/iconsContainer';
import { useRouter, usePathname } from 'next/navigation';
import { EventContext } from '@/context/eventContext';
import { Box, Rating, Typography } from '@mui/material';
import { StarRounded } from '@mui/icons-material';

type Props = {
  role?: string;
  userId?: string;
  owner: string;
  laptopQuery: boolean;
  eventId: number;
  attending: boolean;
  setModalOpen: (isOpen: boolean) => void;
  handleAlertFn: (isOpen: boolean) => void;
  averageRating?: number;
  oldEvent?: boolean;
};

function EventIcons({
  role,
  userId,
  owner,
  laptopQuery,
  eventId,
  attending,
  setModalOpen,
  handleAlertFn,
  averageRating,
  oldEvent,
}: Props) {
  const router = useRouter();
  const pathName = usePathname();
  const { setShowedPage } = useContext(EventContext);
  const handleOrganizerClick = (iconName: string) => {
    console.log('clicked');
    if (iconName === 'FaEdit') {
      if (pathName === '/events' || 'organizer-events') {
        setShowedPage({
          label: 'Create Event',
          path: '/events/new',
        });
      }

      router.push(`/events/${eventId}/edit`);
    } else if (iconName === 'FaTrashAlt') {
      openDeleteModal();
    }
  };

  const openDeleteModal = () => {
    setModalOpen(true);
  };

  const handleUserClick = (iconName: string) => {
    if (iconName === 'FaShareSquare') {
      copyToClipboard(`http://localhost:3000/events/${eventId}`);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        handleAlertFn(true);
        setTimeout(() => {
          handleAlertFn(false);
        }, 3000);
      })
      .catch((err) => {
        console.error('Failed to copy URL: ', err);
      });
  };

  const renderIcons = () => {
    if (role === 'organizer' && userId === owner) {
      return (
        <>
          {oldEvent ? (
            <>
              {' '}
              {!averageRating ? (
                <Typography sx={{ fontSize: '0.8rem' }}>
                  No reviews yet
                </Typography>
              ) : (
                <Rating
                  name='read-only'
                  value={averageRating}
                  readOnly
                  precision={0.5}
                  size='small'
                  emptyIcon={<StarRounded />}
                  icon={<StarRounded />}
                  sx={{ fontSize: '1.3rem' }}
                />
              )}
            </>
          ) : (
            <IconsContainer
              icons={[
                {
                  name: 'FaEdit',
                  isClickable: true,
                  color: '#3874CB',
                  title: laptopQuery ? 'Edit' : '',
                  hoverColor: '#d7e3f4',
                },
                {
                  name: 'FaTrashAlt',
                  isClickable: true,
                  color: '#D00000',
                  title: laptopQuery ? 'Delete' : '',
                  hoverColor: '#ffd0d0',
                },
              ]}
              onIconClick={handleOrganizerClick}
            />
          )}
        </>
      );
    } else {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              backgroundColor: attending ? '#4CAF50' : 'rgb(20, 29, 79)',
              borderRadius: '5px',
              paddingTop: '0.1rem',
              paddingBottom: '0.1rem',
              paddingLeft: '0.3rem',
              paddingRight: '0.3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '0.5rem',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: attending ? '#4CAF50' : 'rgb(20, 29, 79, 0.8)',
              },
            }}
          >
            <Typography
              color='white'
              fontSize={'0.8125rem'}
              width={'3.48rem'}
              textAlign={'center'}
            >
              {attending ? 'Applied' : 'Join Now'}
            </Typography>
          </Box>
          <IconsContainer
            icons={[
              {
                name: 'FaShareSquare',
                isClickable: true,
                color: '#333333',
                hoverColor: '#e4e4e4',
                size: '1.24rem',
              },
            ]}
            onIconClick={handleUserClick}
          />
        </Box>
      );
    }
  };

  return renderIcons();
}

export default EventIcons;
