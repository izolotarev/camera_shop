import { makeFakeProduct } from '../../../utils/mocks';
import { loadProducts } from '../../actions/actions';
import { initialState, productsData } from './products-reducer';

const products = [makeFakeProduct()];

describe('Function: productsData', () => {

  it('without additional parameters should return initial state', () => {
    expect(productsData(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should update products on data load', () => {
    const state = {
      products: [],
      productsLoaded: false,
      promo: undefined,
      isPromoLoaded: false,
      productToAddtoBasket: undefined,
      isAddItemPopupOpened: false,
      isAddItemSuccessPopupOpened: false,
      product: undefined,
      isProductLoaded: false,
      similarProducts: [],
      similarProductsLoaded: false,
    };
    expect(productsData(state, loadProducts(products)))
      .toEqual({
        products: products,
        productsLoaded: true,
        promo: undefined,
        isPromoLoaded: false,
        productToAddtoBasket: undefined,
        isAddItemPopupOpened: false,
        isAddItemSuccessPopupOpened: false,
        product: undefined,
        isProductLoaded: false,
        similarProducts: [],
        similarProductsLoaded: false,
      });
  });

});
