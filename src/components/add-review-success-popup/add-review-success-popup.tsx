import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/hooks';
import useEscapeKey from '../../hooks/useEscapeKey';
import { closeAddReviewSuccessPopup } from '../../store/actions/actions';
import { getAddReviewSuccessPopupOpenedStatus } from '../../store/reducers/reviews/reviews-selectors';
import useTrapFocus from '../../hooks/useTrapFocus';
import { toggleBodyScroll } from '../../utils/utils';

function AddReviewSuccessPopup():JSX.Element {

  const popupActive = useSelector(getAddReviewSuccessPopupOpenedStatus);

  const dispatch = useAppDispatch();

  const handlePopupClose = () => {
    dispatch(closeAddReviewSuccessPopup());
    toggleBodyScroll(false);
  };

  useEscapeKey(handlePopupClose);
  useTrapFocus(popupActive);

  return (
    <div className={`modal ${popupActive ? 'is-active' : ''} modal--narrow`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handlePopupClose}></div>
        <div className="modal__content">
          <p className="title title--h4">Спасибо за отзыв</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={handlePopupClose}>
              Вернуться к покупкам
            </button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handlePopupClose}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddReviewSuccessPopup;
