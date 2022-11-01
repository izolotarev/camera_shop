import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { AppRoute, NUMBER_OF_ELEMENTS_PER_PAGE } from '../../const/const';
import { getPromo } from '../../store/reducers/products/products-selectors';
import { ProductType } from '../../types/types';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import CatalogAddItemPopup from '../catalog-add-item-popup/catalog-add-item-popup';
import Footer from '../footer/footer';
import Header from '../header/header';
import LoadingScreen from '../loading-screen/loading-screen';
import Pagination from '../pagination/pagination';
import ProductList from '../product-list/product-list';

type CatalogProps = {
  products: ProductType[];
}

type CatalogParams = {
  id:string;
}

function Catalog({products}:CatalogProps):JSX.Element {
  const params = useParams<CatalogParams>();
  let pageId = parseInt(params.id ?? '', 10);
  if (isNaN(pageId)) { pageId = 1; }

  const productsOnPage = products.slice((pageId - 1) * NUMBER_OF_ELEMENTS_PER_PAGE, (pageId - 1) * NUMBER_OF_ELEMENTS_PER_PAGE + NUMBER_OF_ELEMENTS_PER_PAGE);

  const promo = useSelector(getPromo);
  const promoId = promo?.id ?? 0;

  if (!promo || !products) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <div className="wrapper">
      <Header/>
      <main>
        <div className="banner">
          <picture>
            <source type="image/webp" srcSet={`${promo.previewImgWebp}, ${promo.previewImgWebp2x} 2x`}/>
            <img src={promo.previewImg} srcSet={`${promo.previewImg2x} 2x`} width="1280" height="280" alt="баннер"/>
          </picture>
          <p className="banner__info"><span className="banner__message">Новинка!</span><span className="title title--h1">{promo.name}</span><span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span><Link className="btn" to={{pathname: `${AppRoute.PRODUCTS}/${promoId}`}}>Подробнее</Link></p>
        </div>
        <div className="page-content">
          <Breadcrumbs/>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <div className="catalog-filter">
                    <form action="#">
                      <h2 className="visually-hidden">Фильтр</h2>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Цена, ₽</legend>
                        <div className="catalog-filter__price-range">
                          <div className="custom-input">
                            <label>
                              <input type="number" name="price" placeholder="от"/>
                            </label>
                          </div>
                          <div className="custom-input">
                            <label>
                              <input type="number" name="priceUp" placeholder="до"/>
                            </label>
                          </div>
                        </div>
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Категория</legend>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="photocamera" checked/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Фотокамера</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="videocamera"/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Видеокамера</span>
                          </label>
                        </div>
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Тип камеры</legend>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="digital" checked/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Цифровая</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="film" disabled/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Плёночная</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="snapshot"/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Моментальная</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="collection" checked disabled/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Коллекционная</span>
                          </label>
                        </div>
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Уровень</legend>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="zero" checked/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Нулевой</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="non-professional"/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Любительский</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="professional"/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Профессиональный</span>
                          </label>
                        </div>
                      </fieldset>
                      <button className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
                      </button>
                    </form>
                  </div>
                </div>
                <div className="catalog__content">
                  <div className="catalog-sort">
                    <form action="#">
                      <div className="catalog-sort__inner">
                        <p className="title title--h5">Сортировать:</p>
                        <div className="catalog-sort__type">
                          <div className="catalog-sort__btn-text">
                            <input type="radio" id="sortPrice" name="sort" checked/>
                            <label htmlFor="sortPrice">по цене</label>
                          </div>
                          <div className="catalog-sort__btn-text">
                            <input type="radio" id="sortPopular" name="sort"/>
                            <label htmlFor="sortPopular">по популярности</label>
                          </div>
                        </div>
                        <div className="catalog-sort__order">
                          <div className="catalog-sort__btn catalog-sort__btn--up">
                            <input type="radio" id="up" name="sort-icon" checked aria-label="По возрастанию"/>
                            <label htmlFor="up">
                              <svg width="16" height="14" aria-hidden="true">
                                <use xlinkHref="#icon-sort"></use>
                              </svg>
                            </label>
                          </div>
                          <div className="catalog-sort__btn catalog-sort__btn--down">
                            <input type="radio" id="down" name="sort-icon" aria-label="По убыванию"/>
                            <label htmlFor="down">
                              <svg width="16" height="14" aria-hidden="true">
                                <use xlinkHref="#icon-sort"></use>
                              </svg>
                            </label>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <ProductList products={productsOnPage}/>
                  <Pagination numberOfElements={products.length} initPage={pageId}/>
                </div>
              </div>
            </div>
          </section>
        </div>
        <CatalogAddItemPopup/>
      </main>
      <Footer/>
    </div>
  );
}

export default Catalog;
