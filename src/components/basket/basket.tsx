import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppRoute } from '../../const/const';
import { useAppDispatch } from '../../hooks/hooks';
import { clearPostCouponError, clearPostCouponStatus, clearPostOrderError, clearPostOrderStatus, clearSalePercent } from '../../store/actions/actions';
import { postCoupon, postOrder } from '../../store/actions/api.actions';
import { getBasketTotalPrice, getCouponPostError, getCouponPostStatus, getItems, getProductsInBasketIds, getSale, getTotalPriceMinusSale } from '../../store/reducers/basket/basket-selectors';
import { BreadcrumbsType } from '../../types/types';
import AddOrderSuccessPopup from '../add-order-success-popup/add-order-success-popup';
import BasketListEmpty from '../basket-list-empty/basket-list-empty';
import BasketList from '../basket-list/basket-list';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import Footer from '../footer/footer';
import Header from '../header/header';
import RemoveItemPopup from '../remove-item-popup/remove-item-popup';

function Basket():JSX.Element {

  const items = useSelector(getItems);
  const totalPrice = useSelector(getBasketTotalPrice);
  const postCouponSuccess = useSelector(getCouponPostStatus);
  const postCouponError = useSelector(getCouponPostError);
  const sale = useSelector(getSale);
  const totalPriceMinusSale = useSelector(getTotalPriceMinusSale);

  const camerasIds = useSelector(getProductsInBasketIds);

  const [coupon, setCoupon] = useState('');
  const [disabledForm, setDisabledForm] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setDisabledForm(false);
    if (postCouponError) {
      dispatch(clearSalePercent());
    }

  }, [dispatch, postCouponSuccess, postCouponError]);

  const handleCouponChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setCoupon(evt.target.value);
  };

  const handleSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();
    setDisabledForm(true);
    dispatch(clearPostCouponStatus());
    dispatch(clearPostCouponError());
    dispatch(postCoupon({ coupon }));
  };

  const handleSubmitOrder = () => {
    dispatch(clearPostOrderStatus());
    dispatch(clearPostOrderError());
    dispatch(postOrder(
      {
        camerasIds,
        coupon: coupon === '' || postCouponError ? null : coupon
      }
    ));
  };

  useEffect(() => {
    window.scroll(0,0);

    return () => {
      dispatch(clearSalePercent());
      dispatch(clearPostCouponStatus());
      dispatch(clearPostCouponError());
    };
  }, [dispatch]);

  const breadcrumbs: BreadcrumbsType[] =
  [
    {name: 'Главная', url: AppRoute.ROOT},
    {name: 'Каталог', url: `${AppRoute.CATALOG}/page_1`},
    {name: 'Корзина'}
  ];
  return (
    <div className="wrapper">
      <Header/>
      <main>
        <div className="page-content">
          <Breadcrumbs crumbs={breadcrumbs}/>
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              {
                items && items.length > 0
                  ? <BasketList items={items} />
                  : <BasketListEmpty/>
              }
              <div className="basket__summary">
                <div className="basket__promo">
                  <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
                  <div className="basket-form">
                    <form method="post" onSubmit={handleSubmit}>
                      <div className={`custom-input ${postCouponSuccess ? 'is-valid' : ''} ${postCouponError ? 'is-invalid' : ''}`}>
                        <label><span className="custom-input__label">Промокод</span>
                          <input type="text" name="promo" placeholder="Введите промокод" value={coupon} onChange={handleCouponChange} disabled={disabledForm}/>
                        </label>
                        <p className="custom-input__error">Промокод неверный</p>
                        <p className="custom-input__success">Промокод принят!</p>
                      </div>
                      <button className="btn" type="submit">Применить
                      </button>
                    </form>
                  </div>
                </div>
                <div className="basket__summary-order">
                  <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">{totalPrice} ₽</span></p>
                  <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className="basket__summary-value basket__summary-value--bonus">{sale} ₽</span></p>
                  <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">{totalPriceMinusSale} ₽</span></p>
                  <button className="btn btn--purple" type="submit" onClick={handleSubmitOrder}>Оформить заказ
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
        <RemoveItemPopup/>
        <AddOrderSuccessPopup/>
      </main>
      <Footer/>
    </div>
  );
}

export default Basket;
