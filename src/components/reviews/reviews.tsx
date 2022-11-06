import { useState } from 'react';
import { useSelector } from 'react-redux';
import { REVIEW_CARDS_PER_STEP } from '../../const/const';
import { getReviews } from '../../store/reducers/reviews/reviews-selectors';
import ReviewListEmpty from '../review-list-empty/review-list-empty';
import ReviewList from '../review-list/review-list';
import ShowMoreReviews from '../show-more-reviews/show-more-reviews';

function Reviews():JSX.Element {
  const reviews = useSelector(getReviews);

  const [numberOfReviewsToShow, setNumberOfReviewsToShow] = useState(REVIEW_CARDS_PER_STEP);

  const increaseNumberOfReviewsToShow = () => setNumberOfReviewsToShow((prev) => prev + REVIEW_CARDS_PER_STEP);

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button className="btn" type="button">Оставить свой отзыв</button>
        </div>
        {
          reviews && reviews.length > 0
            ? <ReviewList reviews={reviews} numberOfReviewsToShow={numberOfReviewsToShow}/>
            : <ReviewListEmpty/>
        }
        {
          reviews && reviews.length > REVIEW_CARDS_PER_STEP && numberOfReviewsToShow < reviews.length
            ?
            <ShowMoreReviews increaseNumberOfReviewsToShow={increaseNumberOfReviewsToShow}/>
            :
            ''
        }
      </div>
    </section>
  );
}

export default Reviews;
