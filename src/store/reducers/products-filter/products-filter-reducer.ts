import { createReducer } from '@reduxjs/toolkit';
import { CameraCategory, CameraLevel, CameraType, FilterNames, SearchParams } from '../../../const/const';
import { ProductsFilterState } from '../../../types/types';
import { applyProductsFilter, clearProductFilters, } from '../../actions/actions';

const searchParams = new URLSearchParams(document.location.search);
const priceMinParam = searchParams.get(SearchParams.PriceMin) ?? '';
const priceMaxParam = searchParams.get(SearchParams.PriceMax) ?? '';
const categoryParams = searchParams.getAll(SearchParams.Category);
const typeParams = searchParams.getAll(SearchParams.Type);
const levelParams = searchParams.getAll(SearchParams.Level);


export const initialState : ProductsFilterState = {
  [FilterNames.PriceMin] : priceMinParam,
  [FilterNames.PriceMax] : priceMaxParam,
  [FilterNames.Photocamera] : categoryParams.includes(CameraCategory.Photo),
  [FilterNames.Videocamera] : categoryParams.includes(CameraCategory.Video),
  [FilterNames.Digital] : typeParams.includes(CameraType.Digital),
  [FilterNames.Film] : typeParams.includes(CameraType.Film),
  [FilterNames.Snapshot] : typeParams.includes(CameraType.Snapshot),
  [FilterNames.Collection] : typeParams.includes(CameraType.Collection),
  [FilterNames.Zero] : levelParams.includes(CameraLevel.Zero),
  [FilterNames.NonProfessional] : levelParams.includes(CameraLevel.NonProfessional),
  [FilterNames.Professional] : levelParams.includes(CameraLevel.Professional),
};

export const productsFilter = createReducer(initialState, (builder) => {
  builder
    .addCase(applyProductsFilter, (state, action) =>
      action.payload
    )
    .addCase(clearProductFilters, (state, action) => {
      state[FilterNames.PriceMin] = '';
      state[FilterNames.PriceMax] = '';
      state[FilterNames.Photocamera] = false;
      state[FilterNames.Videocamera] = false;
      state[FilterNames.Digital] = false;
      state[FilterNames.Film] = false;
      state[FilterNames.Snapshot] = false;
      state[FilterNames.Collection] = false;
      state[FilterNames.Zero] = false;
      state[FilterNames.NonProfessional] = false;
      state[FilterNames.Professional] = false;
    });
});
