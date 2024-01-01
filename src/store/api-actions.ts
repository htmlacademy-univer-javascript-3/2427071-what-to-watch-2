import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.ts';
import {AxiosInstance} from 'axios';
import {IFilm, IFilmPromo, IFilmPromoInfo} from '../types/film-types.ts';
import {
  redirectToRoute,
} from './action.ts';
import {AddUserReview, IReview, UserReview} from '../types/review-types.ts';
import {AuthStatus} from '../enums/auth-status.ts';
import {AppRoute} from '../enums/app-route.ts';
import {AuthData, UserData} from '../types/auth.ts';
import {setAuthStatus} from './user-process/user-process.slice.ts';

export const fetchFilmsAction = createAsyncThunk<IFilm[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  '/films',
  async (_arg, {extra: api}) => {
    const { data } = await api.get<IFilm[]>('/films');

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
    '/films/id',
    async (id: string, { extra: api}) => {

      const { data } = await api.get<IFilmPromoInfo>(`/films/${id}`);

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
    '/films/id/similar',
    async (id: string, { extra: api}) => {

      const { data } = await api.get<IFilm[]>(`/films/${id}/similar`);

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
    '/favorite',
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
    '/promo',
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
    '/comments/id',
    async (id, {extra: api}) => {

      const { data } = await api.get<IReview[]>(`/comments/${id}`);

      return data;
    },
  );

export const checkAuthStatus = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  '/login',
  async (_arg, { extra: api}) => {
    try {

      await api.get('/login');
      setAuthStatus(AuthStatus.Auth);
    } catch (e) {
      setAuthStatus(AuthStatus.NoAuth);
    }
  },
);

export const loginAction = createAsyncThunk<
  UserData,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  '/login',
  async ({email, password}, { dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(
      '/login',
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
  '/logout',
  async (_arg, { extra: api}) => {
    await api.delete('/logout');
  },
);

export const addCommentAction = createAsyncThunk<void, AddUserReview, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'addCommentAction',
  async ({filmId, comment, rating}, {dispatch, extra: api}) => {
    await api.post<UserReview>(`comments/${filmId}`, {comment, rating});
    dispatch(redirectToRoute(`${AppRoute.Films}/${filmId}`));
  },
);

