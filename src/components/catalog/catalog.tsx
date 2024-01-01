import GenresList from '../genre-list/genre-list';
import FilmsList from '../films-list/films-list';
import React, { useCallback, useState } from 'react';
import { DEFAULT_FILM_LIST_LENGTH } from '../../constants/film-list.ts';
import { useAppSelector } from '../../hooks/store.ts';
import {getFilmsByGenre} from '../../store/films-process/films-process.selectors.ts';

function Catalog(): React.JSX.Element {
  const stateGenreFilms = useAppSelector(getFilmsByGenre);

  const [listLength, setListLength] = useState(DEFAULT_FILM_LIST_LENGTH);
  const isButtonVisible = stateGenreFilms.length >= listLength;

  const handleClick = useCallback(()=>{
    setListLength((prev) => prev + DEFAULT_FILM_LIST_LENGTH);
  },[]);

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <GenresList />
      <FilmsList length={listLength}/>
      {isButtonVisible && (
        <div className="catalog__more">
          <button className="catalog__button" type="button" onClick={handleClick}>
            Show more
          </button>
        </div>)}
    </section>
  );
}

export default Catalog;
