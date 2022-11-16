import { makeFakeReview } from '../../../utils/mocks';
import { loadReviews } from '../../actions/actions';
import { initialState, reviewsData } from './reviews-reducer';

const reviews = [makeFakeReview()];

describe('Function: reviewsData', () => {

  it('without additional parameters should return initial state', () => {
    expect(reviewsData(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should update reviews on data load', () => {
    const state = {
      reviews: undefined,
      reviewsLoaded: false,
      postSuccess: false,
      postError: false,
      postedReview: undefined,
      isAddReviewPopupOpened: false,
      isAddReviewSuccessPopupOpened: false,
    };
    expect(reviewsData(state, loadReviews(reviews)))
      .toEqual({
        reviews: reviews,
        reviewsLoaded: true,
        postSuccess: false,
        postError: false,
        postedReview: undefined,
        isAddReviewPopupOpened: false,
        isAddReviewSuccessPopupOpened: false,
      });
  });

});
