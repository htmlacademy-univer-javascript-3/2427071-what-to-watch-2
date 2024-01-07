import React, {useEffect} from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import MovieCardPoster from '../../components/film-card-poster/film-card-poster.tsx';
import { AppRoute } from '../../enums/app-route';
import FilmsList from '../../components/films-list/films-list';
import Tabs from '../../components/tabs/tabs';
import {useAppDispatch, useAppSelector} from '../../hooks/store.ts';
import {fetchFilmByIdAction, fetchFilmReviewsAction, fetchSimilarFilmsAction} from '../../store/api-actions.ts';
import {Spinner} from '../../components/spinner/spinner.tsx';
import {AuthStatus} from '../../enums/auth-status.ts';
import {getFilm, getIsLoadingFilm, getReviews} from '../../store/film-process/film-process.selectors.ts';
import {getAuthStatus} from '../../store/user-process/user-process.selectors.ts';
import FilmCardButtons from '../../components/film-card-buttons/film-card-buttons.tsx';
import { getFavoriteFilms } from '../../store/films-process/films-process.selectors.ts';

function MoviePage(): React.JSX.Element {
  const { id = '' } = useParams();

  const dispatch = useAppDispatch();
  const film = useAppSelector(getFilm);
  const reviews = useAppSelector(getReviews);
  const isLoading = useAppSelector(getIsLoadingFilm);
  const authStatus = useAppSelector(getAuthStatus);
  const isAuth = authStatus === AuthStatus.Auth;
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const isFavorite = favoriteFilms?.find(
    (favorite) => String(favorite.id) === String(film?.id)
  );

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
            <img src={film.backgroundImage} alt={film.name} />
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
              <FilmCardButtons
                isAuth={isAuth}
                id={film.id}
                isFavorite={Boolean(isFavorite)}
                isReviewButtonVisible
              />
            </div>
          </div>
        </div>
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <MovieCardPoster src={film.posterImage} alt={film.name} />
            <Tabs film={film} reviews={reviews} />
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
