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
  tagId: number[];
  setTagId: (value: number[]) => void;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
};

export default function DetailList(props: Props) {
  return (
    <Grid container direction='row' justifyContent='center' alignItems='center' spacing={2}>
      <Grid item xs={12}>
        <Price price={props.price} setPrice={props.setPrice} />
      </Grid>
      <Grid item xs={12}>
        <Capacity spots={props.spots} setSpots={props.setSpots} />
      </Grid>
      <Grid item xs={12}>
        <Category
          category={props.category}
          setCategory={props.setCategory}
          categories={props.categories}
          setCategories={props.setCategories}
        />
      </Grid>
      <Grid item xs={12}>
        <Tag tagId={props.tagId} setTagId={props.setTagId} tags={props.tags} setTags={props.setTags} />
      </Grid>
    </Grid>
  );
}
