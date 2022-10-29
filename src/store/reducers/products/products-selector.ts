import { ProductType, State } from '../../../types/types';
import { NameSpace } from '../root-reducer';

export const getProducts = (state: State): ProductType[] => state[NameSpace.products].products;
export const getProductsLoadingStatus = (state: State): boolean => state[NameSpace.products].productsLoaded;
