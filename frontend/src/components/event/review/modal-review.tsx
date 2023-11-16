'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Stack, Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import { useEffect } from 'react';
import { set } from 'firebase/database';
import { IoMdClose } from 'react-icons/io';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type Props = {
  user_id: string;
  event_id: number;
  openModal: boolean;
  handleClose: () => void;
};

export default function ModalRating({
  user_id,
  event_id,
  openModal,
  handleClose,
}: Props) {
  const [review, setReview] = useState({
    id_user: user_id,
    description: '',
    rating: 0,
    date_review: new Date(),
  });

  const handleNewReview = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = { event_id, user_id, review };

    const postReview = await axios
      .post('http://localhost:3001/api/events/review/new', {
        id_user: user_id,
        id_event: event_id,
        review: {
          id_user: user_id,
          description: review.description,
          rating: review.rating,
          date_review: review.date_review,
        },
      })
      .then((res) => {
        console.log(res.data);
        handleClose();
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  };

  const setRating = (inputRating: number) => {
    setReview({ ...review, rating: inputRating });
  };

  const setDescription = (inputDescription: string) => {
    setReview({ ...review, description: inputDescription });
  };

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      {...{ user_id, event_id }}
    >
      <Box sx={style}>
        <Stack
          rowGap="1rem"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            height: 500,
            width: '85%',
            bgcolor: 'white',
            boxShadow: 24,
            paddingInline: '1rem',
            paddingBlock: '2rem',
            borderRadius: '1rem',
          }}
        >
          <IoMdClose
            onClick={handleClose}
            style={{
              fontSize: '2rem',
              position: 'absolute',
              inset: '0 0 auto auto',
              transform: 'translate(-50%, 50%)',
            }}
          />
          <Typography variant="h2" fontWeight="bold">
            Review
          </Typography>
          <form
            onSubmit={handleNewReview}
            style={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '1rem',
            }}
          >
            <Rating
              name="half-rating"
              defaultValue={2.5}
              precision={0.5}
              onChange={(event, newValue) => setRating(Number(newValue))}
            />

            <TextField
              id="outlined-multiline-static"
              label="Comments"
              multiline
              rows={9}
              placeholder="Tell us about your experience!"
              variant="outlined"
              onChange={(event) => setDescription(event.target.value)}
            />
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: '1rem', width: '50%' }}
                type="submit"
                value="New Review"
              >
                Submit
              </Button>
            </Box>
          </form>
        </Stack>
      </Box>
    </Modal>
  );
}
