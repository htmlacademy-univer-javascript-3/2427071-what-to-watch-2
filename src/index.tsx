import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {store} from './store';
import {checkAuthStatusAction, fetchFilmsAction} from './store/api-actions.ts';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(fetchFilmsAction());
store.dispatch(checkAuthStatusAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
