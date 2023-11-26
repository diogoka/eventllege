import { useState, useContext } from 'react';
import { Box, Typography, AlertTitle, Alert } from '@mui/material';
import ImageHelper from '@/components/common/image-helper';
import { Event, OtherInfo, DetailPageContext } from '../../app/events/[id]/page';
import IconsContainer from '../icons/iconsContainer';
import DetailIconContainer from './detail-icon-container'
import DetailTimeContainer from './detail-time-container'

export type Props = {
  event: Event;
  applied: boolean;
  organizerEvent: boolean;
  otherInfo: OtherInfo;
  forMobile: boolean;
};

const DetailContainer = ({ event, otherInfo, applied, organizerEvent, forMobile }: Props) => {
  
  const { isAlertVisible, setIsAlertVisible } = useContext(DetailPageContext);
  const locationContainerStyle = { fontSize:forMobile?'auto':'1.2em',marginTop: '3px' };
  const h1Style = !forMobile? { textAlign:'left', fontWeight: 'bold', fontSize: '2.5em' }:null;
  const timeContainerStyle = { margin:forMobile? '10px auto':'40px auto'};

  return (
    <>
      <Typography variant='h1' sx={h1Style}>
        {event?.name_event}
      </Typography>

      <Box
        display={ forMobile? 'block' : 'none'}
        style={{ marginInline: 'auto' }}
      >
        <ImageHelper
          src={`http://localhost:3001/img/events/${otherInfo?.id_event}`}
          width='100%'
          height='auto'
          alt={event?.name_event ?? 'Event'}
        />
      </Box>

      <Box display={forMobile?'block':'none'}>
        <DetailIconContainer
          event={event!}
          otherInfo={otherInfo!}
          applied={applied}
          organizerEvent={organizerEvent}
          forMobile={forMobile}
        />
      </Box>

      <Box style={timeContainerStyle}>
        <DetailTimeContainer
          event={event!}
          otherInfo={otherInfo!}
          applied={applied}
          organizerEvent={organizerEvent}
          forMobile={forMobile!}
          forFooter={false}
        />
        <Box display='flex' alignItems='center'>
          <IconsContainer
            icons={[
              { name: 'FaLocationArrow', isClickable: false, color: 'navy' },
            ]}
            onIconClick={() => {
              return;
            }}
          />
          <Typography sx={locationContainerStyle}>{event?.location_event}</Typography>
        </Box>
      </Box>

      <Box
        fontSize={forMobile?'1em':'1.1em'}
        margin={forMobile?'10px auto':'30px auto'}
      >
        <Box fontWeight='bold'>About this event:</Box>
        {event?.description_event}
      </Box>

      {isAlertVisible && (
        <Alert
          severity='success'
          onClose={() => {
            setIsAlertVisible(false);
          }}
          sx={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 9999,
          }}
        >
          <AlertTitle>URL Copied</AlertTitle>
          The event URL has been copied to your clipboard.
        </Alert>
      )}
    </>
  );
};

export default DetailContainer;
