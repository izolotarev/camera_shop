import { createAPI } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/types';
import { Action } from 'redux';
import { makeFakeCoupon, makeFakeOrder, makeFakeProduct, makeFakeReview } from '../../utils/mocks';
import { APIRoute, AppRoute } from '../../const/const';
import { fetchFilterSettings, fetchProductById, fetchProducts, fetchProductsFromSearch, fetchPromo, fetchReviews, fetchSimilarProducts, postCoupon, postOrder, postReview } from './api.actions';
import { loadFilterSettings, loadProducts, loadProductsFromSearch, loadPromo, loadReviews, loadSimilarProducts, openAddOrderSuccessPopup, postCouponAction, postOrderAction, postReviewAction, redirectToRoute } from './actions';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch loadProducts on GET /cameras', async () => {
    const mockProducts = [makeFakeProduct()];
    mockAPI
      .onGet(APIRoute.PRODUCTS)
      .reply(200, mockProducts);

    const store = mockStore();
    await store.dispatch(fetchProducts());

    expect(store.getActions()).toEqual([
      loadProducts(mockProducts),
    ]);
  });

  it('should dispatch loadPromo on GET /promo', async () => {
    const mockPromo = makeFakeProduct();
    mockAPI
      .onGet(APIRoute.PROMO)
      .reply(200, mockPromo);

    const store = mockStore();
    await store.dispatch(fetchPromo());

    expect(store.getActions()).toEqual([
      loadPromo(mockPromo),
    ]);
  });

  it('should redirect to page Not Found on GET /cameras/:id is rejected', async () => {
    const mockProduct = makeFakeProduct();
    mockAPI
      .onGet(`${APIRoute.PRODUCTS}/${mockProduct.id}`)
      .reply(400);

    const store = mockStore();
    await store.dispatch(fetchProductById(mockProduct.id));
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.NOT_FOUND),
    ]);
  });

  it('should dispatch loadSimilarProducts on GET /cameras/:id/similar', async () => {
    const mockProduct = makeFakeProduct();
    const mockSimilarProducts = [makeFakeProduct()];
    mockAPI
      .onGet(`${APIRoute.PRODUCTS}/${mockProduct.id}/similar`)
      .reply(200, mockSimilarProducts);

    const store = mockStore();
    await store.dispatch(fetchSimilarProducts(mockProduct.id));

    expect(store.getActions()).toEqual([
      loadSimilarProducts(mockSimilarProducts),
    ]);
  });

  it('should dispatch loadReviews on GET /cameras/:id/reviews', async () => {
    const mockProduct = makeFakeProduct();
    const mockReviews = [makeFakeReview()];
    mockAPI
      .onGet(`${APIRoute.PRODUCTS}/${mockProduct.id}${APIRoute.REVIEWS}`)
      .reply(200, mockReviews);

    const store = mockStore();
    await store.dispatch(fetchReviews(mockProduct.id));

    expect(store.getActions()).toEqual([
      loadReviews(mockReviews),
    ]);
  });

  it('should dispatch postReviewAction on POST /reviews', async () => {
    const mockReview = makeFakeReview();
    mockAPI
      .onPost(`${APIRoute.REVIEWS}`, mockReview)
      .reply(201, mockReview);

    const store = mockStore();
    await store.dispatch(postReview(mockReview));

    expect(store.getActions()).toEqual([
      postReviewAction(mockReview),
    ]);
  });

  it('should dispatch loadProductsFromSearch on GET /cameras?name_like=', async () => {
    const fakeProduct = makeFakeProduct();
    const mockProducts = [fakeProduct];

    mockAPI
      .onGet(`${APIRoute.PRODUCTS}?name_like=${fakeProduct.name}`)
      .reply(200, mockProducts);

    const store = mockStore();
    await store.dispatch(fetchProductsFromSearch(fakeProduct.name));

    expect(store.getActions()).toEqual([
      loadProductsFromSearch(mockProducts),
    ]);
  });

  it('should dispatch loadFilterSettings on GET /cameras', async () => {
    const fakeProduct = makeFakeProduct();
    const mockProducts = [fakeProduct];

    mockAPI
      .onGet(APIRoute.PRODUCTS)
      .reply(200, mockProducts);

    const store = mockStore();
    await store.dispatch(fetchFilterSettings());

    expect(store.getActions()).toEqual([
      loadFilterSettings(mockProducts),
    ]);
  });

  it('should dispatch postCouponAction on POST /coupons', async () => {
    const mockCoupon = makeFakeCoupon();
    const mockSale = 1;

    mockAPI
      .onPost(`${APIRoute.COUPONS}`, mockCoupon)
      .reply(201, mockSale);

    const store = mockStore();
    await store.dispatch(postCoupon(mockCoupon));

    expect(store.getActions()).toEqual([
      postCouponAction(mockSale),
    ]);
  });

  it('should dispatch postOrderAction on POST /orders', async () => {
    const mockOrder = makeFakeOrder();

    mockAPI
      .onPost(`${APIRoute.ORDERS}`, mockOrder)
      .reply(201);

    const store = mockStore();
    await store.dispatch(postOrder(mockOrder));

    expect(store.getActions()).toEqual([
      postOrderAction(),
      openAddOrderSuccessPopup()
    ]);
  });

});
