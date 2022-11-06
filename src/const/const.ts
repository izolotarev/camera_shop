export enum ActionType {
  LoadProducts = 'PRODUCTS/LOAD_PRODUCTS',
  LoadPromo = 'PRODUCTS/LOAD_PROMO',
  SelectProduct = 'PRODUCTS/SELECT_PRODUCT_TO_ADD_TO_BASKET',
  OpenAddItemPopup = 'PRODUCTS/OPEN_ADD_ITEM_POPUP',
  CloseAddItemPopup = 'PRODUCTS/CLOSE_ADD_ITEM_POPUP',
  LoadProductById = 'PRODUCTS/LOAD_PRODUCT_BY_ID',
  ClearProductById = 'PRODUCTS/CLEAR_PRODUCT',
  LoadSimilarProducts = 'PRODUCTS/LOAD_SIMILAR_PRODUCTS',
  LoadReviews = 'REVIEWS/LOAD_REVIEWS',
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
