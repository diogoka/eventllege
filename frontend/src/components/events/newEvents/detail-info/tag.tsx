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
  // selectedTags: number[];
  setSelectedTags: (value: Tag[]) => void;
  // setSelectedTags: (value: number[]) => void;
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

  // useEffect(() => {
  //   // Update selected tags once tags are fetched
  //   if (tags.length > 0 && selectedTags.length === 0) {
  //     setSelectedTags(tags);
  //   }
  // }, [tags, selectedTags, setSelectedTags]);

  const selectedId = selectedTags.map((tag) => tag.id_tag);
  // const handleChange = (event: SelectChangeEvent<typeof selectedTags>) => {
  const handleChange = async (event: SelectChangeEvent<typeof selectedId>) => {
    const {
      target: { value },
    } = event;
    console.log('selected tags: ', event);

    const selectedValue =
      typeof value === 'string' ? value.split(',').map(Number) : value;

    try {
      const response = await axios.get('http://localhost:3001/api/tags', {
        params: { ids: selectedValue.join(',') },
      });

      const selectedTagsName = response.data.map((tagData: Tag) => ({
        id_tag: tagData.id_tag,
        name_tag: tagData.name_tag,
      }));

      setSelectedTags(selectedTagsName);
    } catch (error) {
      console.error(error);
    }

    // setSelectedTags(
    //   typeof value === 'string'
    //     ? value.split(',').map((tagId) => ({
    //         id_tag: parseInt(tagId),
    //         name_tag: 'SomeName',
    //       }))
    //     : (value as Tag[])
    // );
  };

  // console.log('selectedTags', selectedTags);

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedTags.map((tag) => tag.id_tag)}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selectedIds) => {
            // const selectedNames = tags
            //   .filter((tag) => selected.includes(tag))
            //   .map((tag) => tag.name_tag);
            // return selectedNames.join(',');
            const selectedNames = selectedTags
              .filter((tag) => selectedIds.includes(tag.id_tag))
              .map((tag) => tag.name_tag);
            return selectedNames.join(',');
          }}
          MenuProps={MenuProps}
        >
          {tags.map((tag) => (
            <MenuItem key={tag.id_tag} value={tag.id_tag}>
              {/* <Checkbox checked={selectedTags.indexOf(tag) > -1} /> */}
              {/* <Checkbox checked={selectedTags.indexOf(tag.id_tag) > -1} /> */}
              <Checkbox checked={selectedId.indexOf(tag.id_tag) > -1} />
              <ListItemText primary={tag.name_tag} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
