import React from 'react';
import {ALL_GENRES} from '../../constants/genres';
import GenreItem from '../genre-item/genre-item.tsx';
import {useAppSelector} from '../../hooks/store.ts';
import {getActiveGenre, getFilms} from '../../store/films-process/films-process.selectors.ts';

function GenresList(): React.JSX.Element {
  const activeGenre = useAppSelector(getActiveGenre);
  const films = useAppSelector(getFilms);

  const genreList = [ALL_GENRES, ...new Set(films.map((film) => film.genre))];

  return (
    <ul className="catalog__genres-list">
      {genreList.map((genre) => (
        <GenreItem name={genre} isActive={genre === activeGenre} key={genre}/>
      ))}
    </ul>
  );
}

export default GenresList;
