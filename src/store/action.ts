import { createAction, PayloadAction } from '@reduxjs/toolkit';

export interface SetActiveGenrePayload {
  genre: string;
}

export const setActiveGenre = createAction<SetActiveGenrePayload>('setActiveGenre');

export const getFilmsByGenre = createAction('getFilmsByGenre');

export type SetActiveGenreAction = PayloadAction<SetActiveGenrePayload>;
export type GetFilmsByGenreAction = ReturnType<typeof getFilmsByGenre>;
