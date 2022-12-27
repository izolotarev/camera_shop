import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeProduct } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import App from './app';
import { AppRoute, CatalogSortOrder, CatalogSortType, FilterNames } from '../../const/const';
import { render, screen } from '@testing-library/react';
import thunk from 'redux-thunk';
import { FilterSettingsType } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const products = [makeFakeProduct()];
const fakeFilterSettings: FilterSettingsType = {
  minPrice: 0,
  maxPrice: 0,
  productsPrices: []
};

const history = createMemoryHistory();

describe('Application Routing', () => {

  it('should render "Catalog" screen when user navigate to "/"', () => {
    const store = mockStore({
      PRODUCTS: {
        productsLoaded: true,
        products: products,
        isPromoLoaded: true,
        promo: products[0],
        filterSettings: fakeFilterSettings,
        filterSettingsLoaded: true,
        searchResultProducts: products,
        searchResultProductsLoaded: true,
      },
      PRODUCTS_SORT: {
        catalogSortType: CatalogSortType.None,
        catalogSortOrder: CatalogSortOrder.None,
      },
      PRODUCTS_FILTER: {
        [FilterNames.PriceMin] : '',
        [FilterNames.PriceMax] : '',
        [FilterNames.Photocamera] : false,
        [FilterNames.Videocamera] : false,
        [FilterNames.Digital] : false,
        [FilterNames.Film] : false,
        [FilterNames.Snapshot] : false,
        [FilterNames.Collection] : false,
        [FilterNames.Zero] : false,
        [FilterNames.NonProfessional] : false,
        [FilterNames.Professional] : false,
      },
      BASKET: {
        items: [{ product: makeFakeProduct(), qty: 1}],
        productToAddToBasket: makeFakeProduct(),
      }
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
