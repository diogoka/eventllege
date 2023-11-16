import React, { useState, useEffect } from 'react';
import { Review } from './review';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';

type Props = {
  reviews: Review[];
};

function ReviewsSummary({ reviews }: Props) {
  const [numReviews, setNumReviews] = useState(0);
  const [numOfRatings, setNumOfRatings] = useState([0, 0, 0, 0, 0]);
  const [avgRating, setAvgRating] = useState(0);

  const total = reviews.length;

  const countingRating = (reviews: Review[]) => {
    const numOfRatings = [0, 0, 0, 0, 0];
    reviews.forEach((review) => {
      let index = Math.floor(review.rating);
      numOfRatings[index - 1] += 1;
    });
    return numOfRatings;
  };

  const averageRatingFn = (reviews: Review[]) => {
    const sum = reviews.reduce((acc, review) => {
      return acc + Number(review.rating);
    }, 0);
    return sum / reviews.length;
  };

  const percentage = (num: number) => {
    return (num / total) * 100;
  };

  useEffect(() => {
    setNumReviews(reviews.length);
    setAvgRating(averageRatingFn(reviews));
    setNumOfRatings(countingRating(reviews));
  }, [reviews]);

  const formattedAvgRating = avgRating.toFixed(1);

  const BoxSummaryStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    width: '100%',
  };

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 5,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === 'light' ? 300 : 300],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#faaf00' : '#308fe8',
    },
  }));

  return (
    <Box style={BoxSummaryStyle}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 8.125rem',
          gridTemplateRows: 'repeat(5, 1.2rem)',
          alignItems: 'center',
          columnGap: '0.5rem',
        }}
      >
        <Box>
          <Typography sx={{ fontSize: '1rem' }}>5</Typography>
        </Box>
        <Box sx={{ width: '100%' }}>
          <BorderLinearProgress
            variant="determinate"
            value={percentage(numOfRatings[4])}
          />
        </Box>
        <Box>
          <Typography sx={{ fontSize: '1rem' }}>4</Typography>
        </Box>
        <Box sx={{ width: '100%' }}>
          <BorderLinearProgress
            variant="determinate"
            value={percentage(numOfRatings[3])}
          />
        </Box>
        <Box>
          <Typography sx={{ fontSize: '1rem' }}>3</Typography>
        </Box>
        <Box sx={{ width: '100%' }}>
          <BorderLinearProgress
            variant="determinate"
            value={percentage(numOfRatings[2])}
          />
        </Box>
        <Box>
          <Typography sx={{ fontSize: '1rem' }}>2</Typography>
        </Box>
        <Box sx={{ width: '100%' }}>
          <BorderLinearProgress
            variant="determinate"
            value={percentage(numOfRatings[1])}
          />
        </Box>
        <Box>
          <Typography sx={{ fontSize: '1rem' }}>1</Typography>
        </Box>
        <Box sx={{ width: '100%' }}>
          <BorderLinearProgress
            variant="determinate"
            value={percentage(numOfRatings[0])}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          rowGap: '0.40rem',
        }}
      >
        <Typography variant="h2">{formattedAvgRating}</Typography>
        <Rating
          name="read-only"
          value={avgRating}
          readOnly
          size="small"
          emptyIcon={<StarIcon sx={{ fontSize: '1.125rem' }} />}
          icon={<StarIcon sx={{ fontSize: '1.125rem' }} />}
        />
        <Typography sx={{ fontSize: '0.75rem' }}>
          ({numReviews} Reviews)
        </Typography>
      </Box>
    </Box>
  );
}

export default ReviewsSummary;
