import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { createAPI } from './services/api';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './store/reducers/root-reducer';
import { redirect } from './store/middlewares/redirect';
import { fetchCameras } from './store/actions/api.actions';
import { Provider } from 'react-redux';
import browserHistory from './browser-history/browser-history';
import { unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';

const api = createAPI();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

export type AppDispatch = typeof store.dispatch

store.dispatch(fetchCameras());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
