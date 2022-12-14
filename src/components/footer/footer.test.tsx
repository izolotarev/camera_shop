import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeProduct } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Footer from './footer';


const mockStore = configureMockStore();
const fakeProduct = makeFakeProduct();
const products = [fakeProduct];

const history = createMemoryHistory();

describe('Component: Footer', () => {

  it('should render "Footer"', () => {
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
          <Footer/>
        </HistoryRouter>
      </Provider>
    );

    render(fakeApp);
    expect(screen.getByText(/Поддержка/i)).toBeInTheDocument();
    expect(screen.getByText(/Задать вопрос/i)).toBeInTheDocument();
    expect(screen.getByText(/Блог/i)).toBeInTheDocument();
  });

});
