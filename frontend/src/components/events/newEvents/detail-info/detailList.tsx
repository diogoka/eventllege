import React from 'react';
import Price from './price';
import Capacity from './capacity';
import Category from './category';
import Tag from './tag';
import { Grid } from '@mui/material';

export default function DetailList() {
  return (
    <Grid container direction='row' justifyContent='center' alignItems='center' spacing={2}>
      <Grid item xs={12}>
        <Price />
      </Grid>
      <Grid item xs={12}>
        <Capacity />
      </Grid>
      <Grid item xs={12}>
        <Category />
      </Grid>
      <Grid item xs={12}>
        <Tag />
      </Grid>
    </Grid>
  );
}
