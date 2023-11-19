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

type Props = {
  selectedTags: Tag[];
  setSelectedTags: (value: Tag[]) => void;
  // tags: Tag[];
  // setTags: (tags: Tag[]) => void;
};

export default function Tag({ selectedTags, setSelectedTags }: Props) {
  const [tags, setTags] = useState<Tag[]>([]);
  // Tag data from server
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

  const handleChange = (event: SelectChangeEvent<typeof selectedTags>) => {
    const {
      target: { value },
    } = event;
    // setSelectedTags(typeof value === 'string' ? value.split(',') : value);
    setSelectedTags(
      typeof value === 'string'
        ? value.split(',').map((tagId) => ({
            id_tag: parseInt(tagId),
            name_tag: 'SomeName',
          }))
        : (value as Tag[])
    );
  };

  console.log('selectedTags', selectedTags);

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedTags}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => {
            const selectedNames = tags
              .filter((tag) => selected.includes(tag))
              .map((tag) => tag.name_tag);
            return selectedNames.join(',');
          }}
          MenuProps={MenuProps}
        >
          {tags.map((tag) => (
            <MenuItem key={tag.id_tag} value={tag.id_tag}>
              <Checkbox checked={selectedTags.indexOf(tag) > -1} />
              <ListItemText primary={tag.name_tag} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
