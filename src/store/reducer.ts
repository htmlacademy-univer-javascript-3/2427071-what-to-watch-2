import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { ALL_GENRES } from '../constants/genres.ts';
import {
  fetchFavoriteFilms,
  fetchFilmById,
  fetchFilmReviews,
  fetchFilms, fetchPromoFilm, fetchSimilarFilms,
  getFilmsByGenre,
  setActiveGenre, setIsLoadingFilm, setIsLoadingFilms
} from './action.ts';
import {IFilm, IFilmExtended, IFilmPromo} from '../types/film-types';
import {IReview} from '../types/review-types.ts';

interface State {
  films: IFilm[];
  activeGenre: string | typeof ALL_GENRES;
  genreFilms: IFilm[];
  currentFilm: IFilmExtended | null ;
  promoFilm: IFilmPromo | null;
  isLoadingFilms: boolean;
  isLoadingFilm: boolean;
  favoriteFilms: IFilm[];
  reviews: IReview[];
  similarFilms: IFilm[];
}

const initialState: State = {
  films: [],
  activeGenre: ALL_GENRES,
  genreFilms: [],
  currentFilm: null,
  promoFilm: null,
  isLoadingFilms: true,
  isLoadingFilm: true,
  favoriteFilms: [],
  reviews: [],
  similarFilms: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveGenre, (state, action: PayloadAction<{ genre: string }>) => {
      const { genre } = action.payload;
      state.activeGenre = genre;
    })
    .addCase(getFilmsByGenre, (state) => {
      state.genreFilms =
        state.activeGenre === ALL_GENRES
          ? state.films
          : state.films.filter((film) => film.genre === state.activeGenre);
    })
    .addCase(fetchPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(fetchFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(fetchFavoriteFilms, (state, action) => {
      state.favoriteFilms = action.payload;
    })
    .addCase(fetchFilmById, (state, action) => {
      state.currentFilm = action.payload;
    })
    .addCase(fetchFilmReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(fetchSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(setIsLoadingFilms, (state, action) => {
      state.isLoadingFilms = action.payload;
    })
    .addCase(setIsLoadingFilm, (state, action) => {
      state.isLoadingFilm = action.payload;
    });
});
