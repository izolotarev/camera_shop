
import { createReducer } from '@reduxjs/toolkit';
import { BasketState, } from '../../../types/types';
import { addProductToBasket, clearPostCouponError, clearPostCouponStatus, clearPostOrderError, clearPostOrderStatus, clearSalePercent, closeAddOrderSuccessPopup, closeRemoveItemPopup, openAddOrderSuccessPopup, openRemoveItemPopup, postCouponAction, postCouponError, postOrderAction, postOrderError, removeProductFromBasket, selectProductToAddToBasket, selectProductToRemoveFromBasket, setProductQtyInBasket } from '../../actions/actions';
import { findProductInBasket } from './basket-selectors';


export const initialState: BasketState = {
  items: [],
  productToAddtoBasket: undefined,
  productToRemoveFromBasket: undefined,
  isRemoveItemPopupOpened: false,
  salePercent: 0,
  postCouponSuccess: false,
  postCouponError: false,
  postOrderSuccess: false,
  postOrderError: false,
  isOrderSuccessPopupOpened: false,
};

export const basketData = createReducer(initialState, (builder) => {
  builder
    .addCase(selectProductToAddToBasket, (state, action) => {
      state.productToAddtoBasket = action.payload.product;
    })
    .addCase(selectProductToRemoveFromBasket, (state, action) => {
      state.productToRemoveFromBasket = action.payload.product;
    })
    .addCase(addProductToBasket, (state, action) => {
      const basketItem = findProductInBasket(state.items, action.payload.product.id);
      if (basketItem) {
        basketItem.qty += 1;
      } else {
        state.items.push({ product: action.payload.product, qty: 1});
      }
    })
    .addCase(setProductQtyInBasket, (state, action) => {
      const basketItem = findProductInBasket(state.items, action.payload.product.id);
      if (!basketItem) { return; }
      basketItem.qty = action.payload.qty;
    })
    .addCase(removeProductFromBasket, (state, action) => {
      state.items = state.items.filter((item) => item.product.id !== action.payload.product.id);
    })
    .addCase(openRemoveItemPopup, (state) => {
      state.isRemoveItemPopupOpened = true;
    })
    .addCase(closeRemoveItemPopup, (state) => {
      state.isRemoveItemPopupOpened = false;
    })
    .addCase(postCouponAction, (state, action) => {
      state.salePercent = action.payload.salePercent;
      state.postCouponSuccess = true;
    })
    .addCase(clearSalePercent, (state) => {
      state.salePercent = initialState.salePercent;
    })
    .addCase(postCouponError, (state) => {
      state.postCouponError = true;
    })
    .addCase(clearPostCouponStatus, (state) => {
      state.postCouponSuccess = initialState.postCouponSuccess;
    })
    .addCase(clearPostCouponError, (state) => {
      state.postCouponError = initialState.postCouponError;
    })
    .addCase(postOrderAction, (state) => {
      state.postOrderSuccess = true;
    })
    .addCase(postOrderError, (state) => {
      state.postOrderError = true;
    })
    .addCase(clearPostOrderStatus, (state) => {
      state.postOrderSuccess = initialState.postCouponSuccess;
    })
    .addCase(clearPostOrderError, (state) => {
      state.postOrderError = initialState.postOrderError;
    })
    .addCase(openAddOrderSuccessPopup, (state) => {
      state.isOrderSuccessPopupOpened = true;
    })
    .addCase(closeAddOrderSuccessPopup, (state) => {
      state.isOrderSuccessPopupOpened = false;
    });
});
