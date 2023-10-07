import FilmCardButtons from '../film-card-buttons/film-card-buttons';
import Header from '../header/header';
import React from 'react';
import MovieCardPoster from '../movie-card-poster/movie-card-poster';

type MovieProps = {
  filmName: string;
  genre: string;
  releaseDate: string;
};

function MovieCard({filmName, genre, releaseDate,}: MovieProps): React.JSX.Element {
  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img
          src="img/bg-the-grand-budapest-hotel.jpg"
          alt="The Grand Budapest Hotel"
        />
      </div>
      <h1 className="visually-hidden">WTW</h1>
      <Header/>
      <div className="film-card__wrap">
        <div className="film-card__info">
          <MovieCardPoster/>
          <div className="film-card__desc">
            <h2 className="film-card__title">{filmName}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{genre}</span>
              <span className="film-card__year">{releaseDate}</span>
            </p>
            <FilmCardButtons/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MovieCard;
