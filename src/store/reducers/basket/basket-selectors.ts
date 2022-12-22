import { createSelector } from 'reselect';
import { BasketItemType, State } from '../../../types/types';
import { NameSpace } from '../root-reducer';

export const getItems = (state: State): BasketItemType[] => state[NameSpace.basket].items;
const getProductId = (_state: State, id: number) => id;

export const getProductInBasketStatus = createSelector(getItems, getProductId,
  (items, id) => items.filter((item) => item.product.id === id).length > 0);
