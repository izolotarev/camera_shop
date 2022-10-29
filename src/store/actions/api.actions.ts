import { APIRoute } from '../../const/const';
import { ProductType, PromoType, ThunkActionResult } from '../../types/types';
import { loadProducts, loadPromo } from './actions';
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
