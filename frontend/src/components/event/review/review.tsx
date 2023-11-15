import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';
import ReviewsSummary from './reviewsSummary';
import ReviewsList from './reviewsList';

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
};

export interface Review {
  date_review: string;
  description_review: string;
  name_user: string;
  rating: number;
}

function Review({ id_event }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [hasReview, setHasReview] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/events/reviews/${id_event}`)
      .then((res) => {
        setReviews(res.data.reviews);
        if (res.data.reviews.length > 0) {
          setHasReview(true);
        }
      });
  }, [hasReview]);

  return (
    <Box sx={{ marginTop: '1rem' }}>
      <Typography variant="h2">Reviews</Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: '1rem' }}
        fullWidth
        onClick={() => console.log('add review')}
      >
        Add Review
      </Button>

      {hasReview ? (
        <Box sx={boxReviewStyle}>
          <ReviewsSummary reviews={reviews} />
        </Box>
      ) : (
        <Box sx={boxNoReviewStyle}>
          <Typography variant="h2">No Reviews</Typography>
        </Box>
      )}
    </Box>
  );
}

export default Review;
