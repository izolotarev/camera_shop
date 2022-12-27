import { SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import { useAppDispatch } from '../../hooks/hooks';
import useEscapeKey from '../../hooks/useEscapeKey';
import useTrapFocus from '../../hooks/useTrapFocus';
import { closeAddOrderSuccessPopup } from '../../store/actions/actions';
import { getAddOrderSuccessPopupOpenedStatus } from '../../store/reducers/basket/basket-selectors';
import { toggleBodyScroll } from '../../utils/utils';

function AddOrderSuccessPopup():JSX.Element {
  const popupActive = useSelector(getAddOrderSuccessPopupOpenedStatus);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handlePopupClose = () => {
    dispatch(closeAddOrderSuccessPopup());
    toggleBodyScroll(false);
  };

  const handleContinueShopping = (evt: SyntheticEvent) => {
    evt.preventDefault();
    handlePopupClose();
    navigate(`${AppRoute.CATALOG}/page_1`);
  };

  useEscapeKey(handlePopupClose);
  useTrapFocus(popupActive);

  return (
    <div className={`modal ${popupActive ? 'is-active' : ''} modal--narrow`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handlePopupClose}></div>
        <div className="modal__content">
          <p className="title title--h4">Спасибо за покупку</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={handleContinueShopping}>Вернуться к покупкам
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

export default AddOrderSuccessPopup;
