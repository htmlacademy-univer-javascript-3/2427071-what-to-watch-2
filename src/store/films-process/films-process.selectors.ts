import {State} from '../../types/state.ts';
import {NameSpace} from '../../constants/namespaces.ts';
import {IFilm, IFilmPromo} from '../../types/film-types.ts';

export const getFilms = (state: State): IFilm[] => state[NameSpace.Films].films;
export const getFilmsByGenre = (state: State): IFilm[] => state[NameSpace.Films].genreFilms;
export const getIsLoadingList = (state: State): boolean => state[NameSpace.Films].isLoadingList;
export const getActiveGenre = (state: State): string => state[NameSpace.Films].activeGenre;
export const getPromoFilm = (state: State): IFilmPromo | null => state[NameSpace.Films].promoFilm;
export const getFavoriteFilms = (state: Pick<State, NameSpace.Films>): IFilm[] => state[NameSpace.Films].favoriteFilms;
export const getFavoriteFilmsLength = (state: Pick<State, NameSpace.Films>): number => state[NameSpace.Films].favoriteFilms?.length || 0;