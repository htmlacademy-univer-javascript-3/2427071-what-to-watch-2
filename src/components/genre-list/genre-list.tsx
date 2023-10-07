import React from 'react';
import {GENRES} from '../../constants/genres';
import GenreItem from '../genre-item/genre-item.tsx';

function GenresList(): React.JSX.Element {
  return (
    <ul className="catalog__genres-list">
      {GENRES.map((genre) => (
        <GenreItem name={genre.name} isActive={genre.isActive} key={genre.id}/>
      ))}
    </ul>
  );
}

export default GenresList;
