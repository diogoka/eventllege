import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { EventContext } from '@/context/eventContext';
import axios from 'axios';
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';

type Tag = {
  id_tag: number;
  name_tag: string;
};

export default function RadioBtn() {
  const [radioTags, setRadioTags] = useState<Tag[]>([]);
  const { createdEvent, dispatch } = useContext(EventContext);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/tags')
      .then((res) => {
        setRadioTags(res.data);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  }, []);
  console.log('radioTags: ', radioTags);

  const online = radioTags.find((radioTag) => radioTag.id_tag === 16);
  const inPerson = radioTags.find((radioTag) => radioTag.id_tag === 17);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // dispatch({
    //   type: 'UPDATE_SELECTED_TAGS',
    //   payload: { ...createdEvent,  event.target.value  },
    // })
  };

  return (
    <FormControl>
      <FormLabel id='demo-row-radio-buttons-group-label'>
        Place {''}
        <Box component={'span'} sx={{ color: '#f14c4c' }}>
          *
        </Box>
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby='demo-row-radio-buttons-group-label'
        name='row-radio-buttons-group'
      >
        <FormControlLabel value={online} control={<Radio />} label='Online' />
        <FormControlLabel
          value={inPerson}
          control={<Radio />}
          label='In Person'
        />
      </RadioGroup>
    </FormControl>
  );
}
