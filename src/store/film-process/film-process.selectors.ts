import {State} from '../../types/state.ts';
import {IFilmPromoInfo} from '../../types/film-types.ts';
import {IReview} from '../../types/review-types.ts';
import {NameSpace} from '../../constants/namespaces.ts';

export const getFilm = (state: State): IFilmPromoInfo | null => state[NameSpace.Film].currentFilm;
export const getIsLoadingFilm = (state: State): boolean => state[NameSpace.Film].isLoadingFilm;
export const getReviews = (state: State): IReview[] => state[NameSpace.Film].reviews;
