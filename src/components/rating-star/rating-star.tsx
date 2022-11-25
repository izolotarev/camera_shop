type RatingStarProps = {
  numberOfFullStars: number;
}

function RatingStar({numberOfFullStars}: RatingStarProps):JSX.Element {
  return (
    <>
      <svg width="12" height="11" aria-hidden="true">
        <use xlinkHref={numberOfFullStars > 0 ? '#icon-full-star' : '#icon-star'}></use>
      </svg>
      <svg width="12" height="11" aria-hidden="true">
        <use xlinkHref={numberOfFullStars > 1 ? '#icon-full-star' : '#icon-star'}></use>
      </svg>
      <svg width="12" height="11" aria-hidden="true">
        <use xlinkHref={numberOfFullStars > 2 ? '#icon-full-star' : '#icon-star'}></use>
      </svg>
      <svg width="12" height="11" aria-hidden="true">
        <use xlinkHref={numberOfFullStars > 3 ? '#icon-full-star' : '#icon-star'}></use>
      </svg>
      <svg width="12" height="11" aria-hidden="true">
        <use xlinkHref={numberOfFullStars > 4 ? '#icon-full-star' : '#icon-star'}></use>
      </svg>
    </>
  );
}

export default RatingStar;
