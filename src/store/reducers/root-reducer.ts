import { combineReducers } from '@reduxjs/toolkit';
import { basketData } from './basket/basket-reducer';
import { productsFilter } from './products-filter/products-filter-reducer';
import { productsSort } from './products-sorting/products-sorting-reducer';
import { productsData } from './products/products-reducer';
import { reviewsData } from './reviews/reviews-reducer';


export enum NameSpace {
  products = 'PRODUCTS',
  reviews = 'REVIEWS',
  filterProducts = 'PRODUCTS_FILTER',
  sortProducts = 'PRODUCTS_SORT',
  basket = 'BASKET',
}

export const rootReducer = combineReducers({
  [NameSpace.products]: productsData,
  [NameSpace.reviews]: reviewsData,
  [NameSpace.filterProducts]: productsFilter,
  [NameSpace.sortProducts]: productsSort,
  [NameSpace.basket]: basketData,
});

export type RootState = ReturnType<typeof rootReducer>;
