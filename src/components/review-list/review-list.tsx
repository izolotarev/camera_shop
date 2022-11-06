import { ReviewType } from '../../types/types';
import ReviewCard from '../review-card/review-card';

type ReviewListProps = {
  reviews: ReviewType[];
  numberOfReviewsToShow: number;
}

function ReviewList({reviews, numberOfReviewsToShow}: ReviewListProps):JSX.Element {
  const reviewsToShow = reviews.slice(0, numberOfReviewsToShow);

  return (
    <ul className="review-block__list">
      {
        reviewsToShow.map((review) =>
          <ReviewCard reviewObj={review} key={review.id}/>
        )
      }
    </ul>
  );
}

export default ReviewList;
