import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { ALL_GENRES } from '../constants/genres.ts';
import { films as filmsList } from '../mocks/films';
import { getFilmsByGenre, setActiveGenre } from './action.ts';

import { IFilmExtended } from '../types/film-types';

interface State {
  films: IFilmExtended[];
  genre: string;
  genreFilms: IFilmExtended[];
}

const initialState: State = {
  films: filmsList,
  genre: ALL_GENRES,
  genreFilms: filmsList,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveGenre, (state, action: PayloadAction<{ genre: string }>) => {
      const { genre } = action.payload;
      state.genre = genre;
    })
    .addCase(getFilmsByGenre, (state) => {
      state.genreFilms =
        state.genre === ALL_GENRES
          ? filmsList
          : filmsList.filter((film) => film.genre === state.genre);
    });
});
