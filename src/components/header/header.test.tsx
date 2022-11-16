import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeProduct } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Header from './header';


const mockStore = configureMockStore();
const fakeProduct = makeFakeProduct();
const products = [fakeProduct];

const history = createMemoryHistory();

describe('Component: Header', () => {

  it('should render "Header"', () => {
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
          <Header/>
        </HistoryRouter>
      </Provider>
    );

    render(fakeApp);
    expect(screen.getByText(/О компании/i)).toBeInTheDocument();
    expect(screen.getByText(/Сбросить поиск/i)).toBeInTheDocument();
    expect(screen.getByText(/Гарантии/i)).toBeInTheDocument();
  });

});
