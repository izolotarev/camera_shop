
type ShowMoreReviewsProps = {
  increaseNumberOfReviewsToShow: () => void;
}

function ShowMoreReviews({increaseNumberOfReviewsToShow}:ShowMoreReviewsProps):JSX.Element {

  const handleShowMoreClick = () => {
    increaseNumberOfReviewsToShow();
  };

  return (
    <div className="review-block__buttons">
      <button className="btn btn--purple" type="button" onClick={handleShowMoreClick}>
        Показать больше отзывов
      </button>
    </div>
  );
}

export default ShowMoreReviews;
