import { render, screen } from '@testing-library/react';
import {createReview} from '../../utils/mocks';
import FilmReviews from './film-reviews';

describe('Component: FilmReviews', () => {
  it('should render correctly', () => {
    render(<FilmReviews reviews={[createReview()]} />);

    const reviewValues = screen.getAllByTestId('review');

    const expectedCount = 1;
    expect(reviewValues.length).toBe(expectedCount);
  });
});
