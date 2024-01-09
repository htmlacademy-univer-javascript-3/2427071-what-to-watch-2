import * as faker from 'faker';
import {ALL_GENRES} from '../../constants/genres';
import {createFilm, createPromoFilm} from '../../utils/mocks';
import {FilmsProcessState} from '../../types/state';
import {fetchFavoriteFilmsAction, fetchFilmPromoAction, fetchFilmsAction} from '../api-actions';
import {filmsProcessSlice, setActiveGenre, setFilmsByGenre} from './films-process.slice';

describe('FilmsProcess slice Test', () => {
  let initialState: FilmsProcessState;

  beforeEach(() => {
    initialState = {
      films: [],
      activeGenre: ALL_GENRES,
      genreFilms: [],
      promoFilm: null,
      isLoadingList: false,
      favoriteFilms: [],
      isPromoLoading: true,
    };
  });

  it('should return initial state', () => {
    const emptyAction = {type: ''};

    const expectedState = initialState;

    const result = filmsProcessSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set active genre in state', () => {
    const emptyAction = {type: ''};

    const expectedState = initialState;

    const result = filmsProcessSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state', () => {
    const state = {...initialState, isLoadingList: true};

    const expectedGenre = faker.music.genre();

    const result = filmsProcessSlice.reducer(state, setActiveGenre(expectedGenre));

    expect(result.activeGenre).toEqual(expectedGenre);
  });

  it('should return films by active genre from state', () => {
    const film = createFilm();

    const state = {...initialState, activeGenre: film.genre, isLoadingList: true};

    const expectedFilms = state.films;

    const result = filmsProcessSlice.reducer(state, setFilmsByGenre());

    expect(result.genreFilms).toEqual(expectedFilms);
  });

  it('should return films by all active genre from state', () => {
    const film = createFilm();

    const state = {...initialState, films: [film], isLoadingList: true};

    const expectedFilms = state.films;

    const result = filmsProcessSlice.reducer(state, setFilmsByGenre());

    expect(result.genreFilms).toEqual(expectedFilms);
  });

  it('should return films by other active genre from state', () => {
    const film = createFilm();

    const state = {...initialState, films: [film], activeGenre: faker.music.genre(), isLoadingList: true};

    const expectedFilms: unknown[] = [];

    const result = filmsProcessSlice.reducer(state, setFilmsByGenre());

    expect(result.genreFilms).toEqual(expectedFilms);
  });


  describe('set isLoadingList test', () => {
    it('should set isLoadingList true when loading start', () => {
      const expectedState = {...initialState, isLoadingList: true};

      expect(filmsProcessSlice.reducer(initialState, fetchFilmsAction.pending))
        .toEqual(expectedState);
    });
    it('should set isLoadingList false when loading end', () => {
      expect(filmsProcessSlice.reducer(initialState, fetchFilmsAction.fulfilled).isLoadingList)
        .toBe(false);
    });
    it('should set isLoadingList true when loading reject', () => {
      expect(filmsProcessSlice.reducer(initialState, fetchFilmsAction.rejected).isLoadingList)
        .toBe(true);
    });
  });

  describe('set fetchFilmsAction test', () => {
    const films = [createFilm()];
    it('should fetch films', () => {
      expect(filmsProcessSlice.reducer(initialState, {type: fetchFilmsAction.fulfilled.type, payload: films}).films)
        .toEqual(films);
    });
    it('should reject fetch films', () => {
      expect(filmsProcessSlice.reducer(initialState, {type: fetchFilmsAction.rejected.type, payload: films}).films)
        .toEqual([]);
    });
  });

  describe('set fetchFavoriteFilmsAction test', () => {
    const films = [createFilm()];
    it('should fetch favorite films', () => {
      expect(filmsProcessSlice.reducer(initialState, {
        type: fetchFavoriteFilmsAction.fulfilled.type,
        payload: films
      }).favoriteFilms)
        .toEqual(films);
    });
    it('should reject fetch favorite films', () => {
      expect(filmsProcessSlice.reducer(initialState, {
        type: fetchFavoriteFilmsAction.rejected.type,
        payload: films
      }).favoriteFilms)
        .toEqual([]);
    });
  });

  describe('set fetchFilmPromoAction test', () => {
    const film = [createPromoFilm()];
    it('should fetch promo film', () => {
      expect(filmsProcessSlice.reducer(initialState, {
        type: fetchFilmPromoAction.fulfilled.type,
        payload: film
      }).promoFilm)
        .toEqual(film);
    });
    it('should reject promo film', () => {
      expect(filmsProcessSlice.reducer(initialState, {type: fetchFilmsAction.rejected.type, payload: film}).promoFilm)
        .toEqual(null);
    });
  });

});
