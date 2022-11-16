import { MAX_PRODUCT_RATING } from '../../const/const';

type RatingStarProps = {
  numberOfFullStars: number;
}

function RatingStar({numberOfFullStars}: RatingStarProps):JSX.Element {
  const numberOfNotFullStars = MAX_PRODUCT_RATING - numberOfFullStars;

  return (
    <>
      {
        Array(numberOfFullStars).fill(null).map((_, index) => {
          const i = index;

          return (
            <svg width="17" height="16" aria-hidden="true" key={i}>
              <use xlinkHref="#icon-full-star"></use>
            </svg>);
        })
      }
      {
        Array(numberOfNotFullStars).fill(null).map((_, index) => {
          const j = numberOfFullStars + index;
          return (
            <svg width="17" height="16" aria-hidden="true" key={j}>
              <use xlinkHref="#icon-star"></use>
            </svg>);
        })
      }
    </>
  );
}

export default RatingStar;
