import React, { useState } from 'react';
import ReviewItem from './reviewItem';
import { Review } from './review';
import { Box, Button } from '@mui/material';

type Props = {
  reviews: Review[];
};

function ReviewsList({ reviews }: Props) {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const totalReviews = reviews.length;
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  return (
    <Box>
      {displayedReviews.map((review) => (
        <ReviewItem review={review} key={review.id_review} />
      ))}
      {totalReviews > 3 && (
        <Button
          variant='contained'
          color='primary'
          sx={{ marginTop: '1rem' }}
          fullWidth
          onClick={() => setShowAllReviews(!showAllReviews)}
        >
          {showAllReviews ? 'Show less reviews' : 'See all reviews'}
        </Button>
      )}
    </Box>
  );
}

export default ReviewsList;
