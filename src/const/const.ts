import { MapFilterNameToParamType } from '../types/types';

export enum ActionType {
  LoadProducts = 'PRODUCTS/LOAD_PRODUCTS',
  ClearProducts = 'PRODUCTS/CLEAR_PRODUCTS',
  LoadProductsTotalCount = 'PRODUCTS/LOAD_PRODUCTS_TOTAL_COUNT',
  LoadPromo = 'PRODUCTS/LOAD_PROMO',
  SelectProduct = 'PRODUCTS/SELECT_PRODUCT_TO_ADD_TO_BASKET',
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
  LoadProductById = 'PRODUCTS/LOAD_PRODUCT_BY_ID',
  ClearProductById = 'PRODUCTS/CLEAR_PRODUCT',
  LoadSimilarProducts = 'PRODUCTS/LOAD_SIMILAR_PRODUCTS',
  LoadReviews = 'REVIEWS/LOAD_REVIEWS',
  PostReview = 'REVIEWS/POST_REVIEW',
  PostError = 'REVIEWS/POST_REVIEW_ERROR',
  ClearPostReviewStatus = 'REVIEWS/CLEAR_POST_REVIEW_STATUS',
  ClearPostReviewError = 'REVIEWS/CLEAR_POST_REVIEW_ERROR',
  RedirectToRoute = 'USER/REDIRECT',
  ApplyProductsFilter = 'PRODUCTS/FILTER_PRODUCTS',
  ClearProductsFilters = 'PRODUCTS/CLEAR_FILTERS',
  ApplySortType = 'PRODUCTS/SORT_PRODUCTS_BY_TYPE',
  ApplySortOrder = 'PRODUCTS/SORT_PRODUCTS_BY_ORDER',
  ClearProductsSorting = 'PRODUCTS/CLEAR_SORT',
}

export const AppRoute = {
  ROOT: '/',
  CATALOG: '/catalog',
  PRODUCTS: '/cameras',
  BASKET: '/basket',
  NOT_FOUND: '/not-found',
};

export const APIRoute = {
  PRODUCTS: '/cameras',
  PROMO: '/promo',
  REVIEWS: '/reviews',
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
  Photo = 'Фотоаппарат',
  Video = 'Видеокамера',
}

export enum CameraType {
  Digital = 'Цифровая',
  Film = 'Плёночная',
  Snapshot= 'Моментальная',
  Collection = 'Коллекционная',
}

export enum CameraLevel {
  Zero = 'Нулевой',
  NonProfessional = 'Любительский',
  Professional = 'Профессиональный',
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
