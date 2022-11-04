
import { createReducer } from '@reduxjs/toolkit';
import { ProductState } from '../../../types/types';
import { clearProductById, closeAddItemPopup, loadProductById, loadProducts, loadPromo, loadSimilarProducts, openAddItemPopup, selectProductAddToBasket } from '../../actions/actions';

export const initialState: ProductState = {
  products: [],
  productsLoaded: false,
  promo: undefined,
  isPromoLoaded: false,
  productToAddtoBasket: undefined,
  isAddItemPopupOpened: false,
  product: undefined,
  isProductLoaded: false,
  similarProducts: [],
  similarProductsLoaded: false,
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
    .addCase(openAddItemPopup, (state, action) => {
      state.isAddItemPopupOpened = true;
    })
    .addCase(closeAddItemPopup, (state, action) => {
      state.isAddItemPopupOpened = false;
    })
    .addCase(loadProductById, (state, action) => {
      state.product = action.payload.product;
      state.isProductLoaded = true;
    })
    .addCase(clearProductById, (state, action) => {
      state.product = initialState.product;
      state.isProductLoaded = false;
    })
    .addCase(loadSimilarProducts, (state, action) => {
      state.similarProducts = action.payload.products;
      state.similarProductsLoaded = true;
    });
});
