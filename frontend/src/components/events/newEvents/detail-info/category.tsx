import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type Category = {
  category_course: string;
};

//corse select
export default function Category() {
  //user Input
  const [category, setCategory] = useState('');
  //categories are from server
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/courses/category')
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  }, []);

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Category</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={category}
          label='Age'
          onChange={(event: SelectChangeEvent) => setCategory(event.target.value as string)}
        >
          {categories.map((category: Category, index: number) => (
            <MenuItem key={index} value={category.category_course}>
              {category.category_course}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
