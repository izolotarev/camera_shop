import { APIRoute } from '../../const/const';
import { CameraType, ThunkActionResult } from '../../types/types';
import { loadCameras } from './actions';
//import axios, { AxiosError } from 'axios';


export const fetchCameras = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<CameraType[]>(APIRoute.CAMERAS);
      dispatch(loadCameras(data));
    } catch(error) {
      //handleError(error);
    }
  };
