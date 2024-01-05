import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import {createCurrentFilm} from '../../mocks/mocks.ts';
import Tabs from './tabs';

describe('Component: Tabs', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <Tabs film={createCurrentFilm()} reviews={[]} />
      </BrowserRouter>
    );

    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Reviews')).toBeInTheDocument();
  });
});
