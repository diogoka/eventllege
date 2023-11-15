'use client';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '@/context/userContext';
import { EventContext } from '@/context/eventContext';
import { Stack } from '@mui/material';

export default function PreviewEventPage() {

  const { eventData, setEventData } = useContext(EventContext);
  const { user } = useContext(UserContext);
  
  return (
    <Stack>
      Preview Page
    </Stack>
  );
}
