import { RootState } from '../store/reducers/root-reducer';
import { Action } from 'redux';
import { ThunkAction} from 'redux-thunk';
import { AxiosInstance } from 'axios';

export type ProductState = {
  products: ProductType[],
  productsLoaded: boolean,
  promo?: PromoType,
  isPromoLoaded: boolean,
  productToAddtoBasket?: ProductType,
  isAddItemPopupOpened: boolean,
  isAddItemSuccessPopupOpened: boolean,
  product?: ProductType,
  isProductLoaded: boolean,
  similarProducts: ProductType[],
  similarProductsLoaded: boolean,
}

export type ProductType = {
  id: number,
  name: string,
  vendorCode: string,
  type: string,
  category: string,
  description: string,
  level: string,
  rating: number,
  price: number,
  previewImg: string,
  previewImg2x: string,
  previewImgWebp: string,
  previewImgWebp2x: string,
  reviewCount: number
}

export type PromoType = {
  id: number,
  name: string,
  previewImg: string,
  previewImg2x: string,
  previewImgWebp: string,
  previewImgWebp2x: string
}

export type State = RootState;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type BreadcrumbsType = {
  name: string,
  url?: string
};

export type ReviewType = {
  id: string,
  userName: string,
  advantage: string,
  disadvantage: string,
  review: string,
  rating: number,
  createAt: string,
  cameraId: number
}

export type ReviewState = {
  reviews?: ReviewType[],
  reviewsLoaded: boolean,
  postSuccess: boolean,
  postError: boolean,
  postedReview?: ReviewType,
  isAddReviewPopupOpened: boolean,
  isAddReviewSuccessPopupOpened: boolean,
}

export type PostReviewType = {
  rating?: number,
  userName: string,
  advantage: string,
  disadvantage: string,
  review: string,
  cameraId: number
}
