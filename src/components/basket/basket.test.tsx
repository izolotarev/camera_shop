import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeProduct } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Basket from './basket';


const mockStore = configureMockStore();
const fakeProduct = makeFakeProduct();

const products = [fakeProduct];

const history = createMemoryHistory();
window.scroll = jest.fn();

describe('Component: Basket', () => {
  it('should render correctly', async () => {
    const store = mockStore({
      PRODUCTS: {
        productsLoaded: true,
        products: products,
        isPromoLoaded: true,
        promo: products[0],
        searchResultProducts: products,
        searchResultProductsLoaded: true,
      },
      BASKET: {
        items: [{ product: fakeProduct, qty: 1}],
        productToAddToBasket: fakeProduct,
      }
    });

    render (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Basket/>
        </HistoryRouter>
      </Provider>,
    );

    expect(products.length).toBe(1);
    expect(screen.getByText(/Оформить заказ/i)).toBeInTheDocument();
    expect(screen.getByText(/Если у вас есть промокод на скидку, примените его в этом поле/i)).toBeInTheDocument();

  });

});
