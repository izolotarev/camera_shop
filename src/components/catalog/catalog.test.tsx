import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeProduct } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Catalog from './catalog';
import thunk from 'redux-thunk';
import { FilterSettingsType } from '../../types/types';
import { CatalogSortOrder, CatalogSortType, FilterNames } from '../../const/const';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const fakeProduct = makeFakeProduct();
const products = [fakeProduct];
const fakeFilterSettings: FilterSettingsType = {
  minPrice: 0,
  maxPrice: 0,
  productsPrices: []
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
      }
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
