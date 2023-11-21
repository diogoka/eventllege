'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Typography } from '@mui/material';

const iconContainer = {
  display: 'flex',
  justifyContent: 'space-evenly',
  width: '100%',
  marginTop: '1rem',
};

const buttonStyle = {
  width: '40%',
  height: '2rem',
  bgcolor: 'grey',
  '&:hover': {
    bgcolor: 'lightgrey',
  },
};

const deleteButtonStyle = {
  width: '40%',
  height: '2rem',
  bgcolor: '#D22B2B',
  '&:hover': {
    bgcolor: 'darkred',
  },
};

type Props = {
  eventId: number;
  isOpen: boolean;
  onClose: () => void;
  deleteEvent: (id: number) => void;
  eventName?: string;
  laptopQuery: boolean;
};

export default function ModalDelete({
  eventId,
  isOpen,
  onClose,
  deleteEvent,
  eventName,
  laptopQuery,
}: Props) {
  const [open, setOpen] = useState(isOpen);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: laptopQuery ? '30%' : '90%',
    bgcolor: 'white',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '5px',
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const response = await axios
      .delete(`http://localhost:3001/api/events/${eventId}`)
      .then((res) => {
        console.log(res.data);
        setOpen(false);
        deleteEvent(eventId);
      })
      .catch((err) => {
        console.log(err);
      });

    setOpen(false);
    onClose();
  };

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setOpen(false);
    onClose();
  };

  return (
    <Box sx={{ flexGrow: 1, position: 'absolute' }}>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h2" sx={{ textAlign: 'justify' }}>
            Are you sure you want to delete the event {eventName}?
          </Typography>
          <Box sx={iconContainer}>
            <Button
              sx={buttonStyle}
              variant="contained"
              onClick={(event) => handleCancel(event)}
            >
              Cancel
            </Button>
            <Button
              sx={deleteButtonStyle}
              value="delete"
              variant="contained"
              onClick={(event) => handleDelete(event)}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
