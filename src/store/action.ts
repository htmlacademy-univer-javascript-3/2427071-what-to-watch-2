import { createAction } from '@reduxjs/toolkit';
import {IFilm, IFilmExtended, IFilmPromo} from '../types/film-types.ts';
import {IReview} from '../types/review-types.ts';


export const setActiveGenre = createAction<{genre: string}>('setActiveGenre');

export const getFilmsByGenre = createAction('getFilmsByGenre');
export const fetchFilms = createAction<IFilm[]>('fetchFilmsAction');
export const fetchFilmReviews = createAction<IReview[]>('fetchFilmReviewsAction');
export const fetchFavoriteFilms = createAction<IFilm[]>('fetchFavoriteFilmsAction');
export const fetchFilmById = createAction<IFilmExtended>('fetchFilmByIdAction');
export const fetchPromoFilm = createAction<IFilmPromo>('fetchFilmPromoAction');
export const fetchSimilarFilms = createAction<IFilm[]>('fetchSimilarFilmsAction');

export const setIsLoadingFilms = createAction<boolean>('setIsLoadingFilms');
export const setIsLoadingFilm = createAction<boolean>('setIsLoadingFilm');


