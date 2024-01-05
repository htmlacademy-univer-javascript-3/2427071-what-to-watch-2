import FilmCardButtons from '../film-card-buttons/film-card-buttons';
import Header from '../header/header';
import React from 'react';
import MovieCardPoster from '../movie-card-poster/movie-card-poster';
import { IFilmPromo} from '../../types/film-types';
import { useAppSelector } from '../../hooks/store';
import { getAuthStatus } from '../../store/user-process/user-process.selectors';
import { AuthStatus } from '../../enums/auth-status';
import { getFavoriteFilms } from '../../store/films-process/films-process.selectors';

type FilmProps = {
  film: IFilmPromo;
};

function FilmCard({film}: FilmProps): React.JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);
  const isAuth = authStatus === AuthStatus.Auth;
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const isFavorite = favoriteFilms?.find(
    (favorite) => String(favorite.id) === String(film.id)
  );

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={film.backgroundImage} alt={film.name}/>
      </div>
      <h1 className="visually-hidden">WTW</h1>
      <Header/>
      <div className="film-card__wrap">
        <div className="film-card__info">
          <MovieCardPoster src={film.posterImage} alt={film.name} />
          <div className="film-card__desc">
            <h2 className="film-card__title">{film.name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{film.genre}</span>
              <span className="film-card__year">{film.released}</span>
            </p>
            <FilmCardButtons
              id={film.id}
              isFavorite={Boolean(isFavorite)}
              isAuth={isAuth}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const FilmCardMemo = React.memo(FilmCard);

export default FilmCardMemo;
