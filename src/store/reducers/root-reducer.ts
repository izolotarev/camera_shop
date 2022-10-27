import { combineReducers } from '@reduxjs/toolkit';
import { camerasData } from './cameras/cameras-reducer';


export enum NameSpace {
  cameras = 'CAMERAS',
  reviews = 'REVIEWS',
}

export const rootReducer = combineReducers({
  [NameSpace.cameras]: camerasData,
});

export type RootState = ReturnType<typeof rootReducer>;
