import React, { useEffect } from 'react';
import Price from './price';
import Capacity from './capacity';
import Category from './category';
import Tag from './tag';
import { Box, Grid } from '@mui/material';

type Category = {
  category_course: string;
};

type Tag = {
  id_tag: number;
  name_tag: string;
};

type Props = {
  price: number;
  setPrice: (value: number) => void;
  spots: number;
  setSpots: (value: number) => void;
  category: string;
  setCategory: (value: string) => void;
  selectedTags: Tag[];
  setSelectedTags: (value: Tag[]) => void;
  isMobile: boolean;
};

export default function DetailList(props: Props) {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        rowSpacing={{ sm: 2, md: 3 }}
        columnSpacing={{ md: 2 }}
        sx={{ width: '100%' }}
      >
        <Grid item sm={12} md={6}>
          <Price price={props.price} setPrice={props.setPrice} />
        </Grid>
        <Grid item sm={12} md={6}>
          <Capacity spots={props.spots} setSpots={props.setSpots} />
        </Grid>
        <Grid item sm={12} md={6}>
          <Category category={props.category} setCategory={props.setCategory} />
        </Grid>
        <Grid item sm={12} md={6}>
          <Tag
            selectedTags={props.selectedTags}
            setSelectedTags={props.setSelectedTags}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
