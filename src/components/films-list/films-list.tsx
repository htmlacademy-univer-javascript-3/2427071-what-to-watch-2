import React, { useState } from 'react';
import Card from '../../components/card/card';
import { IFilmExtended } from '../../types/film-types';
import { films as filmsList } from '../../mocks/films';

type FilmsListProps = {
  films: IFilmExtended[];
  length?: number;
  genre?: string;
};

export default function FilmsList({
  films = filmsList,
  length = filmsList.length,
  genre,
}: FilmsListProps): React.JSX.Element {
  const [activeFilm, setActiveFilm] = useState<number | null>(null);

  const handleCardHover = (id: number) => {
    setActiveFilm(id);
  };

  const handleCardLeave = () => {
    setActiveFilm(null);
  };

  const filteredItems = genre
    ? films.filter((film) => film.genre === genre)
    : films

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