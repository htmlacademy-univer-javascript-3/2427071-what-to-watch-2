import {store} from '../store';
import {UserData} from './auth.ts';
import {AuthStatus} from '../enums/auth-status.ts';
import {ALL_GENRES} from '../constants/genres.ts';
import {IReview} from './review-types.ts';
import {IFilm, IFilmPromoInfo, IFilmPromo} from './film-types.ts';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcessState = {
  authorizationStatus: AuthStatus;
  user: UserData | null;
}

export type FilmsProcessState = {
  films: IFilm[];
  activeGenre: string | typeof ALL_GENRES;
  genreFilms: IFilm[];
  promoFilm: IFilmPromo | null;
  isLoadingList: boolean;
  favoriteFilms: IFilm[];
}

export type FilmProcessState = {
  currentFilm: IFilmPromoInfo | null ;
  isLoadingFilm: boolean;
  similarFilms: IFilm[];
  reviews: IReview[];
}
