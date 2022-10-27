
import { createReducer } from '@reduxjs/toolkit';
import { CameraState } from '../../../types/types';
import { loadCameras } from '../../actions/actions';

export const initialState: CameraState = {
  cameras: [],
  camerasLoaded: false,
  promo: undefined,
  isPromoLoaded: false,
};

export const camerasData = createReducer(initialState, (builder) => {
  builder.addCase(loadCameras, (state, action) => {
    state.cameras = action.payload.cameras;
    state.camerasLoaded = true;
  });
});
