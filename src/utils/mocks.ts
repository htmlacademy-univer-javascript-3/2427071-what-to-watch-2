import {ThunkDispatch} from '@reduxjs/toolkit';
import {Action} from 'redux';
import {datatype, name, internet, commerce, lorem} from 'faker';
import {ALL_GENRES} from '../constants/genres';
import {AuthStatus} from '../enums/auth-status';
import {createApi} from '../services/api';
import {State} from '../types/state';
import {Token} from '../services/token';
import {AuthData, UserData} from '../types/auth';
import {IReview} from '../types/review-types';
import {IFilm, IFilmPromo, IFilmPromoInfo} from '../types/film-types';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createApi>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({type}) => type);

export const createFakeUser = (): AuthData => ({
  email: internet.email(),
  password: internet.password()
} as AuthData);

export const createFakeToken = (): Token => datatype.uuid();

export const createUser = {
  id: datatype.number(),
  email: internet.email(),
  token: datatype.uuid(),
  name: name.firstName(),
  avatarUrl: internet.url(),
} as UserData;

export const createFilm = (): IFilm => ({
  id: datatype.uuid(),
  name: name.title(),
  previewImage: internet.url(),
  previewVideoLink: internet.url(),
  genre: name.gender(),
  alt: name.title(),
} as IFilm);

export const createCurrentFilm = (): IFilmPromoInfo => ({
  id: datatype.uuid(),
  name: name.title(),
  posterImage: internet.url(),
  backgroundImage: internet.url(),
  videoLink: internet.url(),
  genre: name.title(),
  alt: name.title(),
  released: datatype.number(),
  isFavorite: true,
  backgroundColor: commerce.color(),
  description: lorem.words(10),
  rating: datatype.number(),
  scoresCount: datatype.number(),
  director: name.firstName(),
  starring: [name.title()],
  runTime: datatype.number(),
} as IFilmPromoInfo);

export const createPromoFilm = (): IFilmPromo => ({
  id: datatype.uuid(),
  name: name.title(),
  posterImage: internet.url(),
  backgroundImage: internet.url(),
  videoLink: internet.url(),
  genre: name.title(),
  alt: name.title(),
  released: datatype.number(),
  isFavorite: true,
} as IFilmPromo);

export const createReview = (): IReview => ({
  id: datatype.uuid(),
  date: String(datatype.datetime()),
  user: name.title(),
  comment: lorem.words(10),
  rating: datatype.number(),
} as IReview);


export const createFakeStore = (initialState?: Partial<State>): State => ({
  USER: {authorizationStatus: AuthStatus.NoAuth, user: null, hasError: false},
  FILM: {
    currentFilm: null,
    isLoadingFilm: true,
    similarFilms: [],
    reviews: [],
  },
  FILMS: {
    films: [],
    activeGenre: ALL_GENRES,
    genreFilms: [],
    promoFilm: null,
    isLoadingList: true,
    favoriteFilms: [],
    isPromoLoading: false,
  },
  ...initialState ?? {},
});
