import { MapFilterNameToParamType } from '../types/types';

export enum ActionType {
  LoadProducts = 'PRODUCTS/LOAD_PRODUCTS',
  ClearProducts = 'PRODUCTS/CLEAR_PRODUCTS',
  LoadProductsTotalCount = 'PRODUCTS/LOAD_PRODUCTS_TOTAL_COUNT',
  LoadPromo = 'PRODUCTS/LOAD_PROMO',
  SelectProductToAddToBasket = 'BASKET/SELECT_PRODUCT_TO_ADD_TO_BASKET',
  SelectProductToRemoveFromBasket = 'BASKET/SELECT_PRODUCT_TO_REMOVE_FROM_BASKET',
  OpenAddItemPopup = 'PRODUCTS/OPEN_ADD_ITEM_POPUP',
  CloseAddItemPopup = 'PRODUCTS/CLOSE_ADD_ITEM_POPUP',
  OpenAddItemSuccessPopup = 'PRODUCTS/OPEN_ADD_ITEM_SUCCESS_POPUP',
  CloseAddItemSuccessPopup = 'PRODUCTS/CLOSE_ADD_ITEM_SUCCESS_POPUP',
  LoadProductsFromSearch = 'PRODUCTS/LOAD_PRODUCTS_SEARCH',
  ClearProductsFromSearch = 'PRODUCTS/CLEAR_PRODUCTS_SEARCH',
  LoadFilterSettings = 'PRODUCTS/LOAD_FILTER_SETTINGS',
  ClearFilterSettings = 'PRODUCTS/CLEAR_FILTER_SETTINGS',
  OpenAddReviewPopup = 'REVIEWS/OPEN_ADD_REVIEW_POPUP',
  CloseAddReviewPopup = 'REVIEWS/CLOSE_ADD_REVIEW_POPUP',
  OpenAddReviewSuccessPopup = 'REVIEWS/OPEN_ADD_REVIEW_SUCCESS_POPUP',
  CloseAddReviewSuccessPopup = 'REVIEWS/CLOSE_ADD_REVIEW_SUCCESS_POPUP',
  OpenRemoveItemPopup = 'BASKET/OPEN_REMOVE_ITEM_POPUP',
  CloseRemoveItemPopup = 'BASKET/CLOSE_REMOVE_ITEM_POPUP',
  LoadProductById = 'PRODUCTS/LOAD_PRODUCT_BY_ID',
  ClearProductById = 'PRODUCTS/CLEAR_PRODUCT',
  LoadSimilarProducts = 'PRODUCTS/LOAD_SIMILAR_PRODUCTS',
  LoadReviews = 'REVIEWS/LOAD_REVIEWS',
  PostReview = 'REVIEWS/POST_REVIEW',
  PostReviewError = 'REVIEWS/POST_REVIEW_ERROR',
  ClearPostReviewStatus = 'REVIEWS/CLEAR_POST_REVIEW_STATUS',
  ClearPostReviewError = 'REVIEWS/CLEAR_POST_REVIEW_ERROR',
  RedirectToRoute = 'USER/REDIRECT',
  ApplyProductsFilter = 'PRODUCTS/FILTER_PRODUCTS',
  ClearProductsFilters = 'PRODUCTS/CLEAR_FILTERS',
  ApplySortType = 'PRODUCTS/SORT_PRODUCTS_BY_TYPE',
  ApplySortOrder = 'PRODUCTS/SORT_PRODUCTS_BY_ORDER',
  ClearProductsSorting = 'PRODUCTS/CLEAR_SORT',
  AddProductToBasket = 'BASKET/ADD_PRODUCT',
  SetProductQtyInBasket = 'BASKET/SET_PRODUCT_QUANTITY',
  RemoveProductFromBasket = 'BASKET/REMOVE_PRODUCT',
  PostCoupon = 'BASKET/POST_COUPON',
  PostCouponError = 'BASKET/POST_COUPON_ERROR',
  ClearPostCouponStatus = 'BASKET/CLEAR_POST_COUPON_STATUS',
  ClearPostCouponError = 'BASKET/CLEAR_POST_COUPON_ERROR',
  ClearSalePercent = 'BASKET/CLEAR_SALE_PERCENT',
  PostOrder = 'BASKET/POST_ORDER',
  PostOrderError = 'BASKET/POST_ORDER_ERROR',
  ClearPostOrderStatus = 'BASKET/CLEAR_POST_ORDER_STATUS',
  ClearPostOrderError = 'BASKET/CLEAR_POST_ORDER_ERROR',
  OpenOrderSuccessPopup = 'BASKET/OPEN_ORDER_SUCCESS_POPUP',
  CloseOrderSuccessPopup = 'BASKET/CLOSE_ORDER_SUCCESS_POPUP',
}

