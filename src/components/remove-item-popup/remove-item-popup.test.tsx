import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeProduct } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import { AppRoute } from '../../const/const';
import { render, screen } from '@testing-library/react';
import RemoveItemPopup from './remove-item-popup';


const mockStore = configureMockStore();
const fakeProduct = makeFakeProduct();

const products = [fakeProduct];

const history = createMemoryHistory();
history.push(AppRoute.ROOT);

describe('Component: RemoveItemPopup', () => {
  it('should render correctly', () => {
    const store = mockStore({
      PRODUCTS: {
        productsLoaded: true,
        products: products,
        isPromoLoaded: true,
        promo: products[0],
        isAddItemPopupOpened: true
      },
      BASKET: {
        items: [{ product: fakeProduct, qty: 1}],
        productToAddToBasket: fakeProduct,
      }
    });

    render (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <RemoveItemPopup/>
        </HistoryRouter>
      </Provider>,
    );

    expect(products.length).toBe(1);
    expect(screen.getByText(/Удалить этот товар?/i)).toBeInTheDocument();

  });

});
