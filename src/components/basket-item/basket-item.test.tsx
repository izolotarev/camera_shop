import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeProduct } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import BasketItem from './basket-item';


const mockStore = configureMockStore();
const fakeProduct = makeFakeProduct();
const products = [fakeProduct];
const fakeItem = { product: fakeProduct, qty: 1 };

const history = createMemoryHistory();

describe('Component: BasketItem', () => {

  it('should render "BasketItem"', () => {
    const store = mockStore({
      PRODUCTS: {
        productsLoaded: true,
        products: products,
        isPromoLoaded: true,
        promo: fakeProduct
      },
      BASKET: {
        items: [fakeItem]
      }
    });

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketItem basketItem={fakeItem}/>
        </HistoryRouter>
      </Provider>
    );

    render(fakeApp);
    expect(screen.getByText(fakeProduct.name)).toBeInTheDocument();
  });

});
