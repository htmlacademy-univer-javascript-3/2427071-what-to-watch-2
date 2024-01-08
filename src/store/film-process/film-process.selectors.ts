import {State} from '../../types/state.ts';
import {IFilmPromoInfo} from '../../types/film-types.ts';
import {IReview} from '../../types/review-types.ts';
import {NameSpace} from '../../enums/namespace.ts';

export const getFilm = (state: Pick<State, NameSpace.Film>): IFilmPromoInfo | null => state[NameSpace.Film].currentFilm;
export const getIsLoadingFilm = (state: Pick<State, NameSpace.Film>): boolean => state[NameSpace.Film].isLoadingFilm;
export const getReviews = (state: Pick<State, NameSpace.Film>): IReview[] => state[NameSpace.Film].reviews;
