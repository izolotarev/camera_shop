import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../../const/const';
import { ProductType } from '../../types/types';

export const loadProducts = createAction(
  ActionType.LoadProducts,
  (products: ProductType[]) => ({
    payload: {
      products,
    },
  }),
);
