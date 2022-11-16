import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeProduct, makeFakeReview } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import { AppRoute } from '../../const/const';
import { render, screen } from '@testing-library/react';
import AddReviewSuccessPopup from './add-review-success-popup';


const mockStore = configureMockStore();

const fakeProduct = makeFakeProduct();
const products = [fakeProduct];

const fakeReview = makeFakeReview();
const reviews = [fakeReview];


const history = createMemoryHistory();
history.push(`${AppRoute.PRODUCTS}/${fakeProduct.id}`);

describe('Component: AddReviewSuccessPopup', () => {
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
        isAddReviewSuccessPopupOpened:true
      }
    });

    render (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddReviewSuccessPopup/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Спасибо за отзыв/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться к покупкам/i)).toBeInTheDocument();

  });

});
