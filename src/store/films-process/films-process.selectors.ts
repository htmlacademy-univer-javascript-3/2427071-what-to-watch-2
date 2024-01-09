import {State} from '../../types/state.ts';
import {NameSpace} from '../../enums/namespace.ts';
import {IFilm, IFilmPromo} from '../../types/film-types.ts';

export const getFilms = (state: Pick<State, NameSpace.Films>): IFilm[] => state[NameSpace.Films].films;
export const getFilmsByGenre = (state: Pick<State, NameSpace.Films>): IFilm[] => state[NameSpace.Films].genreFilms;

export const getFilmsByGenreLength = (state: Pick<State, NameSpace.Films>): number => state[NameSpace.Films].genreFilms.length;
export const getIsLoadingList = (state: Pick<State, NameSpace.Films>): boolean => state[NameSpace.Films].isLoadingList;
export const getActiveGenre = (state: Pick<State, NameSpace.Films>): string => state[NameSpace.Films].activeGenre;
export const getPromoFilm = (state: Pick<State, NameSpace.Films>): IFilmPromo | null => state[NameSpace.Films].promoFilm;

export const getIsPromoLoading = (state: Pick<State, NameSpace.Films>): boolean => state[NameSpace.Films].isPromoLoading;
export const getFavoriteFilms = (state: Pick<State, NameSpace.Films>): IFilm[] => state[NameSpace.Films].favoriteFilms;
export const getFavoriteFilmsLength = (state: Pick<State, NameSpace.Films>): number => state[NameSpace.Films].favoriteFilms?.length || 0;
