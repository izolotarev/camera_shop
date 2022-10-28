
import { createReducer } from '@reduxjs/toolkit';
import { ProductState } from '../../../types/types';
import { loadProducts } from '../../actions/actions';

export const initialState: ProductState = {
  products: [],
  productsLoaded: false,
  promo: undefined,
  isPromoLoaded: false,
};

export const productsData = createReducer(initialState, (builder) => {
  builder.addCase(loadProducts, (state, action) => {
    state.products = action.payload.products;
    state.productsLoaded = true;
  });
});
