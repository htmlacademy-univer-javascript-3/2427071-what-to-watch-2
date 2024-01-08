import {ThunkDispatch} from '@reduxjs/toolkit';
import {Action} from 'redux';
import {ALL_GENRES} from '../constants/genres.ts';
import {AuthStatus} from '../enums/auth-status.ts';
import { createApi } from '../services/api';
import { State } from '../types/state';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createApi>, Action>;

export const createFakeStore = (initialState?: Partial<State>): State => ({
  USER: { authorizationStatus: AuthStatus.NoAuth, user: null },
  FILM: {
    currentFilm: null ,
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
  },
  ...initialState ?? {},
});
