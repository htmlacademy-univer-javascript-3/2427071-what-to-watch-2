import React from 'react';
import GenresList from '../genre-list/genre-list';
import { IFilmExtended } from '../../types/film-types';
import FilmsList from '../films-list/films-list';

type CatalogProps = {
  films: IFilmExtended[];
};

function Catalog({ films }: CatalogProps): React.JSX.Element {
  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <GenresList />
      <FilmsList films={films} />
      <div className="catalog__more">
        <button className="catalog__button" type="button">
          Show more
        </button>
      </div>
    </section>
  );
}

export default Catalog;
