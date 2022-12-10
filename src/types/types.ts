import { RootState } from '../store/reducers/root-reducer';
import { Action } from 'redux';
import { ThunkAction} from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { CatalogSortOrder, CatalogSortType, FilterNames, SearchParams } from '../const/const';

export type ProductState = {
  products: ProductType[],
  productsTotalCount: number,
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
  searchResultProducts: ProductType[],
  searchResultProductsLoaded: boolean,
  filterSettings?: FilterSettingsType,
  filterSettingsLoaded: boolean,
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

export type FilterSettingsType = {
  minPrice: number;
  maxPrice: number;
}

export type MapFilterNameToParamType = {
  [key: string]: ParamValueType;
};

export type ParamValueType = {
  param: SearchParams,
  value: string,
}

export type ProductsFilterState = {
  [FilterNames.PriceMin] : string,
  [FilterNames.PriceMax] : string,
  [FilterNames.Photocamera] : boolean,
  [FilterNames.Videocamera] : boolean,
  [FilterNames.Digital] : boolean,
  [FilterNames.Film] : boolean,
  [FilterNames.Snapshot] : boolean,
  [FilterNames.Collection] : boolean,
  [FilterNames.Zero] : boolean,
  [FilterNames.NonProfessional] : boolean,
  [FilterNames.Professional] : boolean,
}

export type ProductsSortingState = {
  catalogSortType: CatalogSortType,
  catalogSortOrder: CatalogSortOrder,
}
