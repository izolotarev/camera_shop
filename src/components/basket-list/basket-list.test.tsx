import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeProduct } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import BasketList from './basket-list';


const mockStore = configureMockStore();
const fakeProduct = makeFakeProduct();
const products = [fakeProduct];
const fakeItems = [{ product: fakeProduct, qty: 1}];

const history = createMemoryHistory();

describe('Component: BasketList', () => {

  it('should render "BasketList"', () => {
    const store = mockStore({
      PRODUCTS: {
        productsLoaded: true,
        products: products,
        isPromoLoaded: true,
        promo: fakeProduct
      },
      BASKET: {
        items: fakeItems,
        productToAddToBasket: fakeProduct,
      }
    });

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketList items={fakeItems}/>
        </HistoryRouter>
      </Provider>
    );

    render(fakeApp);
    expect(products.length).toBe(1);
    expect(screen.getByText(fakeProduct.name)).toBeInTheDocument();
  });

});
