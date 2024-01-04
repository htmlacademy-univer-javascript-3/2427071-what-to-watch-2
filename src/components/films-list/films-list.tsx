import React, { useState } from 'react';
import Card from '../../components/card/card';
import { DEFAULT_FILM_LIST_LENGTH } from '../../constants/film-list';
import { useAppSelector } from '../../hooks/store';
import {Spinner} from '../spinner/spinner.tsx';
import {IFilm} from '../../types/film-types.ts';
import {getFilmsByGenre, getIsLoadingList} from '../../store/films-process/films-process.selectors.ts';

type FilmsListProps = {
  length?: number;
  films?: IFilm[];
};

function FilmsList({
  length = DEFAULT_FILM_LIST_LENGTH,
  films,
}: FilmsListProps): React.JSX.Element {
  const [activeFilm, setActiveFilm] = useState<number | null>(null);
  const genreFilms = useAppSelector(getFilmsByGenre);
  const isLoading = useAppSelector(getIsLoadingList);
  const filteredItems = films || genreFilms;

  const handleCardHover = (id: number) => {
    setActiveFilm(id);
  };

  const handleCardLeave = () => {
    setActiveFilm(null);
  };

  return (
    <div className="catalog__films-list">
      { isLoading ? (
        <Spinner />
      ) : (filteredItems.slice(0, length).map((film) => (
        <Card
          film={film}
          key={film.name}
          isActive={film.id === activeFilm}
          onMouseEnter={handleCardHover}
          onMouseLeave={handleCardLeave}
        />
      )))}
    </div>
  );
}

const FilmsListMemo = React.memo(FilmsList);

export default FilmsListMemo;
