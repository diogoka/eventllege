import { Box, Typography, Rating } from '@mui/material';
import ImageHelper from '../common/image-helper';
import { AiFillClockCircle } from 'react-icons/ai';
import StarIcon from '@mui/icons-material/Star';
import { Event, Tag } from '@/app/events/page';

type Props = {
  handleCardClick: () => void;
  event: Event;
  oldEvent?: boolean;
  alertCopyURLFn: () => void;
  weekDay: string;
  startTime: string;
  endTime: string;
  monthAndDay: string;
  laptopQuery: boolean;
  avgRating?: number;
  iconsComponent?: JSX.Element;
  tags: Tag[];
};

function EventLine({
  handleCardClick,
  event,
  oldEvent,
  weekDay,
  startTime,
  endTime,
  monthAndDay,
  laptopQuery,
  avgRating,
  iconsComponent,
  tags,
}: Props) {
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
    color: '#3874CB',
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
    justifyContent: laptopQuery ? 'flex-start' : 'center',
    alignItems: 'center',
    width: '100%',
  };
  return (
    <Box onClick={handleCardClick} sx={BoxStyle}>
      <Typography sx={titleStyle}>
        {event.name_event.length > 15
          ? `${event.name_event.slice(0, 18)}...`
          : event.name_event}
      </Typography>
      <Box sx={dateContainerStyle}>
        <Box sx={dayMonthStyle}>
          <AiFillClockCircle style={{ fontSize: 11 }} />
          <Typography sx={{ fontSize: 12, color: '#3874CB' }}>
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
    </Box>
  );
}

export default EventLine;
