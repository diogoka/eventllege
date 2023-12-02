import React from 'react';
import { useContext, useEffect, useState, useReducer } from 'react';
import { EventContext } from '@/context/eventContext';
import axios from 'axios';
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  SelectChangeEvent,
} from '@mui/material';

type Tag = {
  id_tag: number;
  name_tag: string;
};

export default function RadioBtn() {
  const [radioTags, setRadioTags] = useState<Tag[]>([]);
  const [selectedRadio, setSelectedRadio] = useState<number | null>(null);
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

  const handleChange = (event: SelectChangeEvent<typeof selectedRadio>) => {
    if (event.target.value) {
      const value = +event.target.value;
      setSelectedRadio(value);

      let selectedTags: Tag[] = [];

      if (value === 18) {
        selectedTags = radioTags.filter(
          (tag) => tag.id_tag === 16 || tag.id_tag === 17
        );
      } else {
        const selectedTag = radioTags.find((tag) => tag.id_tag === value);
        selectedTags = selectedTag ? [selectedTag] : [];
      }

      dispatch({
        type: 'UPDATE_SELECTED_TAGS',
        payload: {
          ...createdEvent,
          selectedTags,
        },
      });
    }
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
        value={selectedRadio}
        onChange={handleChange}
      >
        <FormControlLabel
          value={16}
          control={<Radio />}
          label='Online'
          checked={
            createdEvent &&
            createdEvent.selectedTags.some((tag) => tag.id_tag === 16)
          }
        />
        <FormControlLabel
          value={17}
          control={<Radio />}
          label='In Person'
          checked={
            createdEvent &&
            createdEvent.selectedTags.some((tag) => tag.id_tag === 17)
          }
        />
        <FormControlLabel
          value={18}
          control={<Radio />}
          label='Online and In Person'
          checked={
            createdEvent &&
            createdEvent.selectedTags.some(
              (tag) =>
                tag.id_tag === 16 &&
                createdEvent.selectedTags.some((tag) => tag.id_tag === 17)
            )
          }
        />
      </RadioGroup>
    </FormControl>
  );
}
