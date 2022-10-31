import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../../const/const';
import { ProductType, PromoType } from '../../types/types';

export const loadProducts = createAction(
  ActionType.LoadProducts,
  (products: ProductType[]) => ({
    payload: {
      products,
    },
  }),
);

export const loadPromo = createAction(
  ActionType.LoadPromo,
  (promo: PromoType) => ({
    payload: {
      promo,
    },
  }),
);

export const selectProductAddToBasket = createAction(
  ActionType.SelectProduct,
  (product: ProductType) => ({
    payload: {
      product,
    }
  })
);

export const clearProductAddToBasket = createAction(ActionType.ClearProductAddToBasket);
