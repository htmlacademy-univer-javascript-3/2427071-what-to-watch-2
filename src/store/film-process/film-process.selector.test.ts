import { NameSpace } from '../../constants/namespaces.ts';
import {createCurrentFilm, createFilm, createReview} from '../../mocks/mocks.ts';
import {getFilm, getIsLoadingFilm, getReviews} from './film-process.selectors.ts';

describe('Film process selectors', () => {
  const film = createCurrentFilm();
  const filmSimilar = createFilm();
  const review = createReview();

  const state = {
    [NameSpace.Film]: {
      currentFilm: film,
      isLoadingFilm: true,
      similarFilms: [filmSimilar],
      reviews: [review],
    }
  };

  it('should return film from state', () => {
    const { currentFilm } = state[NameSpace.Film];
    const result = getFilm(state);
    expect(result).toEqual(currentFilm);
  });

  it('should return loading film from state', () => {
    const { isLoadingFilm } = state[NameSpace.Film];
    const result = getIsLoadingFilm(state);
    expect(result).toEqual(isLoadingFilm);
  });

  it('should return reviews from state', () => {
    const { reviews } = state[NameSpace.Film];
    const result = getReviews(state);
    expect(result).toEqual(reviews);
  });
});
