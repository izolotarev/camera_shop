import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import { ProductType } from '../../types/types';
import RatingStar from '../rating-star/rating-star';

type ProductProps = {
  product: ProductType;
}

function ProductCard({product}:ProductProps): JSX.Element {
  const {id, name, previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, rating, price, reviewCount } = product;

  return (
    <div className="product-card">
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
        <button className="btn btn--purple product-card__btn" type="button">Купить
        </button>
        <Link className="btn btn--transparent" to={{pathname: `${AppRoute.PRODUCTS}/${id}`}}>Подробнее</Link>
      </div>
    </div>
  );
}

export default ProductCard;
