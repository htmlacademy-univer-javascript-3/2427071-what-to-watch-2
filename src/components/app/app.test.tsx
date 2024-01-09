import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import {ALL_GENRES} from '../../constants/genres.ts';
import {AppRoute} from '../../enums/app-route.ts';
import {AuthStatus} from '../../enums/auth-status.ts';
import {createCurrentFilm, createFilm, createPromoFilm, createUser} from '../../utils/mocks';
import App from './app';
import { withHistory, withStore } from '../../utils/mock-component';
import { createFakeStore } from '../../utils/mocks';

describe('Component: App', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "WelcomeScreen" when user navigate to "/"', () => {
    const fakeFilm = createPromoFilm();
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      createFakeStore({
        FILMS: {
          films: [],
          activeGenre: ALL_GENRES,
          genreFilms: [],
          promoFilm: fakeFilm,
          isLoadingList: true,
          favoriteFilms: [],
          isPromoLoading: false,
        },
      })
    );
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
    expect(screen.getByText('All genres')).toBeInTheDocument();
  });

  it('should render "Sign in" when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      createFakeStore()
    );
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should render "My list" when user navigate to "/my-list"', () => {
    const fakeFilm = createFilm();

    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      createFakeStore({
        USER: {
          authorizationStatus: AuthStatus.Auth,
          user: createUser,
          hasError: false,
        },
        FILMS: {
          films: [],
          activeGenre: ALL_GENRES,
          genreFilms: [],
          promoFilm: null,
          isLoadingList: false,
          favoriteFilms: [fakeFilm],
          isPromoLoading: false,
        },
      })
    );
    mockHistory.push(AppRoute.MyList);

    render(withStoreComponent);

    expect(screen.getByText('My list')).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
  });

  it('should render "Movie page" when user navigate to "/films/:id"', () => {
    const fakeFilm = createCurrentFilm();

    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      createFakeStore({
        USER: {
          authorizationStatus: AuthStatus.Auth,
          user: createUser,
          hasError: false,
        },
        FILM: {
          currentFilm: fakeFilm,
          isLoadingFilm: false,
          similarFilms: [],
          reviews: [],
        },
      })
    );
    mockHistory.push(`${AppRoute.Films}/123`);

    render(withStoreComponent);

    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });

  it('should render "Add review page" when user navigate to "/films/:id/review"', () => {
    const fakeFilm = createCurrentFilm();

    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      createFakeStore({
        USER: {
          authorizationStatus: AuthStatus.Auth,
          user: createUser,
          hasError: false,
        },
        FILM: {
          currentFilm: fakeFilm,
          isLoadingFilm: false,
          similarFilms: [],
          reviews: [],
        },
      })
    );
    mockHistory.push(`${AppRoute.Films}/123/review`);

    render(withStoreComponent);

    expect(screen.getByText('Add review')).toBeInTheDocument();
  });

  it('should render "Player page" when user navigate to "/player/:id"', () => {
    const fakeFilm = createCurrentFilm();

    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      createFakeStore({
        FILM: {
          currentFilm: fakeFilm,
          isLoadingFilm: false,
          similarFilms: [],
          reviews: [],
        },
      })
    );
    mockHistory.push(`${AppRoute.Player}/123`);

    render(withStoreComponent);

    expect(screen.getByText('Exit')).toBeInTheDocument();
    expect(screen.getByText('Toggler')).toBeInTheDocument();
  });

  it('should render "Page not found" when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      createFakeStore()
    );
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(
      screen.getByText('Ошибка 404. Страница не найдена.')
    ).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
