import { ReviewType } from '../../types/types';
import ReviewCard from '../review-card/review-card';

type ReviewListProps = {
  reviews: ReviewType[];
}

function ReviewList({reviews}: ReviewListProps):JSX.Element {
  return (
    <ul className="review-block__list">
      {
        reviews.map((review) =>
          <ReviewCard reviewObj={review} key={review.id}/>
        )
      }
    </ul>
  );
}

export default ReviewList;
