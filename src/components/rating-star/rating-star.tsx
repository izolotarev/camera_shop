import { MAX_PRODUCT_RATING } from '../../const/const';

type RatingStarProps = {
  numberOfFullStars: number;
}

function RatingStar({numberOfFullStars}: RatingStarProps):JSX.Element {
  const numberOfNotFullStars = MAX_PRODUCT_RATING - numberOfFullStars;

  const fullStars = [];
  const notFullStars = [];

  for (let i = 0; i < numberOfFullStars; i++) {
    fullStars.push(
      <svg width="17" height="16" aria-hidden="true">
        <use xlinkHref="#icon-full-star"></use>
      </svg>
    );
  }

  for (let i = 0; i < numberOfNotFullStars; i++) {
    notFullStars.push(
      <svg width="17" height="16" aria-hidden="true">
        <use xlinkHref="#icon-star"></use>
      </svg>
    );
  }

  return (
    <>
      {
        fullStars
      }
      {
        notFullStars
      }
    </>
  );
}

export default RatingStar;
