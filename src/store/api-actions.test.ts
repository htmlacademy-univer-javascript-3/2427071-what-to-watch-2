import {describe} from 'vitest';
import {FavoriteStatus} from '../enums/favorite-status.ts';
import {createApi} from '../services/api.ts';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action} from '@reduxjs/toolkit';
import {AuthData} from '../types/auth.ts';
import {State} from '../types/state.ts';
import {
  AppThunkDispatch,
  createCurrentFilm, createFakeToken, createFakeUser,
  createFilm,
  createPromoFilm,
  createReview,
  extractActionsTypes
} from '../mocks/mocks.ts';
import {redirectToRoute} from './action.ts';
import {
  addCommentAction, changeFavoriteStatusAction,
  checkAuthStatusAction,
  fetchFavoriteFilmsAction,
  fetchFilmByIdAction, fetchFilmPromoAction, fetchFilmReviewsAction,
  fetchFilmsAction,
  fetchSimilarFilmsAction, loginAction, logoutAction
} from './api-actions.ts';

describe('Api actions', () => {
  const axios = createApi();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({FILMS: {films: []}});
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "redirectToRoute", "loginAction.fulfilled" when server response 200', async () => {
      const fakeUser: AuthData = createFakeUser();
      const fakeServerReplay = createFakeToken();
      mockAxiosAdapter.onPost('/login').reply(200, fakeServerReplay);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type,
      ]);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async () => {
      mockAxiosAdapter.onDelete('/logout').reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });
  });

  describe('checkAuthStatus', () => {
    it('should dispatch "checkAuthStatus.pending" and "checkAuthStatus.fulfilled" with thunk "checkAuthStatus', async () => {
      mockAxiosAdapter.onGet('/login').reply(200);

      await store.dispatch(checkAuthStatusAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthStatusAction.pending.type,
        checkAuthStatusAction.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet('/login').reply(400);

      await store.dispatch(checkAuthStatusAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthStatusAction.pending.type,
        checkAuthStatusAction.rejected.type,
      ]);
    });
  });

  describe('fetchFilms', () => {
    it('should dispatch "fetchFilmsAction.pending", "fetchFilmsAction.fulfilled", when server response 200', async () => {
      const mockFilms = [createFilm(), createFilm()];
      mockAxiosAdapter.onGet('/films').reply(200, mockFilms);

      await store.dispatch(fetchFilmsAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmsFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFilmsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFilmsAction.pending.type,
        fetchFilmsAction.fulfilled.type,
      ]);

      expect(fetchFilmsFulfilled.payload).toEqual(mockFilms);
    });

    it('should dispatch "fetchFilmsAction.pending", "fetchFilmsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet('/films').reply(400);

      await store.dispatch(fetchFilmsAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFilmsAction.pending.type,
        fetchFilmsAction.rejected.type,
      ]);
    });

  });

  describe('fetchFilmById', () => {
    it('should dispatch "fetchFilmByIdAction.pending", "fetchFilmByIdAction.fulfilled", when server response 200', async () => {
      const mockFilm = createCurrentFilm();
      mockAxiosAdapter.onGet('/films/id').reply(200, mockFilm);

      await store.dispatch(fetchFilmByIdAction('id'));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmByIdFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFilmByIdAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFilmByIdAction.pending.type,
        fetchFilmByIdAction.fulfilled.type,
      ]);

      expect(fetchFilmByIdFulfilled.payload)
        .toEqual(mockFilm);
    });

    it('should dispatch "fetchFilmByIdAction.pending", "fetchFilmByIdAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet('/films/id').reply(400);

      await store.dispatch(fetchFilmByIdAction('id'));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFilmByIdAction.pending.type,
        fetchFilmByIdAction.rejected.type,
      ]);
    });
  });

  describe('fetchSimilarFilms', () => {
    it('should dispatch "fetchSimilarFilmsAction.pending", "fetchSimilarFilmsAction.fulfilled", when server response 200', async () => {
      const mockFilms = [createFilm(), createFilm()];
      mockAxiosAdapter.onGet('/films/id/similar').reply(200, mockFilms);

      await store.dispatch(fetchSimilarFilmsAction('id'));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchSimilarFilmsFulfilled = emittedActions.at(1) as ReturnType<typeof fetchSimilarFilmsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchSimilarFilmsAction.pending.type,
        fetchSimilarFilmsAction.fulfilled.type,
      ]);

      expect(fetchSimilarFilmsFulfilled.payload).toEqual(mockFilms);
    });

    it('should dispatch "fetchSimilarFilmsAction.pending", "fetchSimilarFilmsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet('/films/id/similar').reply(400);

      await store.dispatch(fetchSimilarFilmsAction('id'));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchSimilarFilmsAction.pending.type,
        fetchSimilarFilmsAction.rejected.type,
      ]);
    });
  });

  describe('fetchFavorite', () => {
    it('should dispatch "fetchFavoriteFilmsAction.pending", "fetchFavoriteFilmsAction.fulfilled", when server response 200', async () => {
      const mockFilms = [createFilm(), createFilm()];
      mockAxiosAdapter.onGet('/favorite').reply(200, mockFilms);

      await store.dispatch(fetchFavoriteFilmsAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFavoriteFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFavoriteFilmsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFavoriteFilmsAction.pending.type,
        fetchFavoriteFilmsAction.fulfilled.type,
      ]);

      expect(fetchFavoriteFulfilled.payload)
        .toEqual(mockFilms);
    });

    it('should dispatch "fetchFavoriteFilmsAction.pending", "fetchFavoriteFilmsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet('/favorite').reply(400);

      await store.dispatch(fetchFavoriteFilmsAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoriteFilmsAction.pending.type,
        fetchFavoriteFilmsAction.rejected.type,
      ]);
    });
  });

  describe('fetchFilmPromoAction', () => {
    it('should dispatch "fetchFilmPromo.pending", "fetchFilmPromo.fulfilled", when server response 200', async () => {
      const mockFilm = createPromoFilm();
      mockAxiosAdapter.onGet('/promo').reply(200, mockFilm);

      await store.dispatch(fetchFilmPromoAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmPromoFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFilmPromoAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFilmPromoAction.pending.type,
        fetchFilmPromoAction.fulfilled.type,
      ]);

      expect(fetchFilmPromoFulfilled.payload).toEqual(mockFilm);
    });

    it('should dispatch "fetchFilmPromoAction.pending", "fetchFilmPromoAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet('/promo').reply(400);

      await store.dispatch(fetchFilmPromoAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFilmPromoAction.pending.type,
        fetchFilmPromoAction.rejected.type,
      ]);
    });
  });

  describe('fetchFilmReviewsAction', () => {
    it('should dispatch "fetchFilmReviewsAction.pending", "fetchFilmReviewsAction.fulfilled", when server response 200', async () => {
      const mockReviews = [createReview(), createReview(), createReview()];
      mockAxiosAdapter.onGet('/comments/id').reply(200, mockReviews);

      await store.dispatch(fetchFilmReviewsAction('id'));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmReviewsFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFilmReviewsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFilmReviewsAction.pending.type,
        fetchFilmReviewsAction.fulfilled.type,
      ]);

      expect(fetchFilmReviewsFulfilled.payload).toEqual(mockReviews);
    });

    it('should dispatch "fetchFilmReviewsAction.pending", "fetchFilmReviewsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet('/comments/id').reply(400);

      await store.dispatch(fetchFilmReviewsAction('id'));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFilmReviewsAction.pending.type,
        fetchFilmReviewsAction.rejected.type,
      ]);
    });
  });

  describe('addCommentAction', () => {
    it('should dispatch "addCommentAction.pending", "addCommentAction.fulfilled", when server response 200', async () => {
      mockAxiosAdapter.onPost('/comments/id').reply(200);

      await store.dispatch(addCommentAction({filmId: 'id', comment: 'lorem', rating: 8}));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        addCommentAction.pending.type,
        addCommentAction.fulfilled.type,
      ]);
    });

    it('should dispatch "addCommentAction.pending", "addCommentAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost('/comments/id').reply(400);

      await store.dispatch(addCommentAction({filmId: 'id', comment: 'lorem', rating: 8}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        addCommentAction.pending.type,
        addCommentAction.rejected.type,
      ]);
    });
  });

  describe('changeFavoriteStatusAction', () => {
    it('should dispatch "changeFavoriteStatusAction.pending", "changeFavoriteStatusAction.fulfilled", when server response 200', async () => {
      mockAxiosAdapter.onPost(`/favorite/id/${FavoriteStatus.Favorite}`).reply(200);

      await store.dispatch(changeFavoriteStatusAction({filmId: 'id', status: FavoriteStatus.Favorite}));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        changeFavoriteStatusAction.pending.type,
        changeFavoriteStatusAction.fulfilled.type,
      ]);
    });

    it('should dispatch "changeFavoriteStatusAction.pending", "changeFavoriteStatusAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(`/favorite/id/${FavoriteStatus.Favorite}`).reply(400);

      await store.dispatch(changeFavoriteStatusAction({filmId: 'id', status: FavoriteStatus.Favorite}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        changeFavoriteStatusAction.pending.type,
        changeFavoriteStatusAction.rejected.type,
      ]);
    });
  });
});
