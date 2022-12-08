import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeProduct } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import { AppRoute } from '../../const/const';
import { render, screen } from '@testing-library/react';
import Basket from './basket';


const mockStore = configureMockStore();
const fakeProduct = makeFakeProduct();

const products = [fakeProduct];

const history = createMemoryHistory();

describe('Component: Basket', () => {
  it('should render correctly', () => {
    const store = mockStore({
      PRODUCTS: {
        productsLoaded: true,
        products: products,
        isPromoLoaded: true,
        promo: products[0],
        searchResultProducts: products,
        searchResultProductsLoaded: true,
      }
    });

    render (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Basket/>
        </HistoryRouter>
      </Provider>,
    );

    history.push(AppRoute.BASKET);

    expect(products.length).toBe(1);
    expect(screen.getByText(/Оформить заказ/i)).toBeInTheDocument();
    expect(screen.getByText(/Если у вас есть промокод на скидку, примените его в этом поле/i)).toBeInTheDocument();

  });

});
