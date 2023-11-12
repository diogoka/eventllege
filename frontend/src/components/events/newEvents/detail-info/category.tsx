import React from 'react';
import { useState } from 'react';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

//corse select
export default function Category() {
  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Category</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={age}
          label='Age'
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}
