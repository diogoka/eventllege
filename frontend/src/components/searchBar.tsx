'use client';
import React, { useState, ChangeEvent } from 'react';
// import { FaSearch } from "react-icons/fa";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import IconItem from './icons/iconItem';
import { Icon } from '@mui/material';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

type Props = {
  searchEvents: (text: string) => void;
};

function SearchBar({ searchEvents }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const laptopQuery = useMediaQuery('(min-width:768px)');

  const handleSearch = (event: any) => {
    event.preventDefault();
    searchEvents(searchTerm);
    setSearchTerm('');
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const gridContainerStyle = {
    marginTop: laptopQuery ? '4rem' : '2rem',
    marginBottom: laptopQuery ? '3rem' : '1rem',
    height: '3rem',
    width: laptopQuery ? '36.25rem' : '100%',
  };

  const textFieldStyle = {
    border: '0px solid #141D4F',
    borderRadius: '0px',
    borderTopLeftRadius: '5px',
    borderBottomLeftRadius: '5px',
    height: '3rem',
  };

  const gridIconContainerStyle = {
    height: '3rem',
    backgroundColor: '#141D4F',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: '5px',
    borderBottomRightRadius: '5px',
  };

  return (
    <Grid container spacing={0} style={gridContainerStyle}>
      <Grid item xs={9.5} sx={{ height: '3rem' }}>
        <TextField
          value={searchTerm}
          onChange={handleInputChange}
          fullWidth
          InputProps={{
            style: textFieldStyle,
          }}
        />
      </Grid>
      <Grid item xs={2.5} style={gridIconContainerStyle}>
        <Box>
          <IconItem
            iconName='FaSearch'
            onClick={handleSearch}
            isClickable={true}
            color='white'
            size='1.3rem'
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default SearchBar;
