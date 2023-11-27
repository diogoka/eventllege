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

  const selectedId = selectedTags.map((selectedTag) => selectedTag.id_tag);

  const handleChange = (event: SelectChangeEvent<typeof selectedId>) => {
    const {
      target: { value },
    } = event;
    console.log('selected tags: ', event);

    const selectedValue =
      typeof value === 'string' ? value.split(',').map(Number) : value;

    const selectedTagsName: Tag[] = tags.filter(
      (tag: Tag) => tag && selectedValue.includes(tag.id_tag)
    );

    if (selectedTagsName.length > 0) {
      setSelectedTags(selectedTagsName);
    }
  };

  return (
    <>
      <FormControl fullWidth required>
        <InputLabel id='demo-multiple-checkbox-label'>Tag</InputLabel>
        <Select
          labelId='demo-multiple-checkbox-label'
          id='demo-multiple-checkbox'
          multiple
          value={selectedId}
          onChange={handleChange}
          input={<OutlinedInput label='Tag' />}
          renderValue={(selectedIds) => {
            const selectedNames = selectedTags
              .filter((tag) => selectedIds.includes(tag.id_tag))
              .map((tag) => tag.name_tag);
            return selectedNames.join(',');
          }}
          MenuProps={MenuProps}
        >
          {tags.map((tag) => (
            <MenuItem key={tag.id_tag} value={tag.id_tag}>
              <Checkbox checked={selectedId.indexOf(tag.id_tag) > -1} />
              <ListItemText primary={tag.name_tag} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
