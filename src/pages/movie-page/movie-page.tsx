import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import MovieCardPoster from '../../components/movie-card-poster/movie-card-poster';
import Card from '../../components/card/card';
import { IFilmExtended } from '../../types/film-types';
import { AppRoute } from '../../enums/app-route';
import FilmsList from '../../components/films-list/films-list';

type MoviePageProps = {
  films: IFilmExtended[];
};

function MoviePage({ films }: MoviePageProps): React.JSX.Element {

  const { id = '' } = useParams();
  const film = films.find((f) => f.id === Number(id));

  if (!film) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img
              src="img/bg-the-grand-budapest-hotel.jpg"
              alt="The Grand Budapest Hotel"
            />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <Header />
          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>
              <div className="film-card__buttons">
                <button
                  className="btn btn--play film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 19" width={19} height={19}>
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  className="btn btn--list film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 20" width={19} height={20}>
                    <use xlinkHref="#add" />
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <Link
                  to={`${AppRoute.Films}/${film.id}${AppRoute.Review}`}
                  className="btn film-card__button"
                >
                  Add review
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <MovieCardPoster src={film.backgroundImage} alt={film.alt} />
            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <ul className="film-nav__list">
                  <li className="film-nav__item film-nav__item--active">
                    <a href="src/pages/movie-page/movie-page#MoviePage.tsx" className="film-nav__link">
                      Overview
                    </a>
                  </li>
                  <li className="film-nav__item">
                    <a href="src/pages/movie-page/movie-page#MoviePage.tsx" className="film-nav__link">
                      Details
                    </a>
                  </li>
                  <li className="film-nav__item">
                    <a href="src/pages/movie-page/movie-page#MoviePage.tsx" className="film-nav__link">
                      Reviews
                    </a>
                  </li>
                </ul>
              </nav>
              <div className="film-rating">
                <div className="film-rating__score">{film.rating}</div>
                <p className="film-rating__meta">
                  <span className="film-rating__level">Very good</span>
                  <span className="film-rating__count">240 ratings</span>
                </p>
              </div>
              <div className="film-card__text">
                <p>{film.description}</p>
                <p className="film-card__director">
                <strong>Director: {film.director}</strong>
                </p>
                <p className="film-card__starring">
                <strong>Starring:{film.starring.join(', ')}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmsList films={films} />
        </section>
        <Footer />
      </div>
    </>
  );
}

export default MoviePage;
