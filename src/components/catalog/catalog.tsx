import Card from '../card/card';
import React from 'react';
import GenresList from '../genre-list/genre-list';

function Catalog(): React.FunctionComponent {
  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <GenresList/>
      <div className="catalog__films-list">
        {Array.from({length: 20}, (_, index) => (
          <Card key={index}/>
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
