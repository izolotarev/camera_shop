
import { createReducer } from '@reduxjs/toolkit';
import { BasketState, } from '../../../types/types';
import { addProductToBasket } from '../../actions/actions';

export const initialState: BasketState = {
  items: [],
};

export const basketData = createReducer(initialState, (builder) => {
  builder
    .addCase(addProductToBasket, (state, action) => {
      state.items.push({ product: action.payload.product, qty: 1});
    });
});
