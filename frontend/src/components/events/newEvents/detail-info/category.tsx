import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type Category = {
  category_course: string;
};
type Props = {
  category: string;
  setCategory: (value: string) => void;
  // categories: Category[];
  // setCategories: (categories: Category[]) => void;
};
export default function Category({ category, setCategory }: Props) {
  //categories are from server
  const [categories, setCategories] = React.useState<Category[]>([]);

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
        <InputLabel id='Category'>Category</InputLabel>
        <Select
          labelId='Category'
          value={categories.length > 0 ? category : ''}
          label='category'
          onChange={(event: SelectChangeEvent) => setCategory(event.target.value)}
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
