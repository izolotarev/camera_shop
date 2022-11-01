import { APIRoute, AppRoute } from '../../const/const';
import { ProductType, PromoType, ThunkActionResult } from '../../types/types';
import { loadProductById, loadProducts, loadPromo, redirectToRoute } from './actions';
//import axios, { AxiosError } from 'axios';


export const fetchProducts = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<ProductType[]>(APIRoute.PRODUCTS);
      dispatch(loadProducts(data));
    } catch(error) {
      //handleError(error);
    }
  };

export const fetchPromo = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<PromoType>(APIRoute.PROMO);
      dispatch(loadPromo(data));
    } catch (error) {
      // handleError(error);
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
