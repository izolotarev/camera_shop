
import { createReducer } from '@reduxjs/toolkit';
import { ProductState } from '../../../types/types';
import { clearProductAddToBasket, closeAddItemPopup, loadProducts, loadPromo, openAddItemPopup, selectProductAddToBasket } from '../../actions/actions';

export const initialState: ProductState = {
  products: [],
  productsLoaded: false,
  promo: undefined,
  isPromoLoaded: false,
  productToAddtoBasket: undefined,
  isAddItemPopupOpened: false,
};

export const productsData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadProducts, (state, action) => {
      state.products = action.payload.products;
      state.productsLoaded = true;
    })
    .addCase(loadPromo, (state, action) => {
      state.promo = action.payload.promo;
      state.isPromoLoaded = true;
    })
    .addCase(selectProductAddToBasket, (state, action) => {
      state.productToAddtoBasket = action.payload.product;
    })
    .addCase(clearProductAddToBasket, (state, action) => {
      state.productToAddtoBasket = initialState.productToAddtoBasket;
    })
    .addCase(openAddItemPopup, (state, action) => {
      state.isAddItemPopupOpened = true;
    })
    .addCase(closeAddItemPopup, (state, action) => {
      state.isAddItemPopupOpened = false;
    });
});
