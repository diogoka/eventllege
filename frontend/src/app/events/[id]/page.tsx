'use client';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import DetailInfo from '@/components/event/detail-info';
import { Box, Stack, Typography, Button } from '@mui/material';
import DetailContainer from '@/components/event/detail-container';
import Review from '@/components/event/review/review';
import { UserContext } from '@/context/userContext';

export type Attendee = {
  id: string | undefined;
  name: string | undefined;
};

export type Event = {
  id_event: number;
  id_owner: string;
  name_event: string;
  description_event: string;
  date_event_start: string;
  date_event_end: string;
  location_event: string;
  capacity_event: number;
  price_event: number;
  image_event: string;
  category_event: string;
  tags: Array<string>;
  attendees: Array<Attendee>;
};

export default function EventPage() {
  const { user, loginStatus } = useContext(UserContext);
  const [event, setEvent] = useState<Event>();
  const [applied, setApplied] = useState<boolean>(false);
  const [attendees, setAttendees] = useState<Array<Attendee>>();
  const [organizerEvent, setOrganizerEvent] = useState<boolean>(false);
  const [oldEvent, setOldEvent] = useState<boolean>(false);

  const params = useParams();
  const router = useRouter();

  const EVENT_ID = params.id;

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/events/${EVENT_ID}`)
      .then((res) => {
        setEvent(res.data.event);
        setAttendees([...res.data.event.attendees]);

        res.data.event.attendees.map((val: Attendee) => {
          val.id == user!.id && setApplied(true);
        });

        user?.role == 'organizer' &&
          user?.id == res.data.event.id_owner &&
          setOrganizerEvent(true);
        let today = new Date();
        let eventDate = new Date(res.data.event.date_event_start);
        eventDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        eventDate < today && setOldEvent(true);
      })
      .catch((error) => {
        console.error(error.response);
      });
  }, []);

  const deleteEvent = (id: number) => {
    axios
      .delete(`http://localhost:3001/api/events/${id}`, {
        data: {
          id,
        },
      })
      .then((res: any) => {
        console.log('res', res.data.json);
      });
    router.push('/events');
  };

  const editEventHandler = (id: number) => {
    if (!id) {
      console.log('Id does not exist');
    } else {
      router.push(`/events/${id}/edit`);
    }
  };

  const addAttendee = () => {
    axios
      .post('http://localhost:3001/api/events/attendee', {
        id_event: event?.id_event,
        id_user: user?.id,
      })
      .then((res: any) => {
        setApplied(true);
        setAttendees((prevData: Array<Attendee> | undefined) => [
          ...prevData!,
          { id: user?.id, name: user?.name },
        ]);
      });
  };

  const cancelEvent = () => {
    axios
      .delete('http://localhost:3001/api/events/attendee', {
        data: {
          id_event: event?.id_event,
          id_user: user?.id,
        },
      })
      .then((res: any) => {
        setApplied(false);
        setAttendees((prevData: Array<Attendee> | undefined) => {
          return prevData!.filter((val: any) => val.id !== user?.id);
        });
      });
  };

  return (
    <Stack>
      <DetailContainer
        event={event!}
        applied={applied}
        organizerEvent={organizerEvent}
      />

      {event && (
        <DetailInfo
          price={event.price_event}
          maxSpots={event.capacity_event}
          attendees={attendees!}
          tags={event.tags}
          category={event.category_event}
        />
      )}
      {oldEvent && <Review id_event={event!.id_event} applied={applied} />}

      {!oldEvent && (
        <>
          <Box
            justifyContent="space-between"
            display={
              organizerEvent && loginStatus == 'Logged In' ? 'flex' : 'none'
            }
            sx={{ marginBlock: '25px' }}
          >
            <Box style={{ width: '47%' }}>
              {event?.id_event ? (
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={() => editEventHandler(event.id_event)}
                >
                  Edit
                </Button>
              ) : (
                <Box>Id is not found</Box>
              )}
            </Box>

            <Box style={{ width: '47%' }}>
              {event?.id_event ? (
                <Button
                  type="submit"
                  variant="outlined"
                  color="error"
                  fullWidth
                  onClick={() => deleteEvent(event.id_event)}
                >
                  Delete Event
                </Button>
              ) : (
                <Box>Id is not found</Box>
              )}
            </Box>
          </Box>

          <Button
            style={{
              display:
                !organizerEvent && loginStatus == 'Logged In'
                  ? 'block'
                  : 'none',
            }}
            type="submit"
            variant={applied ? 'outlined' : 'contained'}
            color={applied ? 'error' : 'primary'}
            fullWidth
            sx={{ margin: '25px auto' }}
            onClick={() => {
              applied ? cancelEvent() : addAttendee();
            }}
          >
            {applied ? 'Cancel' : 'Apply'}
          </Button>
        </>
      )}
    </Stack>
  );
}
