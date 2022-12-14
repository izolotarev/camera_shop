import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/hooks';
import useEscapeKey from '../../hooks/useEscapeKey';
import { closeAddItemSuccessPopup } from '../../store/actions/actions';
import { getAddItemSuccessPopupOpenedStatus } from '../../store/reducers/products/products-selectors';
import useTrapFocus from '../../hooks/useTrapFocus';
import { SyntheticEvent } from 'react';
import { AppRoute } from '../../const/const';
import { toggleBodyScroll } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';

function AddItemSuccessPopup():JSX.Element {
  const popupActive = useSelector(getAddItemSuccessPopupOpenedStatus);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handlePopupClose = () => {
    dispatch(closeAddItemSuccessPopup());
    toggleBodyScroll(false);
  };

  const handleContinueShopping = (evt: SyntheticEvent) => {
    evt.preventDefault();
    handlePopupClose();
    navigate(`${AppRoute.CATALOG}/page_1`);
  };

  const handleNavigateToBasket = () => {
    handlePopupClose();
    navigate(AppRoute.BASKET);
  };

  useEscapeKey(handlePopupClose);
  useTrapFocus(popupActive);

  return (
    <div className={`modal ${popupActive ? 'is-active' : ''} modal--narrow`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handlePopupClose}></div>
        <div className="modal__content">
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width="86" height="80" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <div className="modal__buttons">
            <a className="btn btn--transparent modal__btn" href="/#" onClick={handleContinueShopping}>Продолжить покупки</a>
            <button className="btn btn--purple modal__btn modal__btn--fit-width" onClick={handleNavigateToBasket}>Перейти в корзину</button>
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

export default AddItemSuccessPopup;
