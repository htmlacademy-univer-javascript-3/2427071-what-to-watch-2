import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { IFilmExtended } from '../../types/film-types';
import { AppRoute } from '../../enums/app-route';
import VideoPlayer from '../videoplayer/videoplayer';

type CardProps = {
  film: IFilmExtended;
  isActive?: boolean;
  isMuted?: boolean;
  onMouseEnter: (id: number) => void;
  onMouseLeave: () => void;
};

function Card({ film, isActive = false, isMuted = true, onMouseEnter, onMouseLeave }: CardProps): React.JSX.Element {
  const { name, posterImage, alt, id, videoLink, backgroundImage } = film;
  
  const handleMouseEnter = useCallback(() => {
    onMouseEnter(id);
  }, [id, onMouseEnter]);

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
      data-active={isActive}
    >
      <div className="small-film-card__image">
      {isActive ? (
          <VideoPlayer
            link={videoLink}
            posterImage={backgroundImage}
            isMuted={isMuted}
          />
        ) : (
          <img src={posterImage} alt={alt} width="280" height="175" />
        )}
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
