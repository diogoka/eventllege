import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Checkbox,
  Select,
  SelectChangeEvent,
} from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type Tag = {
  id_tag: number;
  name_tag: string;
};

export default function Tag() {
  // user Input
  const [tagId, setTagId] = useState<number[]>([]);
  // Tag data from server
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/tags')
      .then((res) => {
        setTags(res.data);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  }, []);

  const handleChange = (event: SelectChangeEvent<typeof tagId>) => {
    const {
      target: { value },
    } = event;
    setTagId(typeof value === 'string' ? value.split(',').map(Number) : value);
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id='demo-multiple-checkbox-label'>Tag</InputLabel>
        <Select
          labelId='demo-multiple-checkbox-label'
          id='demo-multiple-checkbox'
          multiple
          value={tagId}
          onChange={handleChange}
          input={<OutlinedInput label='Tag' />}
          renderValue={(selected) => selected.join(' ,')}
          MenuProps={MenuProps}
        >
          {tags.map((tag) => (
            <MenuItem key={tag.id_tag} value={tag.id_tag}>
              <Checkbox checked={tagId.indexOf(tag.id_tag) > -1} />
              <ListItemText primary={tag.name_tag} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
