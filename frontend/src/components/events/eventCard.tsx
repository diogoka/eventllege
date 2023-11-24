import {
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Typography,
  Box,
  Rating,
} from '@mui/material';
import ImageHelper from '../common/image-helper';
import { AiFillClockCircle } from 'react-icons/ai';
import { Event, Tag } from '@/app/events/page';
import {
  StarRounded,
  EventOutlined,
  EventRounded,
  ScheduleRounded,
} from '@mui/icons-material';

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

function EventCard({
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
  const eventId = event.id_event;
  return (
    <Card
      onClick={handleCardClick}
      sx={{
        width: '23.75rem',
        height: '24.0625rem',
        borderRadius: '5px',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        },
      }}
    >
      <CardMedia>
        <ImageHelper
          src={`http://localhost:3001/img/events/${eventId}`}
          width='23.75rem'
          height='13.75rem'
          alt={event.name_event}
        />
      </CardMedia>
      <CardContent
        sx={{
          backgroundColor: 'rgba(51, 51, 51, 0.02)',
          paddingBottom: '0',
        }}
      >
        <Typography
          sx={{
            fontSize: '1.25rem',
            gridArea: 'title',
            fontWeight: '500',
          }}
        >
          {event.name_event.length > 32
            ? `${event.name_event.slice(0, 32)}...`
            : event.name_event}
        </Typography>
        <Box
          sx={{
            gridArea: 'date',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <EventRounded
            sx={{
              color: '#3874CB',
              fontSize: '0.8rem',
              marginRight: '0.1rem',
              fontWeight: 'bold',
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='body2' sx={{ color: '#3874CB' }}>
              {weekDay}, {monthAndDay}
            </Typography>
            <ScheduleRounded
              sx={{
                color: '#3874CB',
                fontSize: '0.8rem',
                marginRight: '0.1rem',
                fontWeight: 'bold',
                marginLeft: '0.8rem',
              }}
            />
            <Typography variant='body2' sx={{ color: '#3874CB' }}>
              {startTime} - {endTime}
            </Typography>
          </Box>
        </Box>

        <Typography
          sx={{
            gridArea: 'description',
            textAlign: 'justify',
            fontSize: '0.75rem',
            height: '3rem',
          }}
        >
          {event.description_event.length > 100
            ? `${event.description_event.slice(0, 100)}...`
            : event.description_event}
        </Typography>

        {oldEvent ? (
          <CardActions
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '1rem',
            }}
          >
            <Box
              sx={{
                gridArea: 'icons',
                display: 'flex',
                justifyContent: laptopQuery ? 'flex-start' : 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              {!avgRating ? (
                <Typography sx={{ fontSize: '0.8rem' }}>
                  No reviews yet
                </Typography>
              ) : (
                <Rating
                  name='read-only'
                  value={avgRating}
                  readOnly
                  precision={0.5}
                  size='small'
                  emptyIcon={<StarRounded sx={{ fontSize: '1.125rem' }} />}
                  icon={<StarRounded sx={{ fontSize: '1.125rem' }} />}
                />
              )}
            </Box>
          </CardActions>
        ) : (
          <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box
              sx={{
                gridArea: 'icons',
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'center',
                width: '100%',
              }}
            >
              {iconsComponent}
            </Box>
          </CardActions>
        )}
      </CardContent>
    </Card>
  );
}

export default EventCard;
