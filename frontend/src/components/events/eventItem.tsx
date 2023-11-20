'use client';
import { Box, CardActions, CardMedia, Typography } from '@mui/material';
import { Event, Tag } from '@/app/events/page';
import IconsContainer from '../icons/iconsContainer';
import { useRouter } from 'next/navigation';
import { AiFillClockCircle } from 'react-icons/ai';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ImageHelper from '@/components/common/image-helper';
import ModalDelete from './modalDelete';
import { useEffect } from 'react';
import axios from 'axios';
import { averageRatingFn } from '@/common/functions';
import StarIcon from '@mui/icons-material/Star';
import Rating from '@mui/material/Rating';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { weekDayFn, TimeFn, monthDayFn } from '@/common/functions';
import useMediaQuery from '@mui/material/useMediaQuery';

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
  const laptopQuery = useMediaQuery('(min-width:1366px)');

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
        severity="success"
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

  const BoxStyle = {
    display: 'grid',
    gridTemplateRows: '2.5rem 2.3rem 2rem',
    gridTemplateAreas: `
        "title picture"
        "date picture"
        "description icons"
    `,
    columnGap: '1rem',
    height: '7.5rem',
    alignContent: 'center',
    borderTop: '1px solid #E0E0E0',
    cursor: 'pointer',
    marginTop: '0',
    width: '100%',
  };

  const titleStyle = {
    fontSize: '1rem',
    gridArea: 'title',
    fontWeight: '500',
  };

  const dateContainerStyle = {
    gridArea: 'date',
  };

  const dayMonthStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  };

  const timeStyle = {
    fontSize: 11,
    color: '#3874CB',
  };

  const descriptionStyle = {
    fontSize: 10,
    gridArea: 'description',
    textAlign: 'justify',
  };

  const imageContainerStyle = {
    gridArea: 'picture',
    borderRadius: '5px',
  };

  const iconContainerStyle = {
    gridArea: 'icons',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  };

  let iconsComponent: any;

  if (user.role === 'organizer' && user.id === event.id_owner) {
    iconsComponent = (
      <IconsContainer
        icons={[
          { name: 'FaEdit', isClickable: true, color: '#3874CB' },
          { name: 'FaTrashAlt', isClickable: true, color: '#D00000' },
        ]}
        onIconClick={handleOrganizerClick}
      />
    );
  } else {
    iconsComponent = (
      <IconsContainer
        icons={[
          {
            name: 'FaCheckCircle',
            isClickable: false,
            color: attending ? 'green' : '#333333',
          },
          { name: 'FaShareSquare', isClickable: true, color: '#333333' },
        ]}
        onIconClick={handleUserClick}
      />
    );
  }

  const renderEventItem = () => {
    if (laptopQuery) {
      return (
        <Card
          onClick={handleCardClick}
          sx={{ width: '23.75rem', height: '24.0625rem', borderRadius: '5px' }}
        >
          <CardMedia>
            <ImageHelper
              src={`http://localhost:3001/img/events/${event.id_event}`}
              width="23.75rem"
              height="13.75rem"
              alt={event.name_event}
            />
          </CardMedia>
          <CardContent
            sx={{
              backgroundColor: 'rgba(51, 51, 51, 0.02)',
              paddingBottom: '0',
            }}
          >
            <Typography sx={{ ...titleStyle, fontSize: '1.25rem' }}>
              {event.name_event.length > 32
                ? `${event.name_event.slice(0, 32)}...`
                : event.name_event}
            </Typography>
            <Box
              sx={{
                ...dateContainerStyle,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <AiFillClockCircle
                style={{ color: '#3874CB', fontSize: '0.6rem' }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Typography variant="body2" sx={{ color: '#3874CB' }}>
                  {weekDay}, {monthAndDay}
                </Typography>
                <Typography variant="body2" sx={{ color: '#3874CB' }}>
                  {startTime} - {endTime}
                </Typography>
              </Box>
            </Box>

            <Typography sx={{ ...descriptionStyle, fontSize: '0.75rem' }}>
              {event.description_event.length > 100
                ? `${event.description_event.slice(0, 100)}...`
                : event.description_event}
            </Typography>

            {oldEvent ? (
              <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Box sx={iconContainerStyle}>
                  <Rating
                    name="read-only"
                    value={avgRating}
                    readOnly
                    precision={0.5}
                    size="small"
                    emptyIcon={<StarIcon sx={{ fontSize: '1.125rem' }} />}
                    icon={<StarIcon sx={{ fontSize: '1.125rem' }} />}
                  />
                </Box>
              </CardActions>
            ) : (
              <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Box sx={{ ...iconContainerStyle, justifyContent: 'end' }}>
                  {iconsComponent}
                </Box>
              </CardActions>
            )}

            {isAlertVisible && alertCopyURLFn()}
            <ModalDelete
              eventId={eventId}
              eventName={event.name_event}
              isOpen={isModalOpen}
              onClose={closeModal}
              deleteEvent={deleteEvent}
            />
          </CardContent>
        </Card>
      );
    } else {
      return (
        <Box onClick={handleCardClick} sx={BoxStyle}>
          <Typography sx={titleStyle}>
            {event.name_event.length > 15
              ? `${event.name_event.slice(0, 18)}...`
              : event.name_event}
          </Typography>
          <Box sx={dateContainerStyle}>
            <Box sx={dayMonthStyle}>
              <AiFillClockCircle style={{ fontSize: 12 }} />
              <Typography sx={{ fontSize: 12 }}>
                {weekDay}, {monthAndDay}
              </Typography>
            </Box>
            <Box>
              <Typography sx={timeStyle}>
                {startTime} - {endTime}
              </Typography>
            </Box>
          </Box>

          <Typography sx={descriptionStyle}>
            {event.description_event.length > 50
              ? `${event.description_event.slice(0, 50)}...`
              : event.description_event}
          </Typography>
          <ImageHelper
            src={`http://localhost:3001/img/events/${event.id_event}`}
            width="6.25rem"
            height="4.0625rem"
            style={imageContainerStyle}
            alt={event.name_event}
          />

          {oldEvent ? (
            <Box sx={iconContainerStyle}>
              <Rating
                name="read-only"
                value={avgRating}
                readOnly
                precision={0.5}
                size="small"
                emptyIcon={<StarIcon sx={{ fontSize: '1.125rem' }} />}
                icon={<StarIcon sx={{ fontSize: '1.125rem' }} />}
              />
            </Box>
          ) : (
            <Box sx={iconContainerStyle}>{iconsComponent}</Box>
          )}

          {isAlertVisible && alertCopyURLFn()}
          <ModalDelete
            eventId={eventId}
            eventName={event.name_event}
            isOpen={isModalOpen}
            onClose={closeModal}
            deleteEvent={deleteEvent}
          />
        </Box>
      );
    }
  };

  return renderEventItem();
}

export default EventItem;
