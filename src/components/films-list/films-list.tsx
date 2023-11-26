import React, { useState } from 'react';
import Card from '../../components/card/card';
import { DEFAULT_FILM_LIST_LENGTH } from '../../constants/film-list';
import { useAppSelector } from '../../hooks/store';

type FilmsListProps = {
  length?: number;
  genre?: string;
};

export default function FilmsList({
  length = DEFAULT_FILM_LIST_LENGTH,
  genre,
}: FilmsListProps): React.JSX.Element {
  const [activeFilm, setActiveFilm] = useState<number | null>(null);
  const films = useAppSelector((state) => state.films);
  const isLoading = useAppSelector((state) => state.isLoadingFilms);

  const handleCardHover = (id: number) => {
    setActiveFilm(id);
  };

  const handleCardLeave = () => {
    setActiveFilm(null);
  };

  const filteredItems = genre
    ? films.filter((film) => film.genre === genre)
    : films;

  return (
    <div className="catalog__films-list">
      {filteredItems.slice(0, length).map((film) => (
        <Card
          film={film}
          key={film.name}
          isActive={film.id === activeFilm}
          onMouseEnter={handleCardHover}
          onMouseLeave={handleCardLeave}
        />
      ))}
    </div>
  );
}
