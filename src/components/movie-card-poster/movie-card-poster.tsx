import React from 'react';
import './movie-card-poster.css';

type MovieCardPosterProps = {
  size?: string;
};

function MovieCardPoster({
  size = '',
}: MovieCardPosterProps): React.JSX.Element {
  const computedClass = `film-card__poster ${
    size ? `film-card__poster--${size}` : ''
  }`;

  return (
    <div className={computedClass}>
      <img
        src="img/the-grand-budapest-hotel-poster.jpg"
        alt="The Grand Budapest Hotel poster"
      />
    </div>
  );
}

export default MovieCardPoster;
