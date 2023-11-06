import React from 'react';
import Footer from '../../components/footer/footer';
import MovieCard from '../../components/film-card/movie-card';
import Catalog from '../../components/catalog/catalog';

interface MainPageProps {
  filmName: string;
  genre: string;
  releaseDate: string;
}

function MainPage(props: MainPageProps): React.JSX.Element {
  return (
    <>
      <MovieCard {...props} />
      <div className="page-content">
        <Catalog/>
        <Footer/>
      </div>
    </>
  );
}

export default MainPage;
