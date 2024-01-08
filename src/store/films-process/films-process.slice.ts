import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../enums/namespace.ts';
import {ALL_GENRES} from '../../constants/genres.ts';
import {FilmsProcessState} from '../../types/state.ts';
import {fetchFavoriteFilmsAction, fetchFilmPromoAction, fetchFilmsAction} from '../api-actions.ts';

const initialState: FilmsProcessState = {
  films: [],
  activeGenre: ALL_GENRES,
  genreFilms: [],
  promoFilm: null,
  isLoadingList: true,
  favoriteFilms: [],
};

export const filmsProcessSlice = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {
    setFilmsByGenre: (state) => {
      state.genreFilms =
        state.activeGenre === ALL_GENRES
          ? state.films
          : state.films.filter((film) => film.genre === state.activeGenre);
    },
    setActiveGenre: (state, action) => {
      state.activeGenre = String(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isLoadingList = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.genreFilms = state.films;
        state.isLoadingList = false;
      })
      .addCase(fetchFilmsAction.rejected, (state) => {
        state.films = [];
        state.isLoadingList = true;
      })

      .addCase(fetchFavoriteFilmsAction.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
      })
      .addCase(fetchFavoriteFilmsAction.rejected, (state) => {
        state.favoriteFilms = [];
      })

      .addCase(fetchFilmPromoAction.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
      })
      .addCase(fetchFilmPromoAction.rejected, (state) => {
        state.promoFilm = null;
      });
  }
});

export const {setFilmsByGenre, setActiveGenre} = filmsProcessSlice.actions;
