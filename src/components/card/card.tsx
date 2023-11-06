import React from 'react';
import { Link } from 'react-router-dom';
import { IFilmExtended } from '../../types/film-types';
import { AppRoute } from '../../enums/app-route';

type CardProps = {
  film: IFilmExtended;
  isActive?: boolean;
};

function Card({film, isActive = false}: CardProps): React.JSX.Element {
  const { name, posterImage, alt, id, videoLink, backgroundImage } = film;
  return (
    <article className="small-film-card catalog__films-card" data-active={isActive}>
      <div className="small-film-card__image">
      <img src={posterImage} alt={alt} width={280}
          height={175} />
      </div>
      <h3 className="small-film-card__title">
      <Link
          className="small-film-card__link"
          to={`${AppRoute.Films}/${id}`}
        >
          {name}
        </Link>
      </h3>
    </article>
  );
}

export default Card;
