import React, { useState } from 'react';
import Card from '../../components/card/card';
import { IFilmExtended } from '../../types/film-types';
import { films as filmsList } from '../../mocks/films';

type FilmsListProps = {
  films: IFilmExtended[];
};

export default function FilmsList({
  films = filmsList,
}: FilmsListProps): React.JSX.Element {
  const [activeFilm, setActiveFilm] = useState<number | null>(null);

  const handleCardHover = (id: number) => {
    setActiveFilm(id);
  };

  const handleCardLeave = () => {
    setActiveFilm(null);
  };

  return (
    <div className="catalog__films-list">
      {films.map((film) => (
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