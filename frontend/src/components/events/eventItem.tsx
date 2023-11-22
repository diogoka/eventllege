'use client';
import { Event, Tag } from '@/app/events/page';
import IconsContainer from '../icons/iconsContainer';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  AlertTitle,
  Box,
  Typography,
  Alert,
  useMediaQuery,
} from '@mui/material';
import ModalDelete from './modalDelete';
import { useEffect } from 'react';
import axios from 'axios';
import {
  weekDayFn,
  TimeFn,
  monthDayFn,
  averageRatingFn,
} from '@/common/functions';
import EventCard from './eventCard';
import EventLine from './eventLine';

type Props = {
  event: Event;
  tags: Tag[];
  deleteEvent: (id: number) => void;
  user: {
    id: string | undefined;
    role: string | undefined;
  };
  attending: boolean;
  oldEvent?: boolean;
};

function EventItem({
  event,
  tags,
  user,
  deleteEvent,
  attending,
  oldEvent,
}: Props) {
  const router = useRouter();
  const weekDay = weekDayFn(event.date_event_start);
  const startTime = TimeFn(event.date_event_start);
  const endTime = TimeFn(event.date_event_end);
  const monthAndDay = monthDayFn(event.date_event_start);
  const eventId = event?.id_event;
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avgRating, setAvgRating] = useState(0);
  const laptopQuery = useMediaQuery('(min-width:768px)');

  useEffect(() => {
    getAverageRating();
  }, []);

  const getAverageRating = async () => {
    if (oldEvent) {
      await axios
        .get(`http://localhost:3001/api/events/reviews/${eventId}`)
        .then((res) => {
          setAvgRating(averageRatingFn(res.data.reviews));
        });
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsAlertVisible(true);
        setTimeout(() => {
          setIsAlertVisible(false);
        }, 3000);
      })
      .catch((err) => {
        console.error('Failed to copy URL: ', err);
      });
  };

  const handleUserClick = (iconName: string) => {
    console.log('iconName', iconName);
    if (iconName === 'FaShareSquare') {
      copyToClipboard(`http://localhost:3000/events/${eventId}`);
    }
  };

  const handleOrganizerClick = (iconName: string) => {
    if (iconName === 'FaEdit') {
      router.push(`/events/${eventId}/edit`);
    } else if (iconName === 'FaTrashAlt') {
      console.log('delete event');
      openModal();
    }
  };

  const handleCardClick = () => router.push(`/events/${eventId}`);

  const handleAlertClose = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    setIsAlertVisible(false);
  };

  const alertCopyURLFn = () => {
    return (
      <Alert
        severity='success'
        onClose={handleAlertClose}
        sx={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 9999,
        }}
      >
        <AlertTitle>URL Copied</AlertTitle>
        The event URL has been copied to your clipboard.
      </Alert>
    );
  };

  let iconsComponent: any;

  if (user.role === 'organizer' && user.id === event.id_owner) {
    iconsComponent = (
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
    );
  } else {
    iconsComponent = (
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
          <Typography color='white' fontSize={'0.8125rem'}>
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

  const renderEventItem = () => {
    if (laptopQuery) {
      return (
        <>
          <EventCard
            event={event}
            tags={tags}
            oldEvent={oldEvent}
            avgRating={avgRating}
            iconsComponent={iconsComponent}
            handleCardClick={handleCardClick}
            alertCopyURLFn={alertCopyURLFn}
            weekDay={weekDay}
            monthAndDay={monthAndDay}
            startTime={startTime}
            endTime={endTime}
            laptopQuery={laptopQuery}
          />
          {isAlertVisible && alertCopyURLFn()}
          <ModalDelete
            eventId={eventId}
            eventName={event.name_event}
            isOpen={isModalOpen}
            onClose={closeModal}
            deleteEvent={deleteEvent}
            laptopQuery={laptopQuery}
          />
        </>
      );
    } else {
      return (
        <>
          <EventLine
            event={event}
            tags={tags}
            oldEvent={oldEvent}
            avgRating={avgRating}
            iconsComponent={iconsComponent}
            handleCardClick={handleCardClick}
            alertCopyURLFn={alertCopyURLFn}
            weekDay={weekDay}
            monthAndDay={monthAndDay}
            startTime={startTime}
            endTime={endTime}
            laptopQuery={laptopQuery}
          />
          {isAlertVisible && alertCopyURLFn()}
          <ModalDelete
            eventId={eventId}
            eventName={event.name_event}
            isOpen={isModalOpen}
            onClose={closeModal}
            deleteEvent={deleteEvent}
            laptopQuery={laptopQuery}
          />
        </>
      );
    }
  };

  return renderEventItem();
}

export default EventItem;
