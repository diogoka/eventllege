import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Button, useMediaQuery, Stack } from '@mui/material';
import axios from 'axios';
import ReviewsSummary from './reviewsSummary';
import ReviewsList from './reviewsList';
import ModalRating from './modal-review';
import { UserContext } from '@/context/userContext';

const boxNoReviewStyle = {
  backgroundColor: '#3333330D',
  height: '7.625rem',
  borderRadius: '0.9375rem',
  marginTop: '1rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

type Props = {
  id_event: number;
  applied: boolean;
};

export interface Review {
  id_review: number;
  date_review: string;
  description_review: string;
  name_user: string;
  rating: number;
  id_user: string;
}

function Review({ id_event, applied }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [hasReview, setHasReview] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { user } = useContext(UserContext);
  const laptopQuery = useMediaQuery('(min-width:768px)');
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/events/reviews/${id_event}`)
      .then((res) => {
        setReviews(res.data.reviews);
        if (res.data.reviews.length > 0) {
          setHasReview(true);
        }
      });
  }, []);

  const updateReviews = (newReview: Review) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
    setHasReview(true);
    handleClose();
  };

  return (
    <>
      <Box sx={{ marginTop: '1rem' }}>
        <Typography variant='h2' fontWeight='bold'>
          Reviews
        </Typography>
        {applied && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant='contained'
              color='primary'
              sx={{ marginTop: '1rem', width: '18.4375rem' }}
              onClick={handleOpen}
            >
              Add Review
            </Button>
          </Box>
        )}

        {hasReview ? (
          <Stack
            direction={laptopQuery ? 'row' : 'column'}
            spacing={laptopQuery ? 2 : 0}
            sx={{ marginTop: '1rem' }}
          >
            <ReviewsList reviews={reviews} laptopQuery={laptopQuery} />
          </Stack>
        ) : (
          <Box sx={boxNoReviewStyle}>
            <Typography variant='h2'>No Reviews</Typography>
          </Box>
        )}
      </Box>
      <ModalRating
        user_id={user!.id}
        event_id={id_event}
        user_name={user!.name}
        openModal={openModal}
        handleClose={handleClose}
        updateReviews={updateReviews}
        laptopQuery={laptopQuery}
      />
    </>
  );
}

export default Review;
