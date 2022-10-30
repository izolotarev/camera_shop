export enum ActionType {
  LoadProducts = 'PRODUCTS/LOAD_PRODUCTS',
  LoadPromo = 'PRODUCTS/LOAD_PROMO',
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
