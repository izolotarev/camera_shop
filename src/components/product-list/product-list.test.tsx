import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeProduct } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import ProductList from './product-list';

const mockStore = configureMockStore();
const fakeProduct = makeFakeProduct();
const products = [fakeProduct];

const history = createMemoryHistory();

describe('Component: ProductList', () => {

  it('should render "ProductList"', () => {
    const store = mockStore({
      PRODUCTS: {
        productsLoaded: true,
        products: products,
        isPromoLoaded: true,
        promo: fakeProduct
      },
      BASKET: {
        items: [{ product: fakeProduct, qty: 1}],
        productToAddToBasket: fakeProduct,
      }
    });

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductList products={products}/>
        </HistoryRouter>
      </Provider>
    );

    render(fakeApp);
    expect(products.length).toBe(1);
    expect(screen.getByText(fakeProduct.name)).toBeInTheDocument();
  });

});
