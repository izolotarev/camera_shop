import { createReducer } from '@reduxjs/toolkit';
import { ReviewState } from '../../../types/types';
import { loadReviews } from '../../actions/actions';

export const initialState: ReviewState = {
  reviews: undefined,
  reviewsLoaded: false,
  postSuccess: false,
  postError: false,
};

export const reviewsData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload.reviews;
      state.reviewsLoaded = true;
    });
});
