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

import { UserContext } from '@/context/userContext';
import { EventContext } from '@/context/eventContext';

import ModalAttendParticipation from './modal-attend-participation';
import ModalCancelParticipation from './modal-cancel-participation';
import dayjs from 'dayjs';
interface AlertState {
  title: string;
  message: string;
  severity: AlertColor;
}

export type EventDate = {
  date_event_start: dayjs.Dayjs;
  date_event_end: dayjs.Dayjs;
};

type Event = {
  name_event: string;
  description_event: string;
  dates_event: Array<EventDate>;
  location_event: string;
  capacity_event: number;
  price_event: number;
  category_event: string;
  tags: Array<Tag>;
};

export type Tag = {
  id_tag: number;
  name_tag: string;
};

export type Attendee = {
  id: string | undefined;
  name: string | undefined;
};

export type OtherInfo = {
  image_event: string;
  id_event: number;
  id_owner: string;
};

type Props = {
  event: Event;
  otherInfo: OtherInfo;
  applied: boolean;
  organizerEvent: boolean;
  forMobile: boolean;
  maxSpots?: number;
  setApplied: React.Dispatch<React.SetStateAction<boolean>>;
  setAttendees: React.Dispatch<
    React.SetStateAction<Array<Attendee> | undefined>
  >;
  forPreview?: boolean;
};

const DetailButtonContainer = ({
  event,
  otherInfo,
  applied,
  organizerEvent,
  forMobile,
  maxSpots,
  setApplied,
  setAttendees,
}: Props) => {
  const { loginStatus, user } = useContext(UserContext);
  const { showedPage, setShowedPage } = useContext(EventContext);
  const [isAttendModalOpen, setIsAttendModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
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
    setIsCancelModalOpen(true);
  };

  const handleAttendEvent = () => {
    if (event.price_event > 0) {
      setIsAttendModalOpen(true);
    } else {
      addAttendee();
    }
  };

  const addAttendee = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/attendee`, {
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
    setIsCancelModalOpen(true);
  };

  const margin = {
    marginBlock: forMobile ? '25px' : '15px',
    '&:disabled': {
      backgroundColor: '#f14c4c',
      color: '#fff',
    },
  };

  const closeAttendModal = () => setIsAttendModalOpen(false);
  const closeCancelModal = () => setIsCancelModalOpen(false);
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
          bottom: '48rem',
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
          applied ? cancelEvent() : handleAttendEvent();
        }}
        disabled={maxSpots! === 0 && !applied}
      >
        {applied ? 'Cancel' : maxSpots! === 0 ? 'No spot available' : 'Apply'}
      </Button>

      <Button
        style={{
          display: loginStatus !== 'Logged In' ? 'block' : 'none',
          marginLeft: 'auto',
          width: forMobile ? '100%' : '70%',
        }}
        type='submit'
        variant='contained'
        color='primary'
        sx={margin}
        onClick={() => {
          router.replace('/login/');
        }}
      >
        {'Log in to apply'}
      </Button>

      <ModalAttendParticipation
        isOpen={isAttendModalOpen}
        onClose={closeAttendModal}
        laptopQuery={laptopQuery}
        addAttendee={addAttendee}
      />

      <ModalCancelParticipation
        isOpen={isCancelModalOpen}
        onClose={closeCancelModal}
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
