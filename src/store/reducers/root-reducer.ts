import { combineReducers } from '@reduxjs/toolkit';
import { productsFilter } from './products-filter/products-filter';
import { productsData } from './products/products-reducer';
import { reviewsData } from './reviews/reviews-reducer';


export enum NameSpace {
  products = 'PRODUCTS',
  reviews = 'REVIEWS',
  filterProducts = 'PRODUCTS_FILTER',
}

export const rootReducer = combineReducers({
  [NameSpace.products]: productsData,
  [NameSpace.reviews]: reviewsData,
  [NameSpace.filterProducts]: productsFilter,
});

export type RootState = ReturnType<typeof rootReducer>;
