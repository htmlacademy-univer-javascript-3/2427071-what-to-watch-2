import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {AxiosInstance} from 'axios';
import {IFilm, IFilmPromo, IFilmPromoInfo} from '../types/film-types';
import {redirectToRoute} from './action';
import {AddUserReview, IReview, UserReview} from '../types/review-types';
import {AppRoute} from '../enums/app-route';
import {AuthData, UserData} from '../types/auth';
import { FavoriteStatus } from '../enums/favorite-status';

export const loginAction = createAsyncThunk<
  UserData,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'USER/login',
  async ({email, password}, { dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(
      AppRoute.Login,
      {
        email,
        password,
      }
    );

    dispatch(redirectToRoute(AppRoute.Main));

    return data;
  },
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'USER/logout',
  async (_arg, { extra: api}) => {
    await api.delete(AppRoute.Logout);
  },
);

export const checkAuthStatusAction = createAsyncThunk<
  UserData,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'USER/checkAuth',
  async (_arg, { extra: api}) => {
    const {data} = await api.get<UserData>(AppRoute.Login);

    return data;
  },
);

export const fetchFilmsAction = createAsyncThunk<IFilm[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'FILMS/getFilms',
  async (_arg, {extra: api}) => {
    const { data } = await api.get<IFilm[]>(AppRoute.Films);

    return data;
  },
);

export const fetchFilmByIdAction = createAsyncThunk<
  IFilmPromoInfo,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'FILMS/getFilmById',
    async (id: string, { extra: api}) => {

      const { data } = await api.get<IFilmPromoInfo>(`${AppRoute.Films}/${id}`);

      return data;
    },
  );

export const fetchSimilarFilmsAction = createAsyncThunk<
  IFilm[],
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'FILMS/fetchSimilarFilms',
    async (id: string, { extra: api}) => {

      const { data } = await api.get<IFilm[]>(`${AppRoute.Films}/${id}/similar`);

      return data;

    },
  );

export const fetchFavoriteFilmsAction = createAsyncThunk<
  IFilm[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'FILMS/fetchFavoriteFilms',
    async (_arg, { extra: api}) => {

      const {data} = await api.get<IFilm[]>('/favorite');

      return data;

    }
  );

export const fetchFilmPromoAction = createAsyncThunk<
  IFilmPromo,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'FILMS/fetchPromoFilm',
    async (_arg, { extra: api}) => {
      const { data } = await api.get<IFilmPromo>('/promo');

      return data;
    },
  );

export const fetchFilmReviewsAction = createAsyncThunk<
  IReview[],
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'FILM/getReviews',
    async (id, {extra: api}) => {

      const { data } = await api.get<IReview[]>(`/comments/${id}`);

      return data;
    },
  );


export const addCommentAction = createAsyncThunk<void, AddUserReview, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'FILM/addComment',
  async ({filmId, comment, rating}, {extra: api}) => {
    await api.post<UserReview>(`comments/${filmId}`, {comment, rating});
  },
);

export const changeFavoriteStatusAction = createAsyncThunk<
  void,
  {filmId: string; status: FavoriteStatus},
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'FILM/changeFavoriteStatus',
    async ({filmId, status}, { extra: api}) => {
      await api.post(`/favorite/${filmId}/${status}`);
    },
  );
