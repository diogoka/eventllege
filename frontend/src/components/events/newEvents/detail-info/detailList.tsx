import React from 'react';
import Price from './price';
import Capacity from './capacity';
import Category from './category';
import Tag from './tag';
export default function DetailList() {
  return (
    <>
      <Price />
      <Capacity />
      <Category />
      <Tag />
    </>
  );
}
