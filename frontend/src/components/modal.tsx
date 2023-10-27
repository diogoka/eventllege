import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

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

export default function BasicModal(props: any) {
  const [open, setOpen] = useState(false);
  const [review, setReview] = useState({
      id_user: props.userid,
      description: "",
      rating: 0,
      date_review: new Date(),
    });
    const userid = props.userid;
    const eventid = props.eventid;
    

        
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);

    const handleNewReview = async (event: React.FormEvent<HTMLFormElement>) => { 
        event.preventDefault();
        const data = { eventid, userid, review };

        const postReview = await axios
            .post(
                'http://localhost:3001/api/events/review/new',
                {
                    id_user: userid,
                    id_event: eventid,
                    review: {
                        id_user: userid,
                        description: review.description,
                        rating: review.rating,
                        date_review: review.date_review,
                    },
                }
            )
            .then((res) => {
                console.log(res.data);
                setOpen(false);
            })
            .catch((error) => {
                console.error(error.response.data);
            });
        


        
        
    }

    const setRating = (inputRating: number) => {
        setReview({...review, rating: inputRating})
        
    }

    const setDescription = (inputDescription: string) => {
        setReview({...review, description: inputDescription})
        
    }

  return (
    <div>
      <Button onClick={handleOpen}>Create a Review</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        {...props}
      >
        <Box sx={style}>
            <Stack height={1/3}>
                <form onSubmit={handleNewReview}>
                <input type="number" placeholder='rating' onChange={(event) => setRating(Number(event.target.value))}/>
                <input type="text" placeholder='description' onChange={(event) => setDescription(event.target.value)}/>
                <input type="submit" value="Register" />
                </form>
            </Stack>
        </Box>
      </Modal>
    </div>
  );
}