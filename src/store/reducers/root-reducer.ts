import { combineReducers } from '@reduxjs/toolkit';
import { productsData } from './products/products-reducer';
import { reviewsData } from './reviews/reviews-reducer';


export enum NameSpace {
  products = 'PRODUCTS',
  reviews = 'REVIEWS',
}

export const rootReducer = combineReducers({
  [NameSpace.products]: productsData,
  [NameSpace.reviews]: reviewsData,
});

export type RootState = ReturnType<typeof rootReducer>;
