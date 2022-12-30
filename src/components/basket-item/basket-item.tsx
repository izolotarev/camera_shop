import { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { MAX_PRODUCT_QTY, MIN_PRODUCT_QTY } from '../../const/const';
import { useAppDispatch } from '../../hooks/hooks';
import { openRemoveItemPopup, selectProductToRemoveFromBasket, setProductQtyInBasket } from '../../store/actions/actions';
import { getProductInBasketTotal } from '../../store/reducers/basket/basket-selectors';
import { BasketItemType, State } from '../../types/types';
import { toggleBodyScroll } from '../../utils/utils';

type BasketItemProps = {
  basketItem: BasketItemType
}

function BasketItem({basketItem}: BasketItemProps): JSX.Element {

  const {product, qty} = basketItem;
  const {name, previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, price, vendorCode, type, level } = product;

  const total = useSelector((state: State) => getProductInBasketTotal(state, product.id));

  const handleDecreaseQtyClick = () => {
    if (qty === MIN_PRODUCT_QTY) { return; }
    dispatch(setProductQtyInBasket(product, qty - 1));
  };

  const handleIncreaseQtyClick = () => {
    if (qty === MAX_PRODUCT_QTY) { return; }
    dispatch(setProductQtyInBasket(product, qty + 1));
  };

  const handleQuantityChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const productQty = parseInt(evt.target.value, 10);
    if (productQty < MIN_PRODUCT_QTY || productQty > MAX_PRODUCT_QTY) { return; }
    dispatch(setProductQtyInBasket(product, productQty));
  };

  const dispatch = useAppDispatch();

  const handleRemoveProductClick = () => {
    dispatch(selectProductToRemoveFromBasket(product));
    dispatch(openRemoveItemPopup());
    toggleBodyScroll(true);
  };

  return (
    <li className="basket-item">
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}/>
          <img src={previewImg} srcSet={`${previewImg2x} 2x`} width="140" height="120" alt="Фотоаппарат «Орлёнок»"/>
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{type}</li>
          <li className="basket-item__list-item">{level}</li>
        </ul>
      </div>
      <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{price} ₽</p>
      <div className="quantity">
        <button className="btn-icon btn-icon--prev" aria-label="уменьшить количество товара" onClick={handleDecreaseQtyClick} disabled={qty === MIN_PRODUCT_QTY}>
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input type="number" id="counter1" value={qty} min={MIN_PRODUCT_QTY} max={MAX_PRODUCT_QTY} aria-label="количество товара" onChange={handleQuantityChange}/>
        <button className="btn-icon btn-icon--next" aria-label="увеличить количество товара" onClick={handleIncreaseQtyClick} disabled={qty === MAX_PRODUCT_QTY}>
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>{total} ₽</div>
      <button className="cross-btn" type="button" aria-label="Удалить товар" onClick={handleRemoveProductClick}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}

export default BasketItem;
