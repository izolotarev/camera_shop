import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { APIRoute, AppRoute } from '../../const/const';
import { PostReviewType, ProductType, PromoType, ReviewType, ThunkActionResult } from '../../types/types';
import { loadFilterSettings, loadProductById, loadProducts, loadProductsFromSearch, loadProductsTotalCount, loadPromo, loadReviews, loadSimilarProducts, postReviewAction, postReviewError, redirectToRoute } from './actions';


export const fetchProducts = (params: string | null = null): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const response = await api.get<ProductType[]>(`${APIRoute.PRODUCTS}${params ? `?${params}` : ''}`);
      const {data, headers} = response;
      dispatch(loadProducts(data));
      const totalCount = parseInt(headers['x-total-count'] ?? '', 10);
      dispatch(loadProductsTotalCount(totalCount));
    } catch(error) {
      handleError(error);
    }
  };

export const fetchPromo = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<PromoType>(APIRoute.PROMO);
      dispatch(loadPromo(data));
    } catch (error) {
      handleError(error);
    }
  };

export const fetchProductById = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<ProductType>(`${APIRoute.PRODUCTS}/${id}`);
      dispatch(loadProductById(data));
    } catch {
      dispatch(redirectToRoute(AppRoute.NOT_FOUND));
    }
  };

export const fetchSimilarProducts = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<ProductType[]>(`${APIRoute.PRODUCTS}/${id}/similar`);
      dispatch(loadSimilarProducts(data));
    } catch (error) {
      handleError(error);
    }
  };

export const fetchReviews = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<ReviewType[]>(`${APIRoute.PRODUCTS}/${id}${APIRoute.REVIEWS}`);
      dispatch(loadReviews(data));
    } catch (error) {
      handleError(error);
    }
  };

export const postReview = (review: PostReviewType): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.post<ReviewType>(`${APIRoute.REVIEWS}`, review);
      dispatch(postReviewAction(data));
    } catch(error) {
      handleError(error);
      dispatch(postReviewError());
    }
  };

export const fetchProductsFromSearch = (input: string | null): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<ProductType[]>(`${APIRoute.PRODUCTS}?name_like=${input}`);
      dispatch(loadProductsFromSearch(data));
    } catch(error) {
      handleError(error);
    }
  };

export const fetchFilterSettings = (params: string | null = null): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<ProductType[]>(`${APIRoute.PRODUCTS}${params ? `?${params}` : ''}`);
      dispatch(loadFilterSettings(data));
    } catch(error) {
      handleError(error);
    }
  };

const handleError = (err: unknown) => {
  if (axios.isAxiosError(err)) {
    const error = err as AxiosError;
    toast.info(error.message);
  }
};
