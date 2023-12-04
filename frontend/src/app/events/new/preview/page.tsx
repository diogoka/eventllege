'use client';
import { useState, useEffect, useContext } from 'react';
import { EventContext } from '@/context/eventContext';
import { useMediaQuery, Box, Stack, Typography, Link } from '@mui/material';
import dayjs from 'dayjs'; // Remove
import DetailContainer from '@/components/event/detail-container';
import DetailInfo from '@/components/event/detail-info';
import DetailIconContainer from '@/components/event/detail-icon-container';
import ImageHelper from '@/components/common/image-helper';
import IconsContainer from '@/components/icons/iconsContainer';
import ButtonsForPreview from './button';
import { useSearchParams } from 'next/navigation';
import MapWithMarker from "@/components/map/mapWithMarker";

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

export default function PreviewEventPage() {
  const searchParams = useSearchParams();

  const { image, createdEvent } = useContext(EventContext);
  const [tempState, setTempState] = useState<EventData>();
  const [forPreview, setForPreview] = useState<boolean>(true);
  const [eventId, setEventId] = useState<number>();
  const forMobile = useMediaQuery('(max-width: 768px)');
  const [tempImage, setTempImage] = useState('');
  useEffect(() => {
    if (image) {
      setTempImage(URL.createObjectURL(image));
    }
  }, [image]);

  useEffect(() => {

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

    setEventId(parseInt(searchParams.get('eventId')!));
  }, []);

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
                  src={tempImage}
                  width='320px'
                  height='220px'
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

              <MapWithMarker location={createdEvent.location_event} />
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
