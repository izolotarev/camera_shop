import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeProduct, makeFakeReview } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import { AppRoute } from '../../const/const';
import { render, screen } from '@testing-library/react';
import SimilarProductSlider from './similar-product-slider';
import * as Redux from 'react-redux';

const mockStore = configureMockStore();

const fakeProduct = makeFakeProduct();
const products = [fakeProduct];

const fakeReview = makeFakeReview();
const reviews = [fakeReview];


const history = createMemoryHistory();
history.push(`${AppRoute.PRODUCTS}/${fakeProduct.id}`);

describe('Component: SimilarProducts', () => {

  it('should render correctly', async () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const store = mockStore({
      PRODUCTS: {
        productsLoaded: true,
        products: products,
        isPromoLoaded: true,
        promo: products[0],
        isAddItemSuccessPopupOpened: true,
        similarProducts: products,
        similarProductsLoaded: true,
      },
      REVIEWS: {
        reviews: [reviews],
        reviewsLoaded: true,
        isAddReviewPopupOpened:true
      }
    });

    render (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SimilarProductSlider id={fakeProduct.id}/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(fakeProduct.description)).toBeInTheDocument();

  });

});
