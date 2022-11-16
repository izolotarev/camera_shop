import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeProduct } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { AppRoute } from '../../const/const';
import RatingStar from './rating-star';

const mockStore = configureMockStore();
const fakeProduct = makeFakeProduct();
const products = [fakeProduct];

const history = createMemoryHistory();
history.push(AppRoute.ROOT);

describe('Component: RatingStar', () => {

  it('should render "RatingStar"', () => {
    const store = mockStore({
      PRODUCTS: {
        productsLoaded: true,
        products: products,
        isPromoLoaded: true,
        promo: fakeProduct },
    });

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <RatingStar numberOfFullStars={3}/>
        </HistoryRouter>
      </Provider>
    );

    render(fakeApp);
    expect(screen.queryByRole('article')).toBeNull();
  });

});
