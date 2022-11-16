import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeProduct } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Pagination from './pagination';

const mockStore = configureMockStore();
const fakeProduct = makeFakeProduct();
const products = [fakeProduct];

const history = createMemoryHistory();

describe('Component: Pagination', () => {

  it('should render "Pagination"', () => {
    const store = mockStore({
      PRODUCTS: {
        productsLoaded: true,
        products: products,
        isPromoLoaded: true,
        promo: makeFakeProduct() },
    });

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Pagination numberOfElements={50} initPage={1} />
        </HistoryRouter>
      </Provider>
    );

    render(fakeApp);
    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
  });

});
