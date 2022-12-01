
import { createReducer } from '@reduxjs/toolkit';
import { ProductState } from '../../../types/types';
import { extractFilterSettings } from '../../../utils/utils';
import { clearProductById, clearProductsFromSearch, closeAddItemPopup, closeAddItemSuccessPopup, loadFilterSettings, loadProductById, loadProducts, loadProductsFromSearch, loadPromo, loadSimilarProducts, openAddItemPopup, openAddItemSuccessPopup, selectProductAddToBasket } from '../../actions/actions';

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
  searchResultProducts: [],
  searchResultProductsLoaded: false,
  filterSettings: undefined,
  filterSettingsLoaded: false,
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
    .addCase(openAddItemSuccessPopup, (state, action) => {
      state.isAddItemSuccessPopupOpened = true;
    })
    .addCase(closeAddItemSuccessPopup, (state, action) => {
      state.isAddItemSuccessPopupOpened = false;
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
    })
    .addCase(loadProductsFromSearch, (state, action) => {
      state.searchResultProducts = action.payload.searchResultProducts;
      state.searchResultProductsLoaded = true;
    })
    .addCase(clearProductsFromSearch, (state, action) => {
      state.searchResultProducts = initialState.searchResultProducts;
      state.searchResultProductsLoaded = initialState.searchResultProductsLoaded;
    })
    .addCase(loadFilterSettings, (state, action) => {
      state.filterSettings = extractFilterSettings(action.payload.products);
      state.filterSettingsLoaded = true;
    });
});
