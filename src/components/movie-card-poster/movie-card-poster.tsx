import React from 'react';
import './movie-card-poster.css';

type MovieCardPosterProps = {
  size?: string;
  src?: string;
  alt?: string;
};

function MovieCardPoster({
  size = '',
  src = '',
  alt = '',
}: MovieCardPosterProps): React.JSX.Element {
  const computedClass = `film-card__poster ${
    size ? `film-card__poster--${size}` : ''
  }`;

  return (
    <div className={computedClass}>
      <img src={src} alt={alt} />
    </div>
  );
}

const MovieCardPosterMemo = React.memo(MovieCardPoster);

export default MovieCardPosterMemo;
