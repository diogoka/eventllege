'use client';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '@/context/userContext';
import { EventContext } from '@/context/eventContext';
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { EventData } from './page'

export default function ButtonsForPreview(
  { forMobile, tempState } : { forMobile:boolean; tempState:EventData; }){

  const { user } = useContext( UserContext )
  const { dispatch, initialState, addImage } = useContext( EventContext );

  const router = useRouter();
    
  const submitEventHandler =()=> {

    const formData = new FormData();

    formData.append('owner', user!.id);
    formData.append('title', tempState.name_event);
    formData.append('description', tempState.description_event);
    formData.append('spots', tempState.capacity_event.toString());
    formData.append('location', tempState.location_event);
    formData.append('price', tempState.price_event.toString());
    formData.append('category', tempState.category_event);

    tempState.tags.forEach((tag,key) => {
      formData.append(`tagId[${key}]`, tag.id_tag.toString());
    })

    addImage && formData.append('picture', addImage);

    tempState.dates_event.forEach((date, key) => {
      formData.append(`dates[${key}][dateStart]`, date.date_event_start.toString());
      formData.append(`dates[${key}][dateEnd]`, date.date_event_end.toString());
    });
  
    axios
    .post('http://localhost:3001/api/events/new', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => {
      console.log('axios', res.data);
      router.replace(`/events/?isPublished=true`);
      
      dispatch({
        type: 'RESET',
        payload: initialState,
      })

    })
    .catch((err) => {
      // console.error('Err:',err.response.data);
      console.error('Err:',err.response);
    });

  }// submitEventHandler

  const buttonWidth = { width:forMobile? '47%':  '200px'}

  return (

    <Box
      display='flex'
      justifyContent={forMobile?'space-between':'center'}
      sx={{ marginBlock:forMobile? '25px' : '15px' }}
    >

      <Box style={ buttonWidth } marginRight={forMobile?0:'50px'}>
        
        <Button
          type='submit'
          variant='outlined'
          color='primary'
          fullWidth
          onClick={() => 
            // editEventHandler()
            {router.push('/events/new');}
          }
        >
          Edit
        </Button>
      </Box>

      <Box style={ buttonWidth }>
        <Button
          type='submit'
          variant='outlined'
          color='error'
          fullWidth
          onClick={() => submitEventHandler()}
        >
          Create
        </Button>
      </Box>

    </Box>

  );
}
