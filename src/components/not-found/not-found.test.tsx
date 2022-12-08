import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeProduct } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import NotFound from './not-found';

const mockStore = configureMockStore();
const fakeProduct = makeFakeProduct();
const products = [fakeProduct];

const history = createMemoryHistory();

describe('Component: NotFound', () => {

  it('should render "NotFound"', () => {
    const store = mockStore({
      PRODUCTS: {
        productsLoaded: true,
        products: products,
        isPromoLoaded: true,
        promo: makeFakeProduct(),
        searchResultProducts: products,
        searchResultProductsLoaded: true,
      },
    });

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <NotFound/>
        </HistoryRouter>
      </Provider>
    );

    render(fakeApp);
    expect(screen.getByText(/404 Страница не найдена/i)).toBeInTheDocument();
  });

});
