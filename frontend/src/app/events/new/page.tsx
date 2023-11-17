'use client';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '@/context/userContext';
import { EventContext } from '@/context/eventContext';
import { Stack } from '@mui/material';

import EventsControl from '@/components/events/newEvents/eventsControl';
import { useRouter } from 'next/navigation';

export default function NewEventPage() {
  const router = useRouter();

  const { user } = useContext(UserContext);
  const { eventData, setEventData } = useContext(EventContext);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push('http://localhost:3000/events/new/preview');

    // if (dates.some((date) => date.dateStart === null || date.dateEnd === null)) {
    //   console.log('Please select dates for all date');
    //   return;
    // }

    // if (!title || !description || !spots || !location || !price) {
    //   console.log('Please fill out all fields.');
    //   return;
    // }

    // const formData = new FormData();

    // console.log('image', image);

    // formData.append('owner', user!.id);
    // formData.append('title', title);
    // formData.append('description', description);
    // formData.append('spots', spots.toString());
    // formData.append('location', location);
    // formData.append('price', price.toString());
    // formData.append('tagId', tagId.toString());
    // formData.append('category', category);
    // if (image) formData.append('picture', image);

    // if (dates.length > 0) {
    //   dates.forEach((date, index) => {
    //     formData.append(`dates[${index}][dateStart]`, date.dateStart?.toISOString() || '');
    //     formData.append(`dates[${index}][dateEnd]`, date.dateEnd?.toISOString() || '');
    //   });
    // }

    // console.log('formData', formData);

    // axios
    //   .post('http://localhost:3001/api/events/new', formData, {
    //     headers: { 'Content-Type': 'multipart/form-data' },
    //   })
    //   .then((res) => {
    //     console.log('axios', res.data);
    //     setTitle('');
    //     setDescription('');
    //     setDates([]);
    //     setSpots(0);
    //     setLocation('');
    //     setPrice(0);
    //   })
    //   .catch((err) => {
    //     console.error(err.response.data);
    //   });
  };

  return (
    <Stack>
      <EventsControl />
    </Stack>
  );
}
