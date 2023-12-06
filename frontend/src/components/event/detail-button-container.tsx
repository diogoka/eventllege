import { useState, useContext } from 'react';
import {
  Alert,
  AlertColor,
  AlertTitle,
  Box,
  Button,
  useMediaQuery,
} from '@mui/material';
import axios from 'axios';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { DetailPageContext, Attendee } from '../../app/events/[id]/page';
import { UserContext } from '@/context/userContext';
import { EventContext } from '@/context/eventContext';
import { Props } from './detail-container';
import ModalCancelParticipation from './modalCancelParticipation';

interface AlertState {
  title: string;
  message: string;
  severity: AlertColor;
}

const DetailButtonContainer = ({
  otherInfo,
  applied,
  organizerEvent,
  forMobile,
  maxSpots,
}: Props) => {
  const { setAttendees, setApplied } = useContext(DetailPageContext);
  const { loginStatus, user } = useContext(UserContext);
  const { showedPage, setShowedPage } = useContext(EventContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const laptopQuery = useMediaQuery('(min-width:769px)');
  const [alertMessage, setAlertMessage] = useState<AlertState>({
    title: '',
    message: '',
    severity: 'success',
  });

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const router = useRouter();
  const pathName = usePathname();
  const params = useParams();

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
        handleAlert(
          true,
          'Success',
          'You have successfully applied to this event',
          'success'
        );
        setTimeout(() => {
          handleAlert(false, '', '', 'success');
        }, 3000);
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
      if (pathName === `/events/${params.id}`) {
        setShowedPage({
          label: 'Create Event',
          path: '/events/new',
        });
      }

      router.push(`/events/${id}/edit`);
    }
  };

  const deleteEvent = (id: number) => {
    setIsModalOpen(true);
  };

  const margin = {
    marginBlock: forMobile ? '25px' : '15px',
    '&:disabled': {
      backgroundColor: '#f14c4c',
      color: '#fff',
    },
  };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const id_event = otherInfo?.id_event;
  const id_user = user?.id;

  const handleAlert = (
    isOpen: boolean,
    titleParam: string,
    messageParam: string,
    severityParam: AlertColor
  ) => {
    setAlertMessage({
      title: titleParam,
      message: messageParam,
      severity: severityParam,
    });
    setIsAlertVisible(isOpen);
  };

  const handleAlertClose = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    setIsAlertVisible(false);
  };

  const alertFn = (title: string, message: string, severity: AlertColor) => {
    return (
      <Alert
        severity={severity}
        onClose={handleAlertClose}
        variant='filled'
        sx={{
          position: 'absolute',
          bottom: '50rem',
          left: '35%',
          zIndex: 9999,
        }}
      >
        <AlertTitle sx={{ color: 'white' }}>{title}</AlertTitle>
        {message}
      </Alert>
    );
  };

  return (
    <>
      {isAlertVisible &&
        alertFn(
          alertMessage.title,
          alertMessage.message,
          alertMessage.severity
        )}
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
              Edit Event
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
        {applied ? 'Cancel' : maxSpots! === 0 ? 'No spot available' : 'Apply'}
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
        handleAlertFn={handleAlert}
      />
    </>
  );
};

export default DetailButtonContainer;
