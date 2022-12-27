import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeProduct } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import ErrorPage from './error-page';

const mockStore = configureMockStore();
const fakeProduct = makeFakeProduct();
const products = [fakeProduct];

const history = createMemoryHistory();

describe('Component: ErrorPage', () => {

  it('should render "ErrorPage"', () => {
    const store = mockStore({
      PRODUCTS: {
        productsLoaded: true,
        products: products,
        isPromoLoaded: true,
        promo: makeFakeProduct(),
        searchResultProducts: products,
        searchResultProductsLoaded: true,
      },
      BASKET: {
        items: [{ product: fakeProduct, qty: 1}],
        productToAddToBasket: fakeProduct,
      }
    });

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ErrorPage/>
        </HistoryRouter>
      </Provider>
    );

    render(fakeApp);
    expect(screen.getByText(/Упс. Что-то пошло не так.../i)).toBeInTheDocument();
  });

});
