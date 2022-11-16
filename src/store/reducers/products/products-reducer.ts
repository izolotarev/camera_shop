
import { createReducer } from '@reduxjs/toolkit';
import { ProductState } from '../../../types/types';
import { clearProductById, closeAddItemPopup, closeAddItemSuccessPopup, loadProductById, loadProducts, loadPromo, loadSimilarProducts, openAddItemPopup, openAddItemSuccessPopup, selectProductAddToBasket } from '../../actions/actions';

export const initialState: ProductState = {
  products: [],
  productsLoaded: false,
  promo: undefined,
  isPromoLoaded: false,
  productToAddtoBasket: undefined,
  isAddItemPopupOpened: false,
  isAddItemSuccessPopupOpened: false,
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
      document.body.classList.add('scroll-lock');
    })
    .addCase(closeAddItemPopup, (state, action) => {
      state.isAddItemPopupOpened = false;
      document.body.classList.remove('scroll-lock');
    })
    .addCase(openAddItemSuccessPopup, (state, action) => {
      state.isAddItemSuccessPopupOpened = true;
      document.body.classList.add('scroll-lock');
    })
    .addCase(closeAddItemSuccessPopup, (state, action) => {
      state.isAddItemSuccessPopupOpened = false;
      document.body.classList.remove('scroll-lock');
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
