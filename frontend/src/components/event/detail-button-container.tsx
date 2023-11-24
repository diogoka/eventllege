import { useState, useContext } from 'react';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { DetailPageContext,Attendee } from '../../app/events/[id]/page';
import { UserContext } from '@/context/userContext';
import { Props } from './detail-container'

const DetailButtonContainer = ({ otherInfo, applied, organizerEvent, forMobile }: Props) => {

  const { setAttendees,setApplied } = useContext(DetailPageContext);
  const { loginStatus, user } = useContext(UserContext);

  const router = useRouter();

  const cancelEvent = () => {
    axios
      .delete('http://localhost:3001/api/events/attendee', {
        data: {
          id_event: otherInfo?.id_event,
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

  const addAttendee = () => {
    axios
      .post('http://localhost:3001/api/events/attendee', {
        id_event: otherInfo?.id_event,
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

  const editEventHandler = (id: number) => {
    if (!id) {
      console.log('Id does not exist');
    } else {
      router.push(`/events/${id}/edit`);
    }
  };

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

  const margin={ marginBlock:forMobile? '25px' : '15px' }
  
  return (
    <>
      <Box
        justifyContent='space-between'
        display={ organizerEvent && loginStatus == 'Logged In' ? 'flex' : 'none' }
        sx={margin}
      >
        <Box style={{ width: '47%' }}>
          {otherInfo?.id_event ? (
            <Button
              type='submit'
              variant='outlined'
              color='primary'
              fullWidth
              onClick={() => editEventHandler(otherInfo.id_event)}
            >
              Edit
            </Button>
          ) : (
            <Box>Id is not found</Box>
          )}
        </Box>

        <Box style={{ width: '47%' }}>
          {otherInfo?.id_event ? (
            <Button
              type='submit'
              variant='outlined'
              color='error'
              fullWidth
              onClick={() => deleteEvent(otherInfo.id_event)}
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
              marginLeft: 'auto',
              width:forMobile? '100%' : '70%'
        }}
        type='submit'
        variant={applied ? 'outlined' : 'contained'}
        color={applied ? 'error' : 'primary'}
        sx={margin}
        onClick={() => {
          applied ? cancelEvent() : addAttendee();
        }}
      >
        {applied ? 'Cancel' : 'Apply'}
      </Button>
    </>
  );
};

export default DetailButtonContainer;
