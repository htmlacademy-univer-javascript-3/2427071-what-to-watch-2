import Card from '../card/card';
import React from 'react';
import GenresList from '../genre-list/genre-list';
import { IFilmExtended } from '../../types/film-types';

type CatalogProps = {
  films: IFilmExtended[];
};

function Catalog({ films }: CatalogProps): React.JSX.Element {
  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <GenresList />
      <div className="catalog__films-list">
        {films.map((film) => (
          <Card film={film} key={film.name} />
        ))}
      </div>
      <div className="catalog__more">
        <button className="catalog__button" type="button">
          Show more
        </button>
      </div>
    </section>
  );
}

export default Catalog;
