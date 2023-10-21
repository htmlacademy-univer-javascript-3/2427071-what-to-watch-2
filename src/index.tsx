import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const defaultProps = {
  filmName: 'The Grand Budapest Hotel',
  genre: 'Drama',
  releaseDate: '2014',
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App filmName={defaultProps.filmName}
      genre={defaultProps.genre}
      releaseDate={defaultProps.releaseDate}
    />
  </React.StrictMode>
);
