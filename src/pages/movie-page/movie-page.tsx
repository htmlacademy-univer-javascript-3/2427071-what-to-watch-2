import React, {useEffect} from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import MovieCardPoster from '../../components/movie-card-poster/movie-card-poster';
import { AppRoute } from '../../enums/app-route';
import FilmsList from '../../components/films-list/films-list';
import Tabs from '../../components/tabs/tabs';
import {useAppDispatch, useAppSelector} from '../../hooks/store.ts';
import {fetchFilmByIdAction, fetchFilmReviewsAction, fetchSimilarFilmsAction} from '../../store/api-actions.ts';
import {Spinner} from '../../components/spinner/spinner.tsx';
import {AuthStatus} from '../../enums/auth-status.ts';
import {getFilm, getIsLoadingFilm} from '../../store/film-process/film-process.selectors.ts';
import {getAuthStatus} from '../../store/user-process/user-process.selectors.ts';

function MoviePage(): React.JSX.Element {
  const { id = '' } = useParams();

  const dispatch = useAppDispatch();
  const film = useAppSelector(getFilm);
  const isLoading = useAppSelector(getIsLoadingFilm);
  const authStatus = useAppSelector(getAuthStatus);
  const isAuth = authStatus === AuthStatus.Auth;

  useEffect(() => {
    if (id) {
      dispatch(fetchFilmByIdAction(id));
      dispatch(fetchSimilarFilmsAction(id));
      dispatch(fetchFilmReviewsAction(id));
    }
  }, [id, dispatch]);

  if (isLoading && !film) {
    return <Spinner />;
  }

  if (!film) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.posterImage} alt={film.name} />
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
                {isAuth && (
                  <Link
                    to={`${AppRoute.Films}/${film.id}${AppRoute.Review}`}
                    className="btn film-card__button"
                  >
                    Add review
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <MovieCardPoster src={film.backgroundImage} alt={film.name} />
            <Tabs film={film} />
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmsList length={4} />
        </section>
        <Footer />
      </div>
    </>
  );
}

export default MoviePage;
