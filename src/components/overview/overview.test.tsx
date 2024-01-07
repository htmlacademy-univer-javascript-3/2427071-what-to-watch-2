import {render, screen} from '@testing-library/react';
import {createCurrentFilm} from '../../mocks/mocks.ts';
import Overview from './overview';

describe('Component: Overview', () => {
  it('should render correctly', () => {
    render(<Overview film={createCurrentFilm()}/>);

    expect(screen.getByText(/Director/)).toBeInTheDocument();
    expect(screen.getByText(/Starring/)).toBeInTheDocument();
  });
});
