import { RootState } from '../store/reducers/root-reducer';
import { Action } from 'redux';
import { ThunkAction} from 'redux-thunk';
import { AxiosInstance } from 'axios';

export type ProductState = {
  products: ProductType[];
  productsLoaded: boolean;
  promo?: ProductType;
  isPromoLoaded: boolean;
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

export type State = RootState;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
