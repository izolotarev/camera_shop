import { ProductType, PromoType, State } from '../../../types/types';
import { NameSpace } from '../root-reducer';

export const getProducts = (state: State): ProductType[] => state[NameSpace.products].products;
export const getProductsLoadingStatus = (state: State): boolean => state[NameSpace.products].productsLoaded;
export const getPromoLoadingStatus = (state: State): boolean => state[NameSpace.products].isPromoLoaded;
export const getPromo = (state: State): PromoType | undefined => state[NameSpace.products].promo;
export const getProductToAddToBasket = (state: State): ProductType | undefined => state[NameSpace.products].productToAddtoBasket;
export const getAddItemPopupOpenedStatus = (state: State): boolean => state[NameSpace.products].isAddItemPopupOpened;
export const getAddItemSuccessPopupOpenedStatus = (state: State): boolean => state[NameSpace.products].isAddItemSuccessPopupOpened;
export const getProductById = (state: State): ProductType | undefined => state[NameSpace.products].product;
export const getSimilarProducts = (state: State): ProductType[] => state[NameSpace.products].similarProducts;
