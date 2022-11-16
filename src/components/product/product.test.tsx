import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeProduct, makeFakeReview } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Routes, unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Product from './product';
import { AppRoute } from '../../const/const';
import * as Redux from 'react-redux';

const mockStore = configureMockStore();
const fakeProduct = makeFakeProduct();
const products = [fakeProduct];

const fakeReview = makeFakeReview();
const reviews = [fakeReview];

const store = mockStore({
  PRODUCTS: {
    productsLoaded: true,
    products: products,
    isPromoLoaded: true,
    promo: makeFakeProduct()
  },
  REVIEWS: {
    reviews: [reviews],
    reviewsLoaded: true,
  }
});

const history = createMemoryHistory();
history.push(`${AppRoute.PRODUCTS}/${fakeProduct.id}`);

describe('Component: Product', () => {
  beforeAll(() => {
    window.scrollTo = jest.fn();
  });

  it('should render "Product"', async () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={`${AppRoute.PRODUCTS}/:id`} element={<Product/>}/>
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    render(fakeApp);
    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
    expect(screen.getByText(fakeProduct.description)).toBeInTheDocument();
    expect(screen.getByText(fakeProduct.name)).toBeInTheDocument();
  });

});
