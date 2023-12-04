import { useState, useContext } from 'react';
import { Box } from '@mui/material';
import { DetailPageContext } from '../../app/events/[id]/page';
import IconsContainer from '../icons/iconsContainer';
import { UserContext } from '@/context/userContext';
import { Props } from './detail-container';

const DetailIconContainer = ({
  otherInfo,
  applied,
  organizerEvent,
  forPreview,
}: Props) => {
  const { loginStatus } = useContext(UserContext);
  const { setIsAlertVisible } = useContext(DetailPageContext);
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleUserClick = (iconName: string) => {
    if (iconName == 'FaShareSquare') {
      navigator.clipboard
        .writeText(`${url}/events/${otherInfo?.id_event}`)
        .then(() => {
          setIsAlertVisible(true);
          setTimeout(() => {
            setIsAlertVisible(false);
          }, 3000);
        })
        .catch((err) => {
          console.error('Failed to copy URL: ', err);
        });
    } else if (iconName == 'FaHeart') {
      console.log('Fav button');
    }
  };

  const iconsRight = organizerEvent
    ? [{ name: 'FaShareSquare', isClickable: true, color: '#333333' }]
    : [
        { name: 'FaHeart', isClickable: true, color: 'deeppink' },
        { name: 'FaShareSquare', isClickable: true, color: '#333333' },
      ];

  return (
    <Box
      display={loginStatus == 'Logged In' ? 'flex' : 'none'}
      justifyContent='space-between'
      visibility={forPreview ? 'hidden' : 'visible'}
    >
      <Box
        visibility={applied && !organizerEvent ? 'visible' : 'hidden'}
        display='flex'
        alignItems='center'
      >
        <IconsContainer
          icons={[
            { name: 'FaCheckSquare', isClickable: false, color: 'green' },
          ]}
          onIconClick={() => {
            return;
          }}
        />
        <Box sx={{ display: 'inline', marginTop: '3px' }}>Applied</Box>
      </Box>
      <Box>
        <IconsContainer icons={iconsRight} onIconClick={handleUserClick} />
      </Box>
    </Box>
  );
};

export default DetailIconContainer;
