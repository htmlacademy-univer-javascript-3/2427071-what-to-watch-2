import React from 'react';
import './film-card-poster.css';

type MovieCardPosterProps = {
  size?: string;
  src?: string;
  alt?: string;
};

function FilmCardPoster({
  size = '',
  src = '',
  alt = '',
}: MovieCardPosterProps): React.JSX.Element {
  const computedClass = `film-card__poster ${
    size ? `film-card__poster--${size}` : ''
  }`;

  return (
    <div className={computedClass} data-testid="poster">
      <img src={src} alt={alt} />
    </div>
  );
}

const FilmCardPosterMemo = React.memo(FilmCardPoster);

export default FilmCardPosterMemo;
