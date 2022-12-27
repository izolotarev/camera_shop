import { createAction } from '@reduxjs/toolkit';
import { ActionType, CatalogSortOrder, CatalogSortType } from '../../const/const';
import { ProductsFilterState, ProductType, PromoType, ReviewType, } from '../../types/types';

export const loadProducts = createAction(
  ActionType.LoadProducts,
  (products: ProductType[]) => ({
    payload: {
      products,
    },
  }),
);

export const clearProducts = createAction(ActionType.ClearProducts);

export const loadProductsTotalCount = createAction(
  ActionType.LoadProductsTotalCount,
  (productsTotalCount: number) => ({
    payload: {
      productsTotalCount,
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

export const selectProductToAddToBasket = createAction(
  ActionType.SelectProductToAddToBasket,
  (product: ProductType) => ({
    payload: {
      product,
    }
  })
);

export const selectProductToRemoveFromBasket = createAction(
  ActionType.SelectProductToRemoveFromBasket,
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
export const openRemoveItemPopup = createAction(ActionType.OpenRemoveItemPopup);
export const closeRemoveItemPopup = createAction(ActionType.CloseRemoveItemPopup);

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

export const postReviewError = createAction(ActionType.PostReviewError);

export const clearPostReviewStatus = createAction(ActionType.ClearPostReviewStatus);

export const clearPostReviewError = createAction(ActionType.ClearPostReviewError);

export const openAddReviewSuccessPopup = createAction(ActionType.OpenAddReviewSuccessPopup);
export const closeAddReviewSuccessPopup = createAction(ActionType.CloseAddReviewSuccessPopup);

export const loadProductsFromSearch = createAction(
  ActionType.LoadProductsFromSearch,
  (searchResultProducts: ProductType[]) => ({
    payload: {
      searchResultProducts,
    },
  }),
);

export const clearProductsFromSearch = createAction(ActionType.ClearProductsFromSearch);

export const loadFilterSettings = createAction(
  ActionType.LoadFilterSettings,
  (products: ProductType[]) => ({
    payload: {
      products,
    },
  }),
);

export const clearFilterSettings = createAction(ActionType.ClearFilterSettings);

export const applyProductsFilter = createAction(
  ActionType.ApplyProductsFilter,
  (filterState: ProductsFilterState) => ({
    payload: filterState,
  }),
);

export const clearProductFilters = createAction(ActionType.ClearProductsFilters);

export const applySortType = createAction(
  ActionType.ApplySortType,
  (sortType: CatalogSortType) => ({
    payload: {
      sortType
    },
  })
);

export const applySortOrder = createAction(
  ActionType.ApplySortOrder,
  (sortOrder: CatalogSortOrder) => ({
    payload: {
      sortOrder
    },
  })
);

export const clearProductsSorting = createAction(ActionType.ClearProductsSorting);

export const addProductToBasket = createAction(
  ActionType.AddProductToBasket,
  (product: ProductType) => ({
    payload: {
      product,
    },
  }),
);

export const setProductQtyInBasket = createAction(
  ActionType.SetProductQtyInBasket,
  (product: ProductType, qty: number) => ({
    payload: {
      product,
      qty
    }
  })
);

export const removeProductFromBasket = createAction(
  ActionType.RemoveProductFromBasket,
  (product: ProductType) => ({
    payload: {
      product
    }
  })
);

export const postCouponAction = createAction(
  ActionType.PostCoupon,
  (salePercent: number) => ({
    payload: {
      salePercent,
    }
  })
);

export const clearSalePercent = createAction(ActionType.ClearSalePercent);

export const postCouponError = createAction(ActionType.PostCouponError);
export const clearPostCouponStatus = createAction(ActionType.ClearPostCouponStatus);
export const clearPostCouponError = createAction(ActionType.ClearPostCouponError);

export const postOrderAction = createAction(ActionType.PostOrder);
export const postOrderError = createAction(ActionType.PostOrderError);
export const clearPostOrderStatus = createAction(ActionType.ClearPostOrderStatus);
export const clearPostOrderError = createAction(ActionType.ClearPostOrderError);
export const openAddOrderSuccessPopup = createAction(ActionType.OpenOrderSuccessPopup);
export const closeAddOrderSuccessPopup = createAction(ActionType.CloseOrderSuccessPopup);
