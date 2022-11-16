import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeProduct } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import ProductCard from './product-card';

const mockStore = configureMockStore();
const fakeProduct = makeFakeProduct();
const products = [fakeProduct];

const history = createMemoryHistory();

describe('Component: ProductCard', () => {

  it('should render "ProductCard"', () => {
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
          <ProductCard product={fakeProduct}/>
        </HistoryRouter>
      </Provider>
    );

    render(fakeApp);
    expect(screen.getByText(fakeProduct.name)).toBeInTheDocument();
  });

});
