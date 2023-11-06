import React from 'react';
import { Link } from 'react-router-dom';
import { IFilmExtended } from '../../types/film-types';
import { AppRoute } from '../../enums/app-route';

type CardProps = {
  film: IFilmExtended;
};

function Card({film}: CardProps): React.JSX.Element {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
      <img src={film.posterImage} alt={film.alt} width={280}
          height={175} />
      </div>
      <h3 className="small-film-card__title">
      <Link
          className="small-film-card__link"
          to={`${AppRoute.Films}/${film.id}`}
        >
          {film.name}
        </Link>
      </h3>
    </article>
  );
}

export default Card;
