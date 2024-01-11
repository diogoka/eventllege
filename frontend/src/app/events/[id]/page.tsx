'use client';
import { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import DetailInfo from '@/components/event/detail-info';
import { Box, Stack, Typography, Link, Grid } from '@mui/material';
import DetailContainer from '@/components/event/detail-container';
import DetailIconContainer from '@/components/event/detail-icon-container';
import DetailTimeContainer from '@/components/event/detail-time-container';
import DetailButtonContainer from '@/components/event/detail-button-container';
import Review from '@/components/event/review/review';
import { UserContext } from '@/context/userContext';
import { PageContext } from '@/context/pageContext';
import ImageHelper from '@/components/common/image-helper';
import IconsContainer from '@/components/icons/iconsContainer';
import dayjs from 'dayjs';
import MapWithMarker from '@/components/map/mapWithMarker';
import { borderRadius } from '@mui/system';

type DetailPageContextProps = {
  isAlertVisible: boolean;
  setIsAlertVisible: (state: boolean) => void;
  setAttendees: (
    state: (prevData: Attendee[] | undefined) => Attendee[]
  ) => void;
  setApplied: (state: boolean) => void;
};

export const DetailPageContext = createContext<DetailPageContextProps>(
  {} as DetailPageContextProps
);

export type Attendee = {
  id: string | undefined;
  name: string | undefined;
};

export type EventDate = {
  date_event_start: dayjs.Dayjs;
  date_event_end: dayjs.Dayjs;
};

export type Tag = {
  id_tag: number;
  name_tag: string;
};

export type Event = {
  name_event: string;
  description_event: string;
  dates_event: Array<EventDate>;
  location_event: string;
  capacity_event: number;
  price_event: number;
  category_event: string;
  tags: Array<Tag>;
};

export type OtherInfo = {
  image_event: string;
  id_event: number;
  id_owner: string;
};

export default function EventPage() {
  const { notFound } = useContext(PageContext);
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [event, setEvent] = useState<Event>();
  const [otherInfo, setOtherInfo] = useState<OtherInfo>();
  const [applied, setApplied] = useState<boolean>(false);
  const [attendees, setAttendees] = useState<Array<Attendee>>();
  const [organizerEvent, setOrganizerEvent] = useState<boolean>(false);
  const [oldEvent, setOldEvent] = useState<boolean>(false);
  const [forMobile, setForMobile] = useState<boolean>();
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);

  const [forPreview, setForPreview] = useState<boolean>(false);

  const params = useParams();

  const EVENT_ID = params.id;

  useEffect(() => {
    window.innerWidth <= 768 ? setForMobile(true) : setForMobile(false);

    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${EVENT_ID}`)
      .then((res) => {
        if (!res.data.event.id_event) {
          notFound();
          return;
        }

        setEvent({
          ...res.data.event,
          dates_event: [
            {
              date_event_start: dayjs(res.data.event.date_event_start),
              date_event_end: dayjs(res.data.event.date_event_end),
            },
          ],
        });

        setAttendees([...res.data.event.attendees]);

        setOtherInfo({
          image_event: '',
          id_event: res.data.event.id_event,
          id_owner: res.data.event.id_owner,
        });

        res.data.event.attendees.map((val: Attendee) => {
          val.id == user!.id && setApplied(true);
        });

        user?.roleName == 'organizer' &&
          user?.id == res.data.event.id_owner &&
          setOrganizerEvent(true);
        let today = new Date();
        let eventDate = new Date(res.data.event.date_event_start);
        eventDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        eventDate < today && setOldEvent(true);

        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error.response);

        // notFound();
      });
  }, [applied]);

  window.onresize = (e) => {
    const w = e.target as Window;
    w.innerWidth <= 768 ? setForMobile(true) : setForMobile(false);
  };

  const provider = {
    isAlertVisible,
    setIsAlertVisible,
    setAttendees,
    setApplied,
  };

  const eventCapacity = event?.capacity_event;

  if (!otherInfo?.id_event) {
    return <></>;
  } else if (forMobile) {
    ///////////////////// Mobile /////////////////////
    return (
      <DetailPageContext.Provider value={provider}>
        <Stack>
          <DetailContainer
            event={event!}
            otherInfo={otherInfo!}
            applied={applied}
            organizerEvent={organizerEvent}
            forMobile={forMobile}
            forPreview={forPreview}
          />
          {event && (
            <DetailInfo
              price={event.price_event}
              maxSpots={event.capacity_event}
              attendees={attendees!}
              tags={event.tags}
              category={event.category_event}
              forMobile={forMobile!}
              forPreview={forPreview}
            />
          )}
          {oldEvent && (
            <Review id_event={otherInfo!.id_event} applied={applied} />
          )}

          {!oldEvent && (
            <DetailButtonContainer
              event={event!}
              otherInfo={otherInfo!}
              applied={applied}
              organizerEvent={organizerEvent}
              forMobile={forMobile}
              forPreview={forPreview}
              maxSpots={eventCapacity}
            />
          )}
        </Stack>
      </DetailPageContext.Provider>
    );
  } else {
    ///////////////////// Lap Top /////////////////////

    return (
      <DetailPageContext.Provider value={provider}>
        <>
          <Stack>
            <Box
              width='100%'
              display='flex'
              paddingTop='50px'
              justifyContent='space-between'
            >
              {/* /////////// Left /////////// */}
              <Box width='67%'>
                <DetailContainer
                  event={event!}
                  otherInfo={otherInfo!}
                  applied={applied}
                  organizerEvent={organizerEvent}
                  forMobile={forMobile!}
                  forPreview={forPreview}
                />
                {event && (
                  <DetailInfo
                    price={event.price_event}
                    maxSpots={event.capacity_event}
                    attendees={attendees!}
                    tags={event.tags}
                    category={event.category_event}
                    forMobile={forMobile!}
                    forPreview={forPreview}
                  />
                )}
              </Box>

              {/* /////////// Right /////////// */}
              <Box width='30%'>
                <DetailIconContainer
                  event={event!}
                  otherInfo={otherInfo!}
                  applied={applied}
                  organizerEvent={organizerEvent}
                  forMobile={forMobile!}
                  forPreview={forPreview}
                />
                <Box overflow='hidden'>
                  <ImageHelper
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/img/events/${otherInfo?.id_event}`}
                    width='100%'
                    height='20vw'
                    style={{
                      maxHeight: '260px',
                      borderRadius: '.5rem',
                    }}
                    alt={event?.name_event ?? 'Event'}
                  />
                </Box>
                <Link
                  href={`https://maps.google.com/?q=${event?.location_event}`}
                  target='_blank'
                >
                  <Box display='flex' marginTop='20px'>
                    <IconsContainer
                      icons={[
                        {
                          name: 'FaLocationArrow',
                          isClickable: false,
                          color: 'navy',
                        },
                      ]}
                      onIconClick={() => {
                        return;
                      }}
                    />
                    <Typography>{event?.location_event}</Typography>
                  </Box>
                </Link>
                <MapWithMarker location={event?.location_event ?? ''} />
              </Box>
              {/* //right */}
            </Box>
            {/* //flex */}
          </Stack>

          {oldEvent && (
            <Review id_event={otherInfo!.id_event} applied={applied} />
          )}

          {/* /////////// Footer /////////// */}
          {!oldEvent && (
            <Box
              padding='0 30px'
              left='0'
              width='100%'
              margin='0 auto'
              position='fixed'
              bottom='0'
              zIndex='201'
              style={{ backgroundColor: '#dedede' }}
            >
              <Box
                maxWidth='1280px'
                width='100%'
                paddingInline='40px'
                marginInline='auto'
                display='flex'
                justifyContent='space-between'
              >
                <Box
                  display='flex'
                  flexDirection='column'
                  justifyContent='center'
                >
                  <DetailTimeContainer
                    event={event!}
                    otherInfo={otherInfo!}
                    applied={applied}
                    organizerEvent={organizerEvent}
                    forMobile={forMobile!}
                  />
                  <Box marginLeft='10px' fontWeight='bold'>
                    {event?.name_event}
                  </Box>
                </Box>

                <Box width='30%'>
                  <DetailButtonContainer
                    event={event!}
                    otherInfo={otherInfo!}
                    applied={applied}
                    organizerEvent={organizerEvent}
                    forMobile={forMobile!}
                    forPreview={forPreview}
                    maxSpots={eventCapacity}
                  />
                </Box>
              </Box>
            </Box>
          )}
        </>
      </DetailPageContext.Provider>
    );
  }
}
