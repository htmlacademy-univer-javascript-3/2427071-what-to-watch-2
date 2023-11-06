import FilmCardButtons from '../film-card-buttons/film-card-buttons';
import Header from '../header/header';
import React from 'react';
import MovieCardPoster from '../movie-card-poster/movie-card-poster';
import { IFilmExtended } from '../../types/film-types';

type MovieProps = {
  film: IFilmExtended;
};

function MovieCard({film}: MovieProps): React.JSX.Element {
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
          <MovieCardPoster src={film.backgroundImage} alt={film.alt} />
          <div className="film-card__desc">
            <h2 className="film-card__title">{film.name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{film.genre}</span>
              <span className="film-card__year">{film.released}</span>
            </p>
            <FilmCardButtons/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MovieCard;
