import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.ts';
import {AxiosInstance} from 'axios';
import {IFilm, IFilmPromo, IFilmExtended} from '../types/film-types.ts';
import {
  fetchFavoriteFilms,
  fetchFilmById, fetchFilmReviews,
  fetchFilms, fetchPromoFilm, fetchSimilarFilms,
  getFilmsByGenre,
  setActiveGenre,
  setIsLoadingFilm, setIsLoadingFilms,
} from './action.ts';
import {IReview} from '../types/review-types.ts';
import {ALL_GENRES} from '../constants/genres.ts';

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  '/films',
  async (_arg, {dispatch, extra: api}) => {
    try {
      dispatch(setIsLoadingFilms(true));

      const { data } = await api.get<IFilm[]>('/films');

      dispatch(fetchFilms(data));
      dispatch(setActiveGenre({genre: ALL_GENRES}));
      dispatch(getFilmsByGenre());
    } catch(e) {
      console.log(e);
    } finally {
      dispatch(setIsLoadingFilms(false));
    }
  },
);

export const fetchFilmByIdAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    '/films/id',
    async (id: string, { dispatch, extra: api}) => {
      try {
        dispatch(setIsLoadingFilm(true));

        const { data } = await api.get<IFilmExtended>(`/films/${id}`);

        dispatch(fetchFilmById(data));
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(setIsLoadingFilm(false));
      }
    },
  );

export const fetchSimilarFilmsAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    '/films/id/similar',
    async (id: string, { dispatch, extra: api}) => {
      try {
        const { data } = await api.get<IFilm[]>(`/films/${id}/similar`);

        dispatch(fetchSimilarFilms(data));
      } catch (e) {
        console.log(e);
      }
    },
  );

export const fetchFavoriteFilmsAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    '/favorite',
    async (_arg, { dispatch, extra: api}) => {
      try {
        const {data} = await api.get<IFilm[]>('/favorite');
        dispatch(fetchFavoriteFilms(data));
      } catch (e) {
        console.error(e);
      }
    }
  );

export const fetchFilmPromoAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    '/promo',
    async (_arg, { dispatch, extra: api}) => {
      const { data } = await api.get<IFilmPromo>('/promo');
      dispatch(fetchPromoFilm(data));
    },
  );

export const fetchFilmReviewsAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    '/comments/id',
    async (id, {dispatch, extra: api}) => {
      try {
        dispatch(setIsLoadingFilms(true));

        const { data } = await api.get<IReview[]>(`/comments/${id}`);

        dispatch(fetchFilmReviews(data));
      } catch(e) {
        console.log(e);
      } finally {
        dispatch(setIsLoadingFilms(false));
      }
    },
  );

