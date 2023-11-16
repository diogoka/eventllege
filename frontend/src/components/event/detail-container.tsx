import { useState, useContext } from 'react';
import { Box, Typography, AlertTitle, Alert } from '@mui/material';
import ImageHelper from '@/components/common/image-helper';
import {
  getDayName,
  getMonthName,
  getTimeString,
} from '../../common/functions';
import { Event } from '../../app/events/[id]/page';
import IconsContainer from '../icons/iconsContainer';
import { UserContext } from '@/context/userContext';

type Props = {
  event: Event;
  applied: boolean;
  organizerEvent: boolean;
};

const DetailContainer = ({ event, applied, organizerEvent }: Props) => {
  const { loginStatus } = useContext(UserContext);

  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);

  const startDate = new Date(event?.date_event_start);
  const endDate = new Date(event?.date_event_end);

  const startDateDetail = `
    ${getDayName(startDate.getDay())}, 
    ${getMonthName(startDate.getMonth())} ${startDate.getDate()}, 
    ${startDate.getFullYear()}, ${getTimeString(startDate)}`;

  const endDateDetail =
    startDate.getMonth() == endDate.getMonth() &&
    startDate.getDate() == endDate.getDate() &&
    startDate.getFullYear() == endDate.getFullYear()
      ? `${getTimeString(endDate)}`
      : `${getDayName(endDate.getDay())}, 
    ${getMonthName(endDate.getMonth())} ${endDate.getDate()}, 
    ${endDate.getFullYear()}, ${getTimeString(endDate)}`;

  const handleUserClick = (iconName: string) => {
    if (iconName == 'FaShareSquare') {
      navigator.clipboard
        .writeText(`http://localhost:3000/events/${event?.id_event}`)
        .then(() => {
          setIsAlertVisible(true);
          setTimeout(() => {
            setIsAlertVisible(false);
          }, 3000);
        })
        .catch((err) => {
          console.error('Failed to copy URL: ', err);
        });
    } else if (iconName == 'FaHeart') {
      console.log('Fav button');
    }
  };

  const MarginTop = { marginTop: '0.5rem' };

  const iconsRight = organizerEvent
    ? [{ name: 'FaShareSquare', isClickable: true, color: '#333333' }]
    : [
        { name: 'FaHeart', isClickable: true, color: 'deeppink' },
        { name: 'FaShareSquare', isClickable: true, color: '#333333' },
      ];

  return (
    <>
      <Typography variant="h1">{event?.name_event}</Typography>

      <Box style={{ marginInline: 'auto' }}>
        <ImageHelper
          src={`http://localhost:3001/img/events/${event?.id_event}`}
          width="100%"
          height="auto"
          alt={event?.name_event ?? 'Event'}
        />
      </Box>

      <Box
        display={loginStatus == 'Logged In' ? 'flex' : 'none'}
        justifyContent="space-between"
      >
        <Box
          visibility={applied && !organizerEvent ? 'visible' : 'hidden'}
          display="flex"
          alignItems="center"
        >
          <IconsContainer
            icons={[
              { name: 'FaCheckSquare', isClickable: false, color: 'green' },
            ]}
            onIconClick={() => {
              return;
            }}
          />
          <Box sx={{ display: 'inline', marginTop: '0.5rem' }}>Applied</Box>
        </Box>
        <Box>
          <IconsContainer icons={iconsRight} onIconClick={handleUserClick} />
        </Box>
      </Box>

      <Box style={{ margin: '10px auto' }}>
        <Box display="flex" alignItems="center">
          <IconsContainer
            icons={[{ name: 'FaClock', isClickable: false, color: '#333333' }]}
            onIconClick={() => {
              return;
            }}
          />
          <Typography sx={MarginTop}>
            {startDateDetail}&nbsp;-&nbsp;{endDateDetail}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <IconsContainer
            icons={[
              { name: 'FaLocationArrow', isClickable: false, color: 'navy' },
            ]}
            onIconClick={() => {
              return;
            }}
          />
          <Typography sx={MarginTop}>{event?.location_event}</Typography>
        </Box>
      </Box>

      <Box>
        <Box style={{ fontWeight: 'bold' }}>About this event:</Box>
        {event?.description_event}
      </Box>

      {isAlertVisible && (
        <Alert
          severity="success"
          onClose={() => {
            setIsAlertVisible(false);
          }}
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
      )}
    </>
  );
};

export default DetailContainer;
