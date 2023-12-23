import {FilmProcessState} from '../../types/state.ts';
import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../constants/namespaces.ts';
import {
  fetchFilmByIdAction,
  fetchFilmReviewsAction, fetchSimilarFilmsAction,
} from '../api-actions.ts';

const initialState: FilmProcessState = {
  currentFilm: null,
  isLoadingFilm: true,
  reviews: [],
  similarFilms: [],
};

export const filmProcessSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilmByIdAction.pending, (state) => {
        state.isLoadingFilm = true;
      })
      .addCase(fetchFilmByIdAction.fulfilled, (state, action) => {
        state.currentFilm = action.payload;
        state.isLoadingFilm = false;
      })
      .addCase(fetchFilmByIdAction.rejected, (state) => {
        state.currentFilm = null;
        state.isLoadingFilm = false;
      })
      .addCase(fetchFilmReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchFilmReviewsAction.rejected, (state) => {
        state.reviews = [];
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
      })
      .addCase(fetchSimilarFilmsAction.rejected, (state) => {
        state.similarFilms = [];
      })
  }
});
