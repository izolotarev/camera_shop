import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppRoute, MAX_PRODUCT_RATING, ProcuctTabNames } from '../../const/const';
import { useAppDispatch } from '../../hooks/hooks';
import { clearProductById, openAddItemPopup, selectProductAddToBasket } from '../../store/actions/actions';
import { fetchProductById, fetchSimilarProducts } from '../../store/actions/api.actions';
import { getProductById, getSimilarProducts } from '../../store/reducers/products/products-selectors';
import { BreadcrumbsType } from '../../types/types';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import CatalogAddItemPopup from '../catalog-add-item-popup/catalog-add-item-popup';
import Footer from '../footer/footer';
import Header from '../header/header';
import LoadingScreen from '../loading-screen/loading-screen';
import ProductCard from '../product-card/product-card';
import RatingStar from '../rating-star/rating-star';


type ProductParams = {
  id:string;
}

function Product():JSX.Element {

  const params = useParams<ProductParams>();
  const id = parseInt(params.id ?? '', 10);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductById(id));
    dispatch(fetchSimilarProducts(id));
    window.scrollTo(0,0);
    return () => {dispatch(clearProductById());};
  }, [id]);

  const product = useSelector(getProductById);
  const {previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name,
    rating, reviewCount, price, vendorCode, category, type, level, description} = product || {} ;

  const similarProducts = useSelector(getSimilarProducts);
  const similarProductsIds = similarProducts.slice().map((p) => p.id);

  const [activeSimilarProductsIds, setActiveSimilarProductsIds] = useState<number[]>([]);
  const [activeSimilarProductsIndexes, setActiveSimilarProductsIndexes] = useState([0,1,2]);

  useEffect(() => {
    setActiveSimilarProductsIds(similarProductsIds.slice(0,3));
  }, [similarProducts]);

  const handleNextSlideClick = () => {
    if (activeSimilarProductsIds.includes(similarProductsIds[similarProductsIds.length - 1])) {return;}
    const nextIndexes = activeSimilarProductsIndexes.slice().map((i) => i + 1);
    setActiveSimilarProductsIndexes(nextIndexes);
    setActiveSimilarProductsIds(nextIndexes.map((i) => similarProductsIds[i]));
  };

  const handlePrevSlideClick = () => {
    if (activeSimilarProductsIds.includes(similarProductsIds[0])) {return;}
    const prevIndexes = activeSimilarProductsIndexes.slice().map((i) => i - 1);
    setActiveSimilarProductsIndexes(prevIndexes);
    setActiveSimilarProductsIds(prevIndexes.map((i) => similarProductsIds[i]));
  };

  const [activeTab, setActiveTab] = useState(ProcuctTabNames.DESCRIPTION);

  const handleDescriptionClick = () => {
    setActiveTab(ProcuctTabNames.DESCRIPTION);
  };

  const handleCharacteristicsClick = () => {
    setActiveTab(ProcuctTabNames.CHARACTERISTICS);
  };

  const handleAddToBasketClick = () => {
    if (!product) {return; }
    dispatch(selectProductAddToBasket(product));
    dispatch(openAddItemPopup());
  };

  const breadcrumbs: BreadcrumbsType[] =
  [
    {name: 'Главная', url: AppRoute.ROOT},
    {name: 'Каталог', url: `${AppRoute.CATALOG}/page_1`},
    {name: product?.name ?? ''}
  ];

  if (!product || !similarProducts) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <div className="wrapper">
      <Header/>
      <main>
        <div className="page-content">
          <Breadcrumbs crumbs={breadcrumbs}/>
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}/>
                    <img src={previewImg} srcSet={`${previewImg2x} 2x`} width="560" height="480" alt={name}/>
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{name}</h1>
                  <div className="rate product__rate">
                    <RatingStar numberOfFullStars={rating ?? MAX_PRODUCT_RATING}/>
                    <p className="visually-hidden">Рейтинг: {rating}</p>
                    <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
                  </div>
                  <p className="product__price"><span className="visually-hidden">Цена:</span>{price} ₽</p>
                  <button className="btn btn--purple" type="button" onClick={handleAddToBasketClick}>
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>Добавить в корзину
                  </button>
                  <div className="tabs product__tabs">
                    <div className="tabs__controls product__tabs-controls">
                      <button className={`tabs__control ${activeTab === ProcuctTabNames.CHARACTERISTICS ? 'is-active' : ''}`} type="button" onClick={handleCharacteristicsClick}>Характеристики</button>
                      <button className={`tabs__control ${activeTab === ProcuctTabNames.DESCRIPTION ? 'is-active' : ''}`} type="button" onClick={handleDescriptionClick}>Описание</button>
                    </div>
                    <div className="tabs__content">
                      <div className={`tabs__element ${activeTab === ProcuctTabNames.CHARACTERISTICS ? 'is-active' : ''}`}>
                        <ul className="product__tabs-list">
                          <li className="item-list"><span className="item-list__title">Артикул:</span>
                            <p className="item-list__text"> {vendorCode}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Категория:</span>
                            <p className="item-list__text">{category}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                            <p className="item-list__text">{type}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Уровень:</span>
                            <p className="item-list__text">{level}</p>
                          </li>
                        </ul>
                      </div>
                      <div className={`tabs__element ${activeTab === ProcuctTabNames.DESCRIPTION ? 'is-active' : ''}`}>
                        <div className="product__tabs-text">
                          {description}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="page-content__section">
            <section className="product-similar">
              <div className="container">
                <h2 className="title title--h3">Похожие товары</h2>
                {
                  similarProducts.length > 0
                    ?
                    <div className="product-similar__slider">
                      <div className="product-similar__slider-list">
                        {
                          similarProducts.map((similarProduct) => <ProductCard product={similarProduct} key={similarProduct.id} isActive={activeSimilarProductsIds.includes(similarProduct.id)}/>)
                        }
                      </div>
                      <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" disabled={activeSimilarProductsIds.includes(similarProductsIds[0])} onClick={handlePrevSlideClick}>
                        <svg width="7" height="12" aria-hidden="true">
                          <use xlinkHref="#icon-arrow"></use>
                        </svg>
                      </button>
                      <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд" disabled={activeSimilarProductsIds.includes(similarProductsIds[similarProductsIds.length - 1])} onClick={handleNextSlideClick}>
                        <svg width="7" height="12" aria-hidden="true">
                          <use xlinkHref="#icon-arrow"></use>
                        </svg>
                      </button>
                    </div>
                    :
                    ''
                }
              </div>
            </section>
          </div>
          <div className="page-content__section">
            <section className="review-block">
              <div className="container">
                <div className="page-content__headed">
                  <h2 className="title title--h3">Отзывы</h2>
                  <button className="btn" type="button">Оставить свой отзыв</button>
                </div>
                <ul className="review-block__list">
                  <li className="review-card">
                    <div className="review-card__head">
                      <p className="title title--h4">Сергей Горский</p>
                      <time className="review-card__data" dateTime="2022-04-13">13 апреля</time>
                    </div>
                    <div className="rate review-card__rate">
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <p className="visually-hidden">Оценка: 5</p>
                    </div>
                    <ul className="review-card__list">
                      <li className="item-list"><span className="item-list__title">Достоинства:</span>
                        <p className="item-list__text">Надёжная, хорошо лежит в руке, необычно выглядит</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Недостатки:</span>
                        <p className="item-list__text">Тяжеловата, сложно найти плёнку</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Комментарий:</span>
                        <p className="item-list__text">Раз в полгода достаю из-под стекла, стираю пыль, заряжаю — работает как часы. Ни у кого из знакомых такой нет, все завидуют) Теперь это жемчужина моей коллекции, однозначно стоит своих денег!</p>
                      </li>
                    </ul>
                  </li>
                  <li className="review-card">
                    <div className="review-card__head">
                      <p className="title title--h4">Пётр Матросов</p>
                      <time className="review-card__data" dateTime="2022-03-02">2 марта</time>
                    </div>
                    <div className="rate review-card__rate">
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                      <p className="visually-hidden">Оценка: 1</p>
                    </div>
                    <ul className="review-card__list">
                      <li className="item-list"><span className="item-list__title">Достоинства:</span>
                        <p className="item-list__text">Хорошее пресс-папье</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Недостатки:</span>
                        <p className="item-list__text">Через 3 дня развалилась на куски</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Комментарий:</span>
                        <p className="item-list__text">При попытке вставить плёнку сломался механизм открытия отсека, пришлось заклеить его изолентой. Начал настраивать фокус&nbsp;— линза провалилась внутрь корпуса. Пока доставал — отломилось несколько лепестков диафрагмы. От злости стукнул камеру об стол, и рукоятка треснула пополам. Склеил всё суперклеем, теперь прижимаю ей бумагу. НЕ РЕКОМЕНДУЮ!!!</p>
                      </li>
                    </ul>
                  </li>
                  <li className="review-card">
                    <div className="review-card__head">
                      <p className="title title--h4">Татьяна Кузнецова </p>
                      <time className="review-card__data" dateTime="2021-12-30">30 декабря</time>
                    </div>
                    <div className="rate review-card__rate">
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                      <p className="visually-hidden">Оценка: 4</p>
                    </div>
                    <ul className="review-card__list">
                      <li className="item-list"><span className="item-list__title">Достоинства:</span>
                        <p className="item-list__text">Редкая</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Недостатки:</span>
                        <p className="item-list__text">Высокая цена</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Комментарий:</span>
                        <p className="item-list__text">Дорого для портативной видеокамеры, но в моей коллекции как раз не хватало такого экземпляра. Следов использования нет, доставили в заводской упаковке, выглядит шикарно!</p>
                      </li>
                    </ul>
                  </li>
                </ul>
                <div className="review-block__buttons">
                  <button className="btn btn--purple" type="button">Показать больше отзывов
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
        <CatalogAddItemPopup/>
      </main>
      <a className="up-btn" href="#header">
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </a>
      <Footer/>
    </div>
  );
}

export default Product;
