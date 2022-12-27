import { createSelector } from 'reselect';
import { BasketItemType, ProductType, State } from '../../../types/types';
import { NameSpace } from '../root-reducer';

export const getProductToAddToBasket = (state: State): ProductType | undefined => state[NameSpace.basket].productToAddtoBasket;
export const getProductToRemoveFromBasket = (state: State): ProductType | undefined => state[NameSpace.basket].productToRemoveFromBasket;
export const getRemoveItemPopupOpenedStatus = (state: State): boolean => state[NameSpace.basket].isRemoveItemPopupOpened;

export const getItems = (state: State): BasketItemType[] => state[NameSpace.basket].items;
const getProductId = (_state: State, id: number) => id;

export const findProductInBasket = (items: BasketItemType[], id: number) =>
  items.find((item) => item.product.id === id);

export const getProductInBasket = createSelector(getItems, getProductId,
  (items, id) => findProductInBasket(items, id));

export const getNumberOfProductsInBasket = createSelector(getItems, (items) => items.reduce((acc, item) => acc + item.qty, 0));

export const getBasketTotalPrice = createSelector(getItems, (items) => items.reduce((acc, item) => acc + item.product.price * item.qty, 0));

export const getProductInBasketTotal = createSelector(getProductInBasket,
  (item) => {
    if (!item) { return 0; }
    return item.product.price * item.qty;
  });

export const getSalePercent = (state: State): number => state[NameSpace.basket].salePercent;
export const getSale = createSelector(getBasketTotalPrice, getSalePercent, (totalPrice, salePercent) => salePercent * totalPrice / 100);
export const getTotalPriceMinusSale = createSelector(getBasketTotalPrice, getSale, (totalPrice, sale) => totalPrice - sale);

export const getCouponPostStatus = (state: State): boolean => state[NameSpace.basket].postCouponSuccess;
export const getCouponPostError = (state: State): boolean => state[NameSpace.basket].postCouponError;

export const getProductsInBasketIds = createSelector(getItems, (items) => items.map((item) => item.product.id));
export const getAddOrderSuccessPopupOpenedStatus = (state: State): boolean => state[NameSpace.basket].isOrderSuccessPopupOpened;
