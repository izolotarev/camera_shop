import { useSelector } from 'react-redux';
import { getReviews } from '../../store/reducers/reviews/reviews-selectors';
import ReviewListEmpty from '../review-list-empty/review-list-empty';
import ReviewList from '../review-list/review-list';

function Reviews():JSX.Element {
  const reviews = useSelector(getReviews);

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button className="btn" type="button">Оставить свой отзыв</button>
        </div>
        {
          reviews && reviews.length > 0
            ? <ReviewList reviews={reviews}/>
            : <ReviewListEmpty/>
        }
        <div className="review-block__buttons">
          <button className="btn btn--purple" type="button">Показать больше отзывов
          </button>
        </div>
      </div>
    </section>
  );
}

export default Reviews;
