import { ReviewType } from '../../types/types';
import RatingStar from '../rating-star/rating-star';

type ReviewCardProps = {
  reviewObj: ReviewType;
}

function ReviewCard({reviewObj}:ReviewCardProps):JSX.Element {
  const {userName, rating, advantage, disadvantage, review} = reviewObj;

  const date = new Date(reviewObj.createAt);
  const dateTime = date.toISOString().substring(0,10);
  const dayMonth = date.toLocaleString('ru-RU', { month: 'long', day:'numeric', timeZone: 'Europe/Moscow'});

  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime={dateTime}>{dayMonth}</time>
      </div>
      <div className="rate review-card__rate">
        <RatingStar numberOfFullStars={rating}/>
        <p className="visually-hidden">Оценка: {rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review}</p>
        </li>
      </ul>
    </li>
  );
}

export default ReviewCard;
