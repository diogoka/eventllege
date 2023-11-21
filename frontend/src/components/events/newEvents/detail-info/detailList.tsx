import React from 'react';
import Price from './price';
import Capacity from './capacity';
import Category from './category';
import Tag from './tag';
import { Grid } from '@mui/material';

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
  // selectedTags: number[];
  setSelectedTags: (value: Tag[]) => void;
  // setSelectedTags: (value: number[]) => void;
};

export default function DetailList(props: Props) {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      rowSpacing={2}
      sx={{ width: '100%' }}
    >
      <Grid item xs={12}>
        <Price price={props.price} setPrice={props.setPrice} />
      </Grid>
      <Grid item xs={12}>
        <Capacity spots={props.spots} setSpots={props.setSpots} />
      </Grid>
      <Grid item xs={12}>
        <Category category={props.category} setCategory={props.setCategory} />
      </Grid>
      <Grid item xs={12}>
        <Tag
          selectedTags={props.selectedTags}
          setSelectedTags={props.setSelectedTags}
        />
      </Grid>
    </Grid>
  );
}
