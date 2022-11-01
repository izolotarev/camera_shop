import { MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/hooks';
import { closeAddItemPopup } from '../../store/actions/actions';
import { getAddItemPopupOpenedStatus, getProductToAddToBasket } from '../../store/reducers/products/products-selectors';

function CatalogAddItemPopup():JSX.Element {
  const popupActive = useSelector(getAddItemPopupOpenedStatus);
  const productToAddToBasket = useSelector(getProductToAddToBasket);

  const dispatch = useAppDispatch();

  const handlePopupClose = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(closeAddItemPopup());
  };

  return (
    <div className={`modal ${popupActive ? 'is-active' : ''}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handlePopupClose}></div>
        <div className="modal__content">
          <p className="title title--h4">Добавить товар в корзину</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source type="image/webp" srcSet={`${productToAddToBasket?.previewImgWebp}, ${productToAddToBasket?.previewImgWebp2x} 2x`}/>
                <img src={productToAddToBasket?.previewImg} srcSet={`${productToAddToBasket?.previewImg2x} 2x`} width="140" height="120" alt={productToAddToBasket?.name}/>
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{productToAddToBasket?.name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{productToAddToBasket?.vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{productToAddToBasket?.category}</li>
                <li className="basket-item__list-item">{productToAddToBasket?.level}</li>
              </ul>
              <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{productToAddToBasket?.price} ₽</p>
            </div>
          </div>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button">
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Добавить в корзину
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

export default CatalogAddItemPopup;
