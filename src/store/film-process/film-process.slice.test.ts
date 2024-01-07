import {createFilm, createReview} from '../../mocks/mocks.ts';
import {FilmProcessState} from '../../types/state';
import {fetchFilmByIdAction, fetchFilmReviewsAction, fetchSimilarFilmsAction} from '../api-actions';
import {filmProcessSlice} from './film-process.slice';

describe('Film Process Slice Test', () => {
  let initialState: FilmProcessState;

  beforeEach(() => {
    initialState = {
      currentFilm: null,
      isLoadingFilm: true,
      similarFilms: [],
      reviews: [],
    };
  });

  it('should return initial state', () => {
    const emptyAction = {type: ''};
    const expectedState = initialState;
    const result = filmProcessSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  describe('fetchFilmByIdAction test', () => {
    const film = createFilm();
    it('should fetch film by id films', () => {
      expect(filmProcessSlice.reducer(initialState, {
        type: fetchFilmByIdAction.fulfilled.type,
        payload: film
      }).currentFilm)
        .toEqual(film);
    });
    it('should reject fetch film by id films', () => {
      expect(filmProcessSlice.reducer(initialState, {
        type: fetchFilmByIdAction.rejected.type,
        payload: film
      }).currentFilm)
        .toEqual(null);
    });
  });

  describe('fetchFilmByIdAction test', () => {
    it('should set isLoadingFilm true when loading start', () => {
      expect(filmProcessSlice.reducer(initialState, fetchFilmByIdAction.pending).isLoadingFilm)
        .toBe(true);
    });
    it('should set isLoadingFilm true when loading end', () => {
      expect(filmProcessSlice.reducer(initialState, fetchFilmByIdAction.fulfilled).isLoadingFilm)
        .toBe(false);
    });
    it('should set isLoadingFilm false when loading reject', () => {
      expect(filmProcessSlice.reducer(initialState, fetchFilmByIdAction.rejected).isLoadingFilm)
        .toBe(false);
    });
  });

  describe('fetchSimilarFilmsAction test', () => {
    const films = [createFilm()];
    it('should fetch similar films', () => {
      expect(filmProcessSlice.reducer(initialState, {
        type: fetchSimilarFilmsAction.fulfilled.type,
        payload: films
      }).similarFilms)
        .toEqual(films);
    });
    it('should reject fetch similar films', () => {
      expect(filmProcessSlice.reducer(initialState, {
        type: fetchSimilarFilmsAction.rejected.type,
        payload: films
      }).similarFilms)
        .toEqual([]);
    });
  });

  describe('fetchFilmReviewsAction test', () => {
    const reviews = [createReview()];
    it('should fetch film reviews', () => {
      expect(filmProcessSlice.reducer(initialState, {
        type: fetchFilmReviewsAction.fulfilled.type,
        payload: reviews
      }).reviews)
        .toEqual(reviews);
    });
    it('should reject fetch film reviews', () => {
      expect(filmProcessSlice.reducer(initialState, {
        type: fetchFilmReviewsAction.rejected.type,
        payload: reviews
      }).reviews)
        .toEqual([]);
    });
  });
});
