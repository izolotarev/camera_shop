import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { AppRoute, CatalogSortOrder, CatalogSortType, NUMBER_OF_ELEMENTS_PER_PAGE, SearchParams } from '../../const/const';
import { getProducts, getProductsLoadingStatus, getProductsTotalCount, getPromo, getPromoLoadingStatus } from '../../store/reducers/products/products-selectors';
import { BreadcrumbsType, } from '../../types/types';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import AddItemPopup from '../add-item-popup/add-item-popup';
import Footer from '../footer/footer';
import Header from '../header/header';
import LoadingScreen from '../loading-screen/loading-screen';
import Pagination from '../pagination/pagination';
import ProductList from '../product-list/product-list';
import AddItemSuccessPopup from '../add-item-success-popup/add-item-success-popup';
import { ChangeEvent, useEffect, } from 'react';
import CatalogFilters from '../catalog-filters/catalog-filters';
import { useAppDispatch, } from '../../hooks/hooks';
import { fetchFilterSettings, fetchProducts, fetchPromo } from '../../store/actions/api.actions';
import { applySortOrder, applySortType, clearFilterSettings, clearProducts, } from '../../store/actions/actions';
import { updateParamsWithValues } from '../../utils/utils';
import { getCatalogSortOrder, getCatalogSortType } from '../../store/reducers/products-sorting/products-sorting-selectors';
import { getFilterState } from '../../store/reducers/products-filter/products-filter-selectors';

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
  const productsTotalCount = useSelector(getProductsTotalCount);
  const filterState = useSelector(getFilterState);

  const [searchParams, setSearchParams] = useSearchParams();
  const catalogSortType = useSelector(getCatalogSortType);
  const catalogSortOrder = useSelector(getCatalogSortOrder);
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchProducts(`${SearchParams.Start}=${_start}&${SearchParams.End}=${_end}&${location.search.substring(1)}`));
    dispatch(fetchFilterSettings(`${location.search.substring(1)}`));
    return () => {
      dispatch(clearProducts());
      dispatch(clearFilterSettings());
    };
  }, [_end, _start, dispatch, pageId, location.search]);

  const navigate = useNavigate();

  //If filter is applied push to the first page
  useEffect(() => {
    navigate(`${AppRoute.CATALOG}/page_1?${location.search.substring(1)}`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterState]);

  useEffect(() => {
    if (isPromoLoaded) { return; }
    dispatch(fetchPromo());
  }, [dispatch, isPromoLoaded]);

  const handleSortTypeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const sortType = evt.target.value as CatalogSortType;
    dispatch(applySortType(sortType));
    const sortOrder = catalogSortOrder === CatalogSortOrder.None ? CatalogSortOrder.Ascending : catalogSortOrder;
    dispatch(applySortOrder(sortOrder));
    setSearchParams(updateParamsWithValues(searchParams, {
      [SearchParams.SortType] : sortType,
      [SearchParams.SortOrder] : sortOrder,
    }));
  };

  const handleSortOrderChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const sortOrder = evt.target.value as CatalogSortOrder;
    dispatch(applySortOrder(sortOrder));
    const sortType = catalogSortType === CatalogSortType.None ? CatalogSortType.Price : catalogSortType;
    dispatch(applySortType(sortType));
    setSearchParams(updateParamsWithValues(searchParams, {
      [SearchParams.SortType] : sortType,
      [SearchParams.SortOrder] : sortOrder,
    }));
  };

  const breadcrumbs: BreadcrumbsType[] =
  [
    {name: '??????????????', url: AppRoute.ROOT},
    {name: '??????????????'}
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
            <img src={promo.previewImg} srcSet={`${promo.previewImg2x} 2x`} width="1280" height="280" alt="????????????"/>
          </picture>
          <p className="banner__info"><span className="banner__message">??????????????!</span><span className="title title--h1">{promo.name}</span><span className="banner__text">???????????????????????????????? ???????????? ????&nbsp;???????????????????? ??????????????????????????</span><Link className="btn" to={{pathname: `${AppRoute.PRODUCTS}/${promoId}`}}>??????????????????</Link></p>
        </div>
        <div className="page-content">
          <Breadcrumbs crumbs={breadcrumbs}/>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">?????????????? ????????- ?? ????????????????????????</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <CatalogFilters/>
                </div>
                <div className="catalog__content">
                  <div className="catalog-sort">
                    <form action="#">
                      <div className="catalog-sort__inner">
                        <p className="title title--h5">??????????????????????:</p>
                        <div className="catalog-sort__type">
                          <div className="catalog-sort__btn-text">
                            <input type="radio" id="sortPrice" name="sort" value={CatalogSortType.Price} onChange={handleSortTypeChange} checked={catalogSortType === CatalogSortType.Price}/>
                            <label htmlFor="sortPrice">???? ????????</label>
                          </div>
                          <div className="catalog-sort__btn-text">
                            <input type="radio" id="sortPopular" name="sort" value={CatalogSortType.Rating} onChange={handleSortTypeChange} checked={catalogSortType === CatalogSortType.Rating}/>
                            <label htmlFor="sortPopular">???? ????????????????????????</label>
                          </div>
                        </div>
                        <div className="catalog-sort__order">
                          <div className="catalog-sort__btn catalog-sort__btn--up">
                            <input type="radio" id="up" name="sort-icon" aria-label="???? ??????????????????????" value={CatalogSortOrder.Ascending} onChange={handleSortOrderChange} checked={catalogSortOrder === CatalogSortOrder.Ascending}/>
                            <label htmlFor="up">
                              <svg width="16" height="14" aria-hidden="true">
                                <use xlinkHref="#icon-sort"></use>
                              </svg>
                            </label>
                          </div>
                          <div className="catalog-sort__btn catalog-sort__btn--down">
                            <input type="radio" id="down" name="sort-icon" aria-label="???? ????????????????" value={CatalogSortOrder.Descending} onChange={handleSortOrderChange} checked={catalogSortOrder === CatalogSortOrder.Descending}/>
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
                  <Pagination numberOfElements={productsTotalCount} initPage={pageId}/>
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

export default Catalog;
