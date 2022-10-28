import { APIRoute } from '../../const/const';
import { ProductType, ThunkActionResult } from '../../types/types';
import { loadProducts } from './actions';
//import axios, { AxiosError } from 'axios';


export const fetchCameras = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<ProductType[]>(APIRoute.PRODUCTS);
      dispatch(loadProducts(data));
    } catch(error) {
      //handleError(error);
    }
  };
