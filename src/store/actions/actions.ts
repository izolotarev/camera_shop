import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../../const/const';
import { CameraType } from '../../types/types';

export const loadCameras = createAction(
  ActionType.LoadCameras,
  (cameras: CameraType[]) => ({
    payload: {
      cameras,
    },
  }),
);
