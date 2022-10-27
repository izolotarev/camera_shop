import { RootState } from '../store/reducers/root-reducer';
import { Action } from 'redux';
import { ThunkAction} from 'redux-thunk';
import { AxiosInstance } from 'axios';

export type CameraState = {
  cameras: CameraType[];
  camerasLoaded: boolean;
  promo?: CameraType;
  isPromoLoaded: boolean;
}

export type CameraType = {
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
