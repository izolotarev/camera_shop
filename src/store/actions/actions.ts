import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../../const/const';
import { ProductType, PromoType, ReviewType } from '../../types/types';

export const loadProducts = createAction(
  ActionType.LoadProducts,
  (products: ProductType[]) => ({
    payload: {
      products,
    },
  }),
);

export const loadPromo = createAction(
  ActionType.LoadPromo,
  (promo: PromoType) => ({
    payload: {
      promo,
    },
  }),
);

export const selectProductAddToBasket = createAction(
  ActionType.SelectProduct,
  (product: ProductType) => ({
    payload: {
      product,
    }
  })
);

export const openAddItemPopup = createAction(ActionType.OpenAddItemPopup);
export const closeAddItemPopup = createAction(ActionType.CloseAddItemPopup);
export const openAddItemSuccessPopup = createAction(ActionType.OpenAddItemSuccessPopup);
export const closeAddItemSuccessPopup = createAction(ActionType.CloseAddItemSuccessPopup);

export const loadProductById = createAction(
  ActionType.LoadProductById,
  (product: ProductType) => ({
    payload: {
      product,
    },
  }),
);

export const clearProductById = createAction(ActionType.ClearProductById);

export const loadSimilarProducts = createAction(
  ActionType.LoadSimilarProducts,
  (products: ProductType[]) => ({
    payload: {
      products,
    },
  }),
);

export const loadReviews = createAction(
  ActionType.LoadReviews,
  (reviews: ReviewType[]) => ({
    payload: {
      reviews,
    },
  }),
);

export const openAddReviewPopup = createAction(ActionType.OpenAddReviewPopup);
export const closeAddReviewPopup = createAction(ActionType.CloseAddReviewPopup);

export const redirectToRoute = createAction(
  ActionType.RedirectToRoute,
  (url: string) => ({
    payload: {
      url,
    },
  }),
);

export const postReviewAction = createAction(
  ActionType.PostReview,
  (review: ReviewType) => ({
    payload: {
      review,
    },
  }),
);

export const postReviewError = createAction(ActionType.PostError);

export const clearPostReviewStatus = createAction(ActionType.ClearPostReviewStatus);

export const clearPostReviewError = createAction(ActionType.ClearPostReviewError);

export const openAddReviewSuccessPopup = createAction(ActionType.OpenAddReviewSuccessPopup);
export const closeAddReviewSuccessPopup = createAction(ActionType.CloseAddReviewSuccessPopup);
