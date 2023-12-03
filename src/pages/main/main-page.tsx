import React, {useEffect} from 'react';
import Footer from '../../components/footer/footer';
import MovieCard from '../../components/film-card/movie-card';
import Catalog from '../../components/catalog/catalog';
import {useAppDispatch, useAppSelector} from '../../hooks/store.ts';
import {fetchFilmPromoAction} from '../../store/api-actions.ts';

function MainPage(): React.JSX.Element | null {
  const dispatch = useAppDispatch();
  const promoFilm = useAppSelector((state) => state.promoFilm);

  useEffect(() => {
    dispatch(fetchFilmPromoAction());
  }, [dispatch]);

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