export const AppRoute = {
  ROOT: '/',
  CATALOG: '/catalog',
  PRODUCTS: '/cameras',
  BASKET: '/basket',
  NOT_FOUND: '/not-found',
  ERROR: '/error',
};

export const APIRoute = {
  PRODUCTS: '/cameras',
  PROMO: '/promo',
  REVIEWS: '/reviews',
  COUPONS: '/coupons',
  ORDERS: '/orders',
};

export const MAX_PRODUCT_RATING = 5;
export const NUMBER_OF_ELEMENTS_PER_PAGE = 9;

export const ProductTabNames = {
  DESCRIPTION: 'Description',
  CHARACTERISTICS: 'Characteristics',
};

export const REVIEW_CARDS_PER_STEP = 3;

export const MIN_REVIEW_LENGTH = 5;

export enum CatalogSortType {
  Price = 'price',
  Rating = 'rating',
  None = 'none',
}

export enum CatalogSortOrder {
  Ascending = 'asc',
  Descending = 'desc',
  None = 'none',
}

export enum SearchParams {
  Start = '_start',
  End = '_end',
  SortType = '_sort',
  SortOrder = '_order',
  PriceMin = 'price_gte',
  PriceMax = 'price_lte',
  Category = 'category',
  Type = 'type',
  Level = 'level',
}

export enum FilterNames {
  PriceMin = 'priceMin',
  PriceMax = 'priceMax',
  Photocamera = 'photocamera',
  Videocamera = 'videocamera',
  Digital = 'digital',
  Film = 'film',
  Snapshot = 'snapshot',
  Collection = 'collection',
  Zero = 'zero',
  NonProfessional = 'non-professional',
  Professional = 'professional',
}

export enum CameraCategory {
  Photo = '??????????????????????',
  Video = '??????????????????????',
}

export enum CameraType {
  Digital = '????????????????',
  Film = '??????????????????',
  Snapshot= '????????????????????????',
  Collection = '??????????????????????????',
}

export enum CameraLevel {
  Zero = '??????????????',
  NonProfessional = '????????????????????????',
  Professional = '????????????????????????????????',
}

export const MapFilterNameToParam: MapFilterNameToParamType = {
  [FilterNames.PriceMin] : { param: SearchParams.PriceMin, value: '' },
  [FilterNames.PriceMax] : { param: SearchParams.PriceMax, value: '' },
  [FilterNames.Photocamera] : { param: SearchParams.Category, value: CameraCategory.Photo },
  [FilterNames.Videocamera] : { param: SearchParams.Category, value: CameraCategory.Video },
  [FilterNames.Digital] : { param: SearchParams.Type, value: CameraType.Digital },
  [FilterNames.Film] : { param: SearchParams.Type, value: CameraType.Film },
  [FilterNames.Snapshot] : { param: SearchParams.Type, value: CameraType.Snapshot },
  [FilterNames.Collection] : { param: SearchParams.Type, value: CameraType.Collection },
  [FilterNames.Zero] : { param: SearchParams.Level, value: CameraLevel.Zero },
  [FilterNames.NonProfessional] : { param: SearchParams.Level, value: CameraLevel.NonProfessional },
  [FilterNames.Professional] : { param: SearchParams.Level, value: CameraLevel.Professional },
};

export const SCROLL_LOCK_BODY_CLASS = 'scroll-lock';

export const MIN_PRODUCT_QTY = 1;
export const MAX_PRODUCT_QTY = 99;

export const INVALID_COUPON_ERROR = 'Invalid Value';

export const STATUS_CREATED_CODE = 201;
