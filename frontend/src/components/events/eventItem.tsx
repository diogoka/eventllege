'use client';
import { Event, Tag } from '@/app/events/page';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { AlertTitle, Alert, useMediaQuery } from '@mui/material';
import ModalDelete from './modalDelete';
import axios from 'axios';
import {
  weekDayFn,
  TimeFn,
  monthDayFn,
  averageRatingFn,
} from '@/common/functions';
import EventCard from './eventCard';
import EventLine from './eventLine';
import EventIcons from './eventIcons';

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
  const handleAlert = (isOpen: boolean) => setIsAlertVisible(isOpen);
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

  const EventIcon = (
    <EventIcons
      role={user.role}
      userId={user.id}
      owner={event.id_owner}
      laptopQuery={laptopQuery}
      eventId={event.id_event}
      attending={attending}
      setModalOpen={openModal}
      handleAlertFn={handleAlert}
    />
  );

  const renderEventItem = () => {
    if (laptopQuery) {
      return (
        <>
          <EventCard
            event={event}
            tags={tags}
            oldEvent={oldEvent}
            avgRating={avgRating}
            iconsComponent={EventIcon}
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
            iconsComponent={EventIcon}
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
