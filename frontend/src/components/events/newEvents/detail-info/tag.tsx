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
  Stack,
  Box,
} from '@mui/material';

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
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='flex-start'
      spacing={1}
      sx={{ width: '100%' }}
    >
      <InputLabel>
        Tags {''}
        <Box component={'span'} sx={{ color: '#f14c4c' }}>
          *
        </Box>
      </InputLabel>
      <FormControl fullWidth>
        <Select
          displayEmpty
          multiple
          value={selectedId}
          onChange={handleChange}
          renderValue={(selectedIds) => {
            if (selectedIds.length === 0) {
              return <em>Please select tags</em>;
            }
            const selectedNames = selectedTags
              .filter((tag) => selectedIds.includes(tag.id_tag))
              .map((tag) => tag.name_tag);
            return selectedNames.join(',');
          }}
        >
          {tags.map((tag) => (
            <MenuItem key={tag.id_tag} value={tag.id_tag}>
              <Checkbox checked={selectedId.indexOf(tag.id_tag) > -1} />
              <ListItemText primary={tag.name_tag} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
