import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const defaultProps = {
  movieName: 'The Grand Budapest Hotel',
  genre: 'Drama',
  promoDate: '2014',
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App movieName={defaultProps.movieName}
      genre={defaultProps.genre}
      promoDate={defaultProps.movieName}
    />
  </React.StrictMode>
);
