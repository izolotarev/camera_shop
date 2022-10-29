import { MAX_PRODUCT_RATING } from '../../const/const';

type RatingStarProps = {
  numberOfFullStars: number;
}

function RatingStar({numberOfFullStars}: RatingStarProps):JSX.Element {
  const numberOfNotFullStars = MAX_PRODUCT_RATING - numberOfFullStars;

  return (
    <>
      {
        new Array(numberOfFullStars).fill(null).map(() => (
          // eslint-disable-next-line react/jsx-key
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
        ))
      }
      {
        new Array(numberOfNotFullStars).fill(null).map(() => (
          // eslint-disable-next-line react/jsx-key
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
        ))
      }
    </>
  );
}

export default RatingStar;
