import { createSelector } from 'reselect';
import { ReviewType, State } from '../../../types/types';
import { NameSpace } from '../root-reducer';

export const getReviews = (state: State): ReviewType[] | undefined => state[NameSpace.reviews].reviews;
export const getReviewsDateDsc = createSelector(getReviews, (reviews) => reviews?.slice().sort((prev, next) => {
  const prevDate = new Date(prev.createAt);
  const nextDate = new Date(next.createAt);
  return nextDate.getTime() - prevDate.getTime();
}));
export const getAddReviewPopupOpenedStatus = (state: State): boolean => state[NameSpace.reviews].isAddReviewPopupOpened;
export const getAddReviewSuccessPopupOpenedStatus = (state: State): boolean => state[NameSpace.reviews].isAddReviewSuccessPopupOpened;
export const getReviewPostStatus = (state: State): boolean => state[NameSpace.reviews].postSuccess;
export const getReviewPostError = (state: State): boolean => state[NameSpace.reviews].postError;
