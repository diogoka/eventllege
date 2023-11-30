import { useState, useContext } from 'react';
import { Box, Button, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { DetailPageContext, Attendee } from '../../app/events/[id]/page';
import { UserContext } from '@/context/userContext';
import { Props } from './detail-container';
import ModalCancelParticipation from './modalCancelParticipation';
import { set } from 'firebase/database';

const DetailButtonContainer = ({
  otherInfo,
  applied,
  organizerEvent,
  forMobile,
  maxSpots,
}: Props) => {
  const { setAttendees, setApplied } = useContext(DetailPageContext);
  const { loginStatus, user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const laptopQuery = useMediaQuery('(min-width:769px)');

  const router = useRouter();

  const cancelEvent = () => {
    setIsModalOpen(true);
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
    setIsModalOpen(true);
  };

  const margin = { marginBlock: forMobile ? '25px' : '15px' };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const id_event = otherInfo?.id_event;
  const id_user = user?.id;

  return (
    <>
      <Box
        justifyContent='space-between'
        display={organizerEvent && loginStatus == 'Logged In' ? 'flex' : 'none'}
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
            !organizerEvent && loginStatus == 'Logged In' ? 'block' : 'none',
          marginLeft: 'auto',
          width: forMobile ? '100%' : '70%',
        }}
        type='submit'
        variant={applied ? 'outlined' : 'contained'}
        color={applied ? 'error' : 'primary'}
        sx={margin}
        onClick={() => {
          applied ? cancelEvent() : addAttendee();
        }}
        disabled={maxSpots! === 0 && !applied}
      >
        {applied ? 'Cancel' : maxSpots! < 0 ? 'No spot available' : 'Apply'}
      </Button>
      <ModalCancelParticipation
        isOpen={isModalOpen}
        onClose={closeModal}
        laptopQuery={laptopQuery}
        setApplied={setApplied}
        setAttendees={setAttendees}
        id_event={id_event}
        id_user={id_user}
        organizerEvent={organizerEvent}
      />
    </>
  );
};

export default DetailButtonContainer;
