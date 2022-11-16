import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeProduct, makeFakeReview } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import { AppRoute } from '../../const/const';
import { render, screen } from '@testing-library/react';
import ReviewListEmpty from './review-list-empty';

const mockStore = configureMockStore();

const fakeProduct = makeFakeProduct();
const products = [fakeProduct];

const fakeReview = makeFakeReview();
const reviews = [fakeReview];


const history = createMemoryHistory();
history.push(`${AppRoute.PRODUCTS}/${fakeProduct.id}`);

describe('Component: ReviewListEmpty', () => {

  it('should render correctly', () => {
    const store = mockStore({
      PRODUCTS: {
        productsLoaded: true,
        products: products,
        isPromoLoaded: true,
        promo: products[0],
        isAddItemSuccessPopupOpened: true },
      REVIEWS: {
        reviews: [reviews],
        reviewsLoaded: true,
        isAddReviewPopupOpened:true
      }
    });

    render (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewListEmpty/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Нет отзывов/i)).toBeInTheDocument();

  });

});
