import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.ts';
import {AxiosInstance} from 'axios';
import {IFilm, IFilmPromo, IFilmExtended} from '../types/film-types.ts';
import {
  fetchFavoriteFilms,
  fetchFilmById, fetchFilmReviews,
  fetchFilms, fetchPromoFilm, fetchSimilarFilms,
  getFilmsByGenre, redirectToRoute,
  setActiveGenre, setAuthStatus,
  setIsLoadingFilm, setIsLoadingFilms,
} from './action.ts';
import {AddUserReview, IReview, UserReview} from '../types/review-types.ts';
import {ALL_GENRES} from '../constants/genres.ts';
import {AuthStatus} from '../enums/auth-status.ts';
import {removeToken, setToken} from '../services/token.ts';
import {AppRoute} from '../enums/app-route.ts';
import {AuthData, UserData} from '../types/auth.ts';

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
  async (_arg, { dispatch, extra: api}) => {
    try {
      await api.get('/login');
      dispatch(setAuthStatus(AuthStatus.Auth));
    } catch (e) {
      dispatch(setAuthStatus(AuthStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  '/login',
  async ({email, password}, { dispatch, extra: api}) => {
    try {
      const {data} = await api.post<UserData>(
        '/login',
        {
          email,
          password,
        }
      );
      setToken(data.token);
      dispatch(setAuthStatus(AuthStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Main));
    } catch (e) {
      dispatch(setAuthStatus(AuthStatus.NoAuth));
    }
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
  async (_arg, { dispatch, extra: api}) => {
    try {
      await api.delete('/logout');
      removeToken();
      dispatch(setAuthStatus(AuthStatus.NoAuth));
    } catch (e) {
      dispatch(setAuthStatus(AuthStatus.Unknown));
    }
  },
);

export const addCommentAction = createAsyncThunk<void, AddUserReview, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'addCommentAction',
  async ({filmId, comment, rating}, {dispatch, extra: api}) => {
    try {
      await api.post<UserReview>(`comments/${filmId}`, {comment, rating});
      dispatch(redirectToRoute(`${AppRoute.Films}/${filmId}`));
    } catch (e) {
      console.error(e);
    }
  },
);

