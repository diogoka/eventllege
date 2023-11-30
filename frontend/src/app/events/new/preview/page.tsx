'use client';
import { useState, useEffect, useContext } from 'react';
import { EventContext } from '@/context/eventContext';
import { Box, Stack, Typography, Link } from '@mui/material';
import dayjs from 'dayjs'; // Remove
import DetailContainer from '@/components/event/detail-container';
import DetailInfo from '@/components/event/detail-info';
import DetailIconContainer from '@/components/event/detail-icon-container';
import ImageHelper from '@/components/common/image-helper';
import IconsContainer from '@/components/icons/iconsContainer';
import ButtonsForPreview from './button';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { setKey, fromAddress } from 'react-geocode';
import { useSearchParams } from 'next/navigation';

export interface DateRange {
  date_event_start: dayjs.Dayjs;
  date_event_end: dayjs.Dayjs;
}

type Tag = {
  id_tag: number;
  name_tag: string;
};

export type EventData = {
  name_event: string;
  description_event: string;
  dates_event: DateRange[];
  capacity_event: number;
  location_event: string;
  price_event: number;
  tags: Tag[];
  category_event: string;
};

type Coordinate = {
  lat: number;
  lng: number;
};

export default function PreviewEventPage() {
  const searchParams = useSearchParams();

  const { createdEvent, addImage } = useContext(EventContext);
  const [tempState, setTempState] = useState<EventData>();
  const [forMobile, setForMobile] = useState<boolean>();
  const [forPreview, setForPreview] = useState<boolean>(true);
  const [coordinate, setCoordinate] = useState<Coordinate>();

  const [eventId, setEventId] = useState<number>();

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    window.innerWidth <= 768 ? setForMobile(true) : setForMobile(false);

    const newArray = createdEvent.dates.map((date) => ({
      date_event_start: date.dateStart,
      date_event_end: date.dateEnd,
    }));

    setTempState({
      name_event: createdEvent.name_event,
      description_event: createdEvent.description_event,
      dates_event: newArray,
      capacity_event: createdEvent.capacity_event,
      location_event: createdEvent.location_event,
      price_event: createdEvent.price_event,
      tags: createdEvent.selectedTags,
      category_event: createdEvent.category_event,
    });

    setKey(apiKey!);
    fromAddress(createdEvent.location_event)
      .then(({ results }) => {
        const { lat, lng } = results[0].geometry.location;
        setCoordinate({ lat: lat, lng: lng });
      })
      .catch(console.error);

    setEventId(parseInt(searchParams.get('eventId')!));
  }, []);

  window.onresize = (e) => {
    const w = e.target as Window;
    w.innerWidth <= 768 ? setForMobile(true) : setForMobile(false);
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey!,
  });

  if (forMobile) {
    return (
      <Stack>
        <Typography
          margin='30px auto 0'
          fontSize='1.3em'
          color='crimson'
          width='fit-content'
        >
          {eventId! > 0
            ? 'Event is not updated yet.'
            : 'Event is not created yet.'}
        </Typography>

        <DetailContainer
          event={tempState!}
          otherInfo={{
            image_event: '',
            id_event: NaN,
            id_owner: '',
          }}
          applied={false}
          organizerEvent={false}
          forMobile={true}
          forPreview={forPreview}
        />

        {tempState && (
          <DetailInfo
            price={tempState.price_event}
            maxSpots={tempState.capacity_event}
            attendees={[
              {
                id: undefined,
                name: undefined,
              },
            ]}
            tags={tempState.tags}
            category={tempState.category_event}
            forMobile={true}
            forPreview={forPreview}
          />
        )}
        <ButtonsForPreview
          forMobile={forMobile}
          tempState={tempState!}
          eventId={eventId!}
        />
      </Stack>
    );
  } else {
    return (
      <>
        <Stack>
          <Typography
            margin='40px auto 0'
            fontSize='1.3em'
            color='crimson'
            width='fit-content'
          >
            {eventId! > 0
              ? 'Event is not updated yet.'
              : 'Event is not created yet.'}
          </Typography>

          <Box display='flex' margin='0 auto 90px'>
            {/* /////////// Left /////////// */}
            <Box minWidth='70%' marginRight='40px'>
              <DetailContainer
                event={tempState!}
                otherInfo={{
                  image_event: '',
                  id_event: NaN,
                  id_owner: '',
                }}
                applied={false}
                organizerEvent={false}
                forMobile={forMobile!}
                forPreview={forPreview}
              />
              {tempState && (
                <DetailInfo
                  price={tempState.price_event}
                  maxSpots={tempState.capacity_event}
                  attendees={[
                    {
                      id: undefined,
                      name: undefined,
                    },
                  ]}
                  tags={tempState.tags}
                  category={tempState.category_event}
                  forMobile={forMobile!}
                  forPreview={forPreview}
                />
              )}
            </Box>

            {/* /////////// Right /////////// */}
            <Box>
              <DetailIconContainer
                event={tempState!}
                otherInfo={{
                  image_event: '',
                  id_event: NaN,
                  id_owner: '',
                }}
                applied={false}
                organizerEvent={false}
                forMobile={forMobile!}
                forPreview={forPreview}
              />
              <Box borderRadius='7px' overflow='hidden'>
                <ImageHelper
                  src={`http://localhost:3001/img/events/${0}`}
                  width='100%'
                  height='auto'
                  alt={tempState?.name_event ?? 'Event'}
                />
              </Box>

              <Link
                href={`https://maps.google.com/?q=${tempState?.location_event}`}
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
                  <Typography>{tempState?.location_event}</Typography>
                </Box>
              </Link>

              {/* Google Map */}
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={{
                    widows: '100%',
                    height: '250px',
                    borderRadius: '7px',
                  }}
                  center={coordinate}
                  zoom={14}
                />
              ) : (
                <></>
              )}
            </Box>
            {/* //right */}
          </Box>
          {/* //flex */}
          <ButtonsForPreview
            forMobile={forMobile!}
            tempState={tempState!}
            eventId={eventId!}
          />
        </Stack>
      </>
    );
  }
}
