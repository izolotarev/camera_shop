import { ReviewType, State } from '../../../types/types';
import { NameSpace } from '../root-reducer';

export const getReviews = (state: State): ReviewType[] | undefined => state[NameSpace.reviews].reviews;
export const getAddReviewPopupOpenedStatus = (state: State): boolean => state[NameSpace.reviews].isAddReviewPopupOpened;
export const getReviewPostStatus = (state: State): boolean => state[NameSpace.reviews].postSuccess;
export const getReviewPostError = (state: State): boolean => state[NameSpace.reviews].postError;
