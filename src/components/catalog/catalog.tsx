import GenresList from '../genre-list/genre-list';
import FilmsList from '../films-list/films-list';
import React, {useCallback, useState} from 'react';
import {DEFAULT_FILM_LIST_LENGTH} from '../../constants/film-list';
import {useAppSelector} from '../../hooks/store';
import {getFilmsByGenreLength} from '../../store/films-process/films-process.selectors';

function Catalog(): React.JSX.Element {
  const stateGenreFilmsLength = useAppSelector(getFilmsByGenreLength);

  const [listLength, setListLength] = useState(DEFAULT_FILM_LIST_LENGTH);
  const isButtonVisible = stateGenreFilmsLength >= listLength;

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
