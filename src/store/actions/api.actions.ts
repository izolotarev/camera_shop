import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { APIRoute, AppRoute } from '../../const/const';
import { PostReviewType, ProductType, PromoType, ReviewType, ThunkActionResult } from '../../types/types';
import { loadProductById, loadProducts, loadPromo, loadReviews, loadSimilarProducts, postReviewAction, postReviewError, redirectToRoute } from './actions';
//import axios, { AxiosError } from 'axios';


export const fetchProducts = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<ProductType[]>(APIRoute.PRODUCTS);
      dispatch(loadProducts(data));
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

const handleError = (err: unknown) => {
  if (axios.isAxiosError(err)) {
    const error = err as AxiosError;
    toast.info(error.message);
  }
};
