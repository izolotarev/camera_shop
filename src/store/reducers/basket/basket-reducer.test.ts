import { makeFakeProduct } from '../../../utils/mocks';
import { selectProductToAddToBasket } from '../../actions/actions';
import { initialState, basketData } from './basket-reducer';

const product = makeFakeProduct();

describe('Function: basketData', () => {

  it('without additional parameters should return initial state', () => {
    expect(basketData(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should update productToAddtoBasket on select product action', () => {
    const state = {
      items: [],
      productToAddtoBasket: undefined,
      productToRemoveFromBasket: undefined,
      isRemoveItemPopupOpened: false,
      salePercent: 0,
      postCouponSuccess: false,
      postCouponError: false,
      postOrderSuccess: false,
      postOrderError: false,
      isOrderSuccessPopupOpened: false,
    };
    expect(basketData(state, selectProductToAddToBasket(product)))
      .toEqual({
        items: [],
        productToAddtoBasket: product,
        productToRemoveFromBasket: undefined,
        isRemoveItemPopupOpened: false,
        salePercent: 0,
        postCouponSuccess: false,
        postCouponError: false,
        postOrderSuccess: false,
        postOrderError: false,
        isOrderSuccessPopupOpened: false,
      });
  });

});
