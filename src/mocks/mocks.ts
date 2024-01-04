import { Action } from 'redux';
import {datatype, name, internet, commerce, lorem} from 'faker';
import { ThunkDispatch } from 'redux-thunk';
import { createApi } from '../services/api';
import {Token} from '../services/token.ts';
import {AuthData} from '../types/auth.ts';
import {IReview} from '../types/review-types.ts';
import { State } from '../types/state';
import {IFilm, IFilmPromo, IFilmPromoInfo} from '../types/film-types.ts';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createApi>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const createFakeUser = (): AuthData => ({
  email: internet.email(),
  password: internet.password()
} as AuthData);

export const createFakeToken = (): Token => datatype.uuid();

export const createFilm = (): IFilm => ({
  id: datatype.uuid(),
  name: name.title(),
  previewImage: internet.url(),
  previewVideoLink: internet.url(),
  genre: name.title(),
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
  director: name.title(),
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
