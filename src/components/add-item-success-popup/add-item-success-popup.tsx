import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/hooks';
import useChangeBodyClass from '../../hooks/useChangeBodyClass';
import useEscapeKey from '../../hooks/useEscapeKey';
import { closeAddItemSuccessPopup, redirectToRoute } from '../../store/actions/actions';
import { getAddItemSuccessPopupOpenedStatus } from '../../store/reducers/products/products-selectors';
import useTrapFocus from '../../hooks/useTrapFocus';
import { SyntheticEvent } from 'react';
import { AppRoute } from '../../const/const';

function AddItemSuccessPopup():JSX.Element {
  const popupActive = useSelector(getAddItemSuccessPopupOpenedStatus);
  useChangeBodyClass(popupActive);

  const dispatch = useAppDispatch();

  const handlePopupClose = () => {
    dispatch(closeAddItemSuccessPopup());
  };

  const handleContinueShopping = (evt: SyntheticEvent) => {
    evt.preventDefault();
    dispatch(closeAddItemSuccessPopup());
  };

  const handleNavigateToBasket = async () => {
    await dispatch(closeAddItemSuccessPopup());
    dispatch(redirectToRoute(AppRoute.BASKET));
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
