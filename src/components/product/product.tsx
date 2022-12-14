import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppRoute, MAX_PRODUCT_RATING, ProductTabNames } from '../../const/const';
import { useAppDispatch } from '../../hooks/hooks';
import { clearProductById, openAddItemPopup, selectProductToAddToBasket } from '../../store/actions/actions';
import { fetchProductById, fetchReviews } from '../../store/actions/api.actions';
import { getProductById } from '../../store/reducers/products/products-selectors';
import { BreadcrumbsType } from '../../types/types';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import AddItemPopup from '../add-item-popup/add-item-popup';
import Footer from '../footer/footer';
import Header from '../header/header';
import LoadingScreen from '../loading-screen/loading-screen';
import RatingStar from '../rating-star/rating-star';
import Reviews from '../reviews/reviews';
import SimilarProductSlider from '../similar-product-slider/similar-product-slider';
import AddItemSuccessPopup from '../add-item-success-popup/add-item-success-popup';
import AddReviewPopup from '../add-review-popup/add-review-popup';
import AddReviewSuccessPopup from '../add-review-success-popup/add-review-success-popup';
import { toggleBodyScroll } from '../../utils/utils';


type ProductParams = {
  id:string;
}

function Product():JSX.Element {

  const params = useParams<ProductParams>();
  const id = parseInt(params.id ?? '', 10);

  const dispatch = useAppDispatch();
  const product = useSelector(getProductById);

  useEffect(() => {
    dispatch(fetchProductById(id));
    dispatch(fetchReviews(id));
    window.scrollTo(0,0);
    return () => {dispatch(clearProductById());};
  }, [dispatch, id]);

  const {previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name,
    rating, reviewCount, price, vendorCode, category, type, level, description} = product || {} ;

  const [activeTab, setActiveTab] = useState(ProductTabNames.DESCRIPTION);

  const handleDescriptionClick = () => {
    setActiveTab(ProductTabNames.DESCRIPTION);
  };

  const handleCharacteristicsClick = () => {
    setActiveTab(ProductTabNames.CHARACTERISTICS);
  };

  const handleAddToBasketClick = () => {
    if (!product) {return; }
    dispatch(selectProductToAddToBasket(product));
    dispatch(openAddItemPopup());
    toggleBodyScroll(true);
  };

  const handleGoUp = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const breadcrumbs: BreadcrumbsType[] =
  [
    {name: '??????????????', url: AppRoute.ROOT},
    {name: '??????????????', url: `${AppRoute.CATALOG}/page_1`},
    {name: product?.name ?? ''}
  ];

  if (!product) {
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
                    <p className="visually-hidden">??????????????: {rating}</p>
                    <p className="rate__count"><span className="visually-hidden">?????????? ????????????:</span>{reviewCount}</p>
                  </div>
                  <p className="product__price"><span className="visually-hidden">????????:</span>{price} ???</p>
                  <button className="btn btn--purple" type="button" onClick={handleAddToBasketClick}>
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>???????????????? ?? ??????????????
                  </button>
                  <div className="tabs product__tabs">
                    <div className="tabs__controls product__tabs-controls">
                      <button className={`tabs__control ${activeTab === ProductTabNames.CHARACTERISTICS ? 'is-active' : ''}`} type="button" onClick={handleCharacteristicsClick}>????????????????????????????</button>
                      <button className={`tabs__control ${activeTab === ProductTabNames.DESCRIPTION ? 'is-active' : ''}`} type="button" onClick={handleDescriptionClick}>????????????????</button>
                    </div>
                    <div className="tabs__content">
                      <div className={`tabs__element ${activeTab === ProductTabNames.CHARACTERISTICS ? 'is-active' : ''}`}>
                        <ul className="product__tabs-list">
                          <li className="item-list"><span className="item-list__title">??????????????:</span>
                            <p className="item-list__text"> {vendorCode}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">??????????????????:</span>
                            <p className="item-list__text">{category}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">?????? ????????????:</span>
                            <p className="item-list__text">{type}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">??????????????:</span>
                            <p className="item-list__text">{level}</p>
                          </li>
                        </ul>
                      </div>
                      <div className={`tabs__element ${activeTab === ProductTabNames.DESCRIPTION ? 'is-active' : ''}`}>
                        <div className="product__tabs-text">
                          <p>{description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="page-content__section">
            <SimilarProductSlider id={id} />
          </div>
          <div className="page-content__section">
            <Reviews/>
          </div>
        </div>
        <AddItemPopup/>
        <AddItemSuccessPopup/>
        <AddReviewPopup/>
        <AddReviewSuccessPopup/>
      </main>
      <button className="up-btn" onClick={handleGoUp}>
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </button>
      <Footer/>
    </div>
  );
}

export default Product;
