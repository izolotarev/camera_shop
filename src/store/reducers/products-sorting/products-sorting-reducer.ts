import { createReducer } from '@reduxjs/toolkit';
import { CatalogSortOrder, CatalogSortType, SearchParams } from '../../../const/const';
import { ProductsSortingState } from '../../../types/types';
import { applySortOrder, applySortType, clearProductsSorting } from '../../actions/actions';


const searchParams = new URLSearchParams(document.location.search);
const sortTypeParam = searchParams.get(SearchParams.SortType) as CatalogSortType || null;
const sortOrderParam = searchParams.get(SearchParams.SortOrder) as CatalogSortOrder || null;

export const initialState : ProductsSortingState = {
  catalogSortType: sortTypeParam || CatalogSortType.None,
  catalogSortOrder: sortOrderParam || CatalogSortOrder.None,
};

export const productsSort = createReducer(initialState, (builder) => {
  builder
    .addCase(applySortType, (state, action) => {
      state.catalogSortType = action.payload.sortType;
    })
    .addCase(applySortOrder, (state, action) => {
      state.catalogSortOrder = action.payload.sortOrder;
    })
    .addCase(clearProductsSorting, (state, action) => {
      state.catalogSortType = initialState.catalogSortType;
      state.catalogSortOrder = initialState.catalogSortOrder;
    });
});
