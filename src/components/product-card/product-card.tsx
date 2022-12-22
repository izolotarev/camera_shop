import { MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import { useAppDispatch } from '../../hooks/hooks';
import { openAddItemPopup, selectProductToAddToBasket } from '../../store/actions/actions';
import { getProductInBasketStatus } from '../../store/reducers/basket/basket-selectors';
import { ProductType, State } from '../../types/types';
import RatingStar from '../rating-star/rating-star';

type ProductProps = {
  product: ProductType;
  isActive?: boolean;
}

function ProductCard({product, isActive}:ProductProps): JSX.Element {
  const {id, name, previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, rating, price, reviewCount } = product;

  const productInBasket = useSelector((state: State) => getProductInBasketStatus(state, id));

  const dispatch = useAppDispatch();

  const handleBuyClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(selectProductToAddToBasket(product));
    dispatch(openAddItemPopup());
  };

  return (
    <div className={`product-card ${isActive ? 'is-active' : ''}`}>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}/>
          <img src={previewImg} srcSet={`${previewImg2x} 2x`} width="280" height="240" alt={name}/>
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <RatingStar numberOfFullStars={rating}/>
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {
          productInBasket
            ?
            <Link className="btn btn--purple-border product-card__btn product-card__btn--in-cart" to={AppRoute.BASKET}>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-basket"></use>
              </svg>В корзине
            </Link>
            :
            <button className="btn btn--purple product-card__btn" type="button" onClick={handleBuyClick}>
              Купить
            </button>
        }
        <Link className="btn btn--transparent" to={{pathname: `${AppRoute.PRODUCTS}/${id}`}}>Подробнее</Link>
      </div>
    </div>
  );
}

export default ProductCard;
