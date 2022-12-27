import { SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/hooks';
import useEscapeKey from '../../hooks/useEscapeKey';
import useTrapFocus from '../../hooks/useTrapFocus';
import { closeRemoveItemPopup, removeProductFromBasket } from '../../store/actions/actions';
import { getProductToRemoveFromBasket, getRemoveItemPopupOpenedStatus } from '../../store/reducers/basket/basket-selectors';
import { toggleBodyScroll } from '../../utils/utils';

function RemoveItemPopup(): JSX.Element {
  const popupActive = useSelector(getRemoveItemPopupOpenedStatus);
  const productToRemoveFromBasket = useSelector(getProductToRemoveFromBasket);

  const {previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name, vendorCode, type, level} = productToRemoveFromBasket ?? {};

  const dispatch = useAppDispatch();

  const handlePopupClose = () => {
    dispatch(closeRemoveItemPopup());
    toggleBodyScroll(false);
  };

  useEscapeKey(handlePopupClose);

  useTrapFocus(popupActive);

  const handleRemoveFromBasket = () => {
    if (!productToRemoveFromBasket) { return; }
    dispatch(removeProductFromBasket(productToRemoveFromBasket));
    dispatch(closeRemoveItemPopup());
    toggleBodyScroll(false);
  };

  const handleContinueShopping = (evt: SyntheticEvent) => {
    evt.preventDefault();
    handlePopupClose();
    toggleBodyScroll(false);
  };

  return (
    <div className={`modal ${popupActive ? 'is-active' : ''}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handlePopupClose}></div>
        <div className="modal__content">
          <p className="title title--h4">Удалить этот товар?</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}/>
                <img src={previewImg} srcSet={`${previewImg2x} 2x`} width="140" height="120" alt={name}/>
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{type}</li>
                <li className="basket-item__list-item">{level} уровень</li>
              </ul>
            </div>
          </div>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--half-width" type="button" onClick={handleRemoveFromBasket}>Удалить
            </button>
            <a className="btn btn--transparent modal__btn modal__btn--half-width" href="/#" onClick={handleContinueShopping}>Продолжить покупки
            </a>
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

export default RemoveItemPopup;
