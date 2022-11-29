export enum ActionType {
  LoadProducts = 'PRODUCTS/LOAD_PRODUCTS',
  LoadPromo = 'PRODUCTS/LOAD_PROMO',
  SelectProduct = 'PRODUCTS/SELECT_PRODUCT_TO_ADD_TO_BASKET',
  OpenAddItemPopup = 'PRODUCTS/OPEN_ADD_ITEM_POPUP',
  CloseAddItemPopup = 'PRODUCTS/CLOSE_ADD_ITEM_POPUP',
  OpenAddItemSuccessPopup = 'PRODUCTS/OPEN_ADD_ITEM_SUCCESS_POPUP',
  CloseAddItemSuccessPopup = 'PRODUCTS/CLOSE_ADD_ITEM_SUCCESS_POPUP',
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

export const ProcuctTabNames = {
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
