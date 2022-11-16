import { createReducer } from '@reduxjs/toolkit';
import { ReviewState } from '../../../types/types';
import { clearPostReviewError, clearPostReviewStatus, closeAddReviewPopup, closeAddReviewSuccessPopup, loadReviews, openAddReviewPopup, openAddReviewSuccessPopup, postReviewAction, postReviewError } from '../../actions/actions';

export const initialState: ReviewState = {
  reviews: undefined,
  reviewsLoaded: false,
  postSuccess: false,
  postError: false,
  postedReview: undefined,
  isAddReviewPopupOpened: false,
  isAddReviewSuccessPopupOpened: false,
};

export const reviewsData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload.reviews;
      state.reviewsLoaded = true;
    })
    .addCase(openAddReviewPopup, (state, action) => {
      state.isAddReviewPopupOpened = true;
      document.body.classList.add('scroll-lock');
    })
    .addCase(closeAddReviewPopup, (state, action) => {
      state.isAddReviewPopupOpened = false;
      document.body.classList.remove('scroll-lock');
    })
    .addCase(postReviewAction, (state, action) => {
      state.postedReview = action.payload.review;
      state.postSuccess = true;
    })
    .addCase(postReviewError, (state) => {
      state.postError = true;
    })
    .addCase(clearPostReviewStatus, (state) => {
      state.postSuccess = initialState.postSuccess;
    })
    .addCase(clearPostReviewError, (state) => {
      state.postError = initialState.postError;
    })
    .addCase(openAddReviewSuccessPopup, (state, action) => {
      state.isAddReviewSuccessPopupOpened = true;
      document.body.classList.add('scroll-lock');
    })
    .addCase(closeAddReviewSuccessPopup, (state, action) => {
      state.isAddReviewSuccessPopupOpened = false;
      document.body.classList.remove('scroll-lock');
    });
});
