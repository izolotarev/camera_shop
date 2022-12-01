import { useSelector } from 'react-redux';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { AppRoute, CatalogSortOrder, CatalogSortType, NUMBER_OF_ELEMENTS_PER_PAGE } from '../../const/const';
import { getProducts, getProductsLoadingStatus, getPromo, getPromoLoadingStatus } from '../../store/reducers/products/products-selectors';
import { BreadcrumbsType, } from '../../types/types';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import AddItemPopup from '../add-item-popup/add-item-popup';
import Footer from '../footer/footer';
import Header from '../header/header';
import LoadingScreen from '../loading-screen/loading-screen';
// import Pagination from '../pagination/pagination';
import ProductList from '../product-list/product-list';
import AddItemSuccessPopup from '../add-item-success-popup/add-item-success-popup';
import { ChangeEvent, useEffect, useState } from 'react';
import CatalogFilters from '../catalog-filters/catalog-filters';
import { useAppDispatch } from '../../hooks/hooks';
import { fetchProducts, fetchPromo } from '../../store/actions/api.actions';

type CatalogParams = {
  id:string;
}

function Catalog():JSX.Element {
  const params = useParams<CatalogParams>();
  const pageId = parseInt(params.id ?? '', 10);
  const _start = (pageId - 1) * NUMBER_OF_ELEMENTS_PER_PAGE;
  const _end = _start + NUMBER_OF_ELEMENTS_PER_PAGE;

  const dispatch = useAppDispatch();

  const products = useSelector(getProducts);
  const productsLoaded = useSelector(getProductsLoadingStatus);
  const promo = useSelector(getPromo);
  const isPromoLoaded = useSelector(getPromoLoadingStatus);
  const promoId = promo?.id ?? 0;

  useEffect(() => {
    if (productsLoaded) { return; }
    dispatch(fetchProducts(`_start=${_start}&_end=${_end}`));
  }, [_end, _start, dispatch, productsLoaded]);

  useEffect(() => {
    if (isPromoLoaded) { return; }
    dispatch(fetchPromo());
  }, [dispatch, isPromoLoaded]);


  const [searchParams, setSearchParams] = useSearchParams();
  const sortTypeParam = searchParams.get('_sort') as CatalogSortType || null;
  const sortOrderParam = searchParams.get('_order') as CatalogSortOrder || null;

  // const [sortedProducts, setSortedProducts] = useState<ProductType[]>(products);
  const [catalogSortType, setCatalogSortType] = useState<CatalogSortType>(sortTypeParam || CatalogSortType.None);
  const [catalogSortOrder, setCatalogSortOrder] = useState<CatalogSortOrder>(sortOrderParam || CatalogSortOrder.None);

  // useEffect(() => {
  //   if (catalogSortType !== CatalogSortType.None || catalogSortOrder !== CatalogSortOrder.None) {
  //     setSortedProducts(sortProducts(products, catalogSortType, catalogSortOrder));
  //   } else {
  //     setSortedProducts(products);
  //   }
  // }, [catalogSortType, catalogSortOrder, products]);

  const handleSortTypeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const sortType = evt.target.value as CatalogSortType;
    setCatalogSortType(sortType);
    const sortOrder = catalogSortOrder === CatalogSortOrder.None ? CatalogSortOrder.Ascending : catalogSortOrder;
    setCatalogSortOrder(sortOrder);
    setSearchParams({_sort: sortType, _order: sortOrder});
  };

  const handleSortOrderChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const sortOrder = evt.target.value as CatalogSortOrder;
    setCatalogSortOrder(sortOrder);
    const sortType = catalogSortType === CatalogSortType.None ? CatalogSortType.Price : catalogSortType;
    setCatalogSortType(sortType);
    setSearchParams({_sort: sortType, _order: sortOrder});
  };

  const breadcrumbs: BreadcrumbsType[] =
  [
    {name: 'Главная', url: AppRoute.ROOT},
    {name: 'Каталог'}
  ];

  if (!promo || !products || !isPromoLoaded || !productsLoaded) {
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
          <Breadcrumbs crumbs={breadcrumbs}/>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <CatalogFilters/>
                </div>
                <div className="catalog__content">
                  <div className="catalog-sort">
                    <form action="#">
                      <div className="catalog-sort__inner">
                        <p className="title title--h5">Сортировать:</p>
                        <div className="catalog-sort__type">
                          <div className="catalog-sort__btn-text">
                            <input type="radio" id="sortPrice" name="sort" value={CatalogSortType.Price} onChange={handleSortTypeChange} checked={catalogSortType === CatalogSortType.Price}/>
                            <label htmlFor="sortPrice">по цене</label>
                          </div>
                          <div className="catalog-sort__btn-text">
                            <input type="radio" id="sortPopular" name="sort" value={CatalogSortType.Rating} onChange={handleSortTypeChange} checked={catalogSortType === CatalogSortType.Rating}/>
                            <label htmlFor="sortPopular">по популярности</label>
                          </div>
                        </div>
                        <div className="catalog-sort__order">
                          <div className="catalog-sort__btn catalog-sort__btn--up">
                            <input type="radio" id="up" name="sort-icon" aria-label="По возрастанию" value={CatalogSortOrder.Ascending} onChange={handleSortOrderChange} checked={catalogSortOrder === CatalogSortOrder.Ascending}/>
                            <label htmlFor="up">
                              <svg width="16" height="14" aria-hidden="true">
                                <use xlinkHref="#icon-sort"></use>
                              </svg>
                            </label>
                          </div>
                          <div className="catalog-sort__btn catalog-sort__btn--down">
                            <input type="radio" id="down" name="sort-icon" aria-label="По убыванию" value={CatalogSortOrder.Descending} onChange={handleSortOrderChange} checked={catalogSortOrder === CatalogSortOrder.Descending}/>
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
                  <ProductList products={products}/>
                  {/* <Pagination numberOfElements={products.length} initPage={pageId}/> */}
                </div>
              </div>
            </div>
          </section>
        </div>
        <AddItemPopup/>
        <AddItemSuccessPopup/>
      </main>
      <Footer/>
    </div>
  );
}

// const sortProducts = (products: ProductType[], sortType: CatalogSortType, order: CatalogSortOrder): ProductType[] => {
//   const key = sortType === CatalogSortType.Price ? 'price' : 'rating';
//   if (order === CatalogSortOrder.Ascending) {
//     return products.slice().sort((a, b) => a[key] - b[key]);
//   }
//   return products.slice().sort((a, b) => b[key] - a[key]);
// };

export default Catalog;
