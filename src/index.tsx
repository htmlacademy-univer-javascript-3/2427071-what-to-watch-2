import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom/client';

import App from './components/app/app';
import { films } from './mocks/films';
import {store} from './store';

const defaultProps = {
  films: films,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App films={defaultProps.films}/>
    </Provider>
  </React.StrictMode>
);
