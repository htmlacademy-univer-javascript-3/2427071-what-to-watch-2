import React, {useEffect} from 'react';
import Footer from '../../components/footer/footer';
import MovieCard from '../../components/film-card/movie-card';
import Catalog from '../../components/catalog/catalog';
import {useAppDispatch, useAppSelector} from '../../hooks/store.ts';
import {fetchFavoriteFilmsAction, fetchFilmPromoAction} from '../../store/api-actions.ts';
import {getPromoFilm} from '../../store/films-process/films-process.selectors.ts';
import { AuthStatus } from '../../enums/auth-status.ts';
import { getAuthStatus } from '../../store/user-process/user-process.selectors.ts';

function MainPage(): React.JSX.Element | null {
  const dispatch = useAppDispatch();
  const promoFilm = useAppSelector(getPromoFilm);
  const authStatus = useAppSelector(getAuthStatus);
  const isAuth = authStatus === AuthStatus.Auth;

  useEffect(() => {
    dispatch(fetchFilmPromoAction());

    if (isAuth) {
      dispatch(fetchFavoriteFilmsAction());
    }
  }, [dispatch, isAuth]);

  if (!promoFilm) {
    return null;
  }

  return (
    <>
      <MovieCard film={promoFilm} />
      <div className="page-content">
        <Catalog />
        <Footer/>
      </div>
    </>
  );
}

export default MainPage;
