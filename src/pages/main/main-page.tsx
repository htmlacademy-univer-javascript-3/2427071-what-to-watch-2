import React from 'react';
import Footer from '../../components/footer/footer';
import MovieCard from '../../components/film-card/movie-card';
import Catalog from '../../components/catalog/catalog';
import { IFilmExtended } from '../../types/film-types';

interface MainPageProps {
  films: IFilmExtended[];
}

function MainPage({ films }: MainPageProps): React.JSX.Element {
  return (
    <>
      <MovieCard film={films[0]} />
      <div className="page-content">
        <Catalog films={films}/>
        <Footer/>
      </div>
    </>
  );
}

export default MainPage;
