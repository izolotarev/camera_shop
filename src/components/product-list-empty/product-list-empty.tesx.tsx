import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeProduct } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import ProductListEmpty from './product-list-empty';
import { AppRoute } from '../../const/const';

const mockStore = configureMockStore();
const fakeProduct = makeFakeProduct();
const products = [fakeProduct];

const history = createMemoryHistory();
history.push(AppRoute.ROOT);

describe('Component: ProductListEmpty', () => {

  it('should render "ProductListEmpty"', () => {
    const store = mockStore({
      PRODUCTS: {
        productsLoaded: true,
        products: products,
        isPromoLoaded: true,
        promo: fakeProduct },
    });

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductListEmpty/>
        </HistoryRouter>
      </Provider>
    );

    render(fakeApp);
    expect(screen.getByText(/по вашему запросу ничего не найдено/i)).toBeInTheDocument();
  });

});
