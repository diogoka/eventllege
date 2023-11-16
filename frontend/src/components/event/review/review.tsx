import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';
import ReviewsSummary from './reviewsSummary';
import ReviewsList from './reviewsList';
import ModalRating from './modal-review';
import { UserContext } from '@/context/userContext';

const boxNoReviewStyle = {
  backgroundColor: '#3333330D',
  width: '18.4375rem',
  height: '7.625rem',
  borderRadius: '0.9375rem',
  marginTop: '1rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const boxReviewStyle = {
  backgroundColor: '#3333330D',
  width: '18.4375rem',
  height: '7.625rem',
  borderRadius: '0.9375rem',
  marginTop: '1rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
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

  console.log('aplied', applied);

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

  return (
    <>
      <Box sx={{ marginTop: '1rem' }}>
        <Typography variant="h2" fontWeight="bold">
          Reviews
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: '1rem' }}
          fullWidth
          onClick={handleOpen}
        >
          Add Review
        </Button>

        {hasReview ? (
          <>
            <Box sx={boxReviewStyle}>
              <ReviewsSummary reviews={reviews} />
            </Box>
            <ReviewsList reviews={reviews} />
          </>
        ) : (
          <Box sx={boxNoReviewStyle}>
            <Typography variant="h2">No Reviews</Typography>
          </Box>
        )}
      </Box>
      <ModalRating
        user_id={user!.id}
        event_id={id_event}
        openModal={openModal}
        handleClose={handleClose}
      />
    </>
  );
}

export default Review;
