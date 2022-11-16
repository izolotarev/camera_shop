import { createAPI } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/types';
import { Action } from 'redux';
import { makeFakeProduct, makeFakeReview } from '../../utils/mocks';
import { APIRoute, AppRoute } from '../../const/const';
import { fetchProductById, fetchProducts, fetchPromo, fetchReviews, fetchSimilarProducts, postReview } from './api.actions';
import { loadProducts, loadPromo, loadReviews, loadSimilarProducts, postReviewAction, redirectToRoute } from './actions';

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

});
