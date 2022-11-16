import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeProduct } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import App from './app';
import { AppRoute } from '../../const/const';
import { render, screen } from '@testing-library/react';

const mockStore = configureMockStore();
const products = [makeFakeProduct()];

const history = createMemoryHistory();

describe('Application Routing', () => {

  it('should render "Catalog" screen when user navigate to "/"', () => {
    const store = mockStore({
      PRODUCTS: {productsLoaded: true, products: products, isPromoLoaded: true, promo: products[0] },
    });

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>
    );
    history.push(AppRoute.ROOT);
    render(fakeApp);
    expect(products.length).toBe(1);
    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
    expect(screen.getByText(/Сбросить поиск/i)).toBeInTheDocument();
  });

});
