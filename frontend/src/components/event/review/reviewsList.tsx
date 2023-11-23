import React, { useState } from 'react';
import ReviewItem from './reviewItem';
import { Review } from './review';
import { Box, Button, Stack } from '@mui/material';

type Props = {
  reviews: Review[];
  laptopQuery: boolean;
};

function ReviewsList({ reviews, laptopQuery }: Props) {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const totalReviews = reviews.length;
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  const listStyle = {
    display: 'flex',
    flexDirection: laptopQuery ? 'row' : 'column',
    flexWrap: 'wrap',
  };

  return (
    <Stack spacing={1} useFlexGap flexWrap={'wrap'} direction={'row'}>
      {displayedReviews.map((review) => (
        <ReviewItem
          review={review}
          key={review.id_review}
          laptopQuery={laptopQuery}
        />
      ))}
      {totalReviews > 3 && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant='outlined'
            color='primary'
            sx={{
              marginTop: '1rem',
              width: laptopQuery ? '18.4375rem' : '100%',
            }}
            onClick={() => setShowAllReviews(!showAllReviews)}
          >
            {showAllReviews ? 'Show less reviews' : 'See all reviews'}
          </Button>
        </Box>
      )}
    </Stack>
  );
}

export default ReviewsList;
