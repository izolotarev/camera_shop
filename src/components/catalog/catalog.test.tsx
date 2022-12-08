import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeProduct } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Catalog from './catalog';
import thunk from 'redux-thunk';
import { FilterSettingsType } from '../../types/types';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const fakeProduct = makeFakeProduct();
const products = [fakeProduct];
const fakeFilterSettings: FilterSettingsType = {
  minPrice: 0,
  maxPrice: 0,
};

const history = createMemoryHistory();

describe('Component: Catalog', () => {

  it('should render "Catalog"', () => {
    const store = mockStore({
      PRODUCTS: {
        productsLoaded: true,
        products: products,
        isPromoLoaded: true,
        promo: makeFakeProduct(),
        filterSettings: fakeFilterSettings,
        filterSettingsLoaded: true,
        searchResultProducts: products,
        searchResultProductsLoaded: true,
      },
    });

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Catalog/>
        </HistoryRouter>
      </Provider>
    );

    render(fakeApp);
    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });

});
