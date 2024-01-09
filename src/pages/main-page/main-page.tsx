import React, {useEffect} from 'react';
import Footer from '../../components/footer/footer';
import MovieCard from '../../components/film-card/film-card.tsx';
import Catalog from '../../components/catalog/catalog';
import {Spinner} from '../../components/spinner/spinner.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks/store.ts';
import {fetchFavoriteFilmsAction, fetchFilmPromoAction} from '../../store/api-actions.ts';
import {getIsPromoLoading, getPromoFilm} from '../../store/films-process/films-process.selectors.ts';
import { AuthStatus } from '../../enums/auth-status.ts';
import { getAuthStatus } from '../../store/user-process/user-process.selectors.ts';
import PageNotFound from '../page-not-found/page-not-found.tsx';

function MainPage(): React.JSX.Element | null {
  const dispatch = useAppDispatch();
  const promoFilm = useAppSelector(getPromoFilm);
  const isPromoLoading = useAppSelector(getIsPromoLoading);
  const authStatus = useAppSelector(getAuthStatus);
  const isAuth = authStatus === AuthStatus.Auth;

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchFilmPromoAction());

      if (isAuth) {
        dispatch(fetchFavoriteFilmsAction());
      }
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, isAuth]);

  if (isPromoLoading) {
    return <Spinner/>;
  }

  return promoFilm ? (
    <>
      <MovieCard film={promoFilm} />
      <div className="page-content">
        <Catalog />
        <Footer/>
      </div>
    </>
  ) : (
    <PageNotFound/>
  );
}

export default MainPage;
