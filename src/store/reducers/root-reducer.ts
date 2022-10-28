import { combineReducers } from '@reduxjs/toolkit';
import { productsData } from './products/products-reducer';


export enum NameSpace {
  products = 'PRODUCTS',
  reviews = 'REVIEWS',
}

export const rootReducer = combineReducers({
  [NameSpace.products]: productsData,
});

export type RootState = ReturnType<typeof rootReducer>;
