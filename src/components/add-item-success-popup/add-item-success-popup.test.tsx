import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeProduct } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import { AppRoute } from '../../const/const';
import { render, screen } from '@testing-library/react';
import AddItemSuccessPopup from './add-item-success-popup';


const mockStore = configureMockStore();
const fakeProduct = makeFakeProduct();

const products = [fakeProduct];

const history = createMemoryHistory();
history.push(AppRoute.ROOT);

describe('Component: AddItemSuccessPopup', () => {
  it('should render correctly', () => {
    const store = mockStore({
      PRODUCTS: {
        productsLoaded: true,
        products: products,
        isPromoLoaded: true,
        promo: products[0],
        isAddItemSuccessPopupOpened: true },
    });

    render (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddItemSuccessPopup/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();

  });

});
