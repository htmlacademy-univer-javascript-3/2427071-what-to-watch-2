import React from 'react';
import { IFilmPromoInfo } from '../../types/film-types';

type OverviewProps = {
  film: IFilmPromoInfo;
};
function Overview({ film }: OverviewProps): React.JSX.Element {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">Very good</span>
          <span className="film-rating__count">{film.scoresCount} ratings</span>
        </p>
      </div>
      <div className="film-card__text">
        <p>{film.description}</p>
        <p className="film-card__director">
          <strong>Director: {film.director}</strong>
        </p>
        <p className="film-card__starring">
          <strong>Starring:{film.starring.join(', ')}</strong>
        </p>
      </div>
    </>
  );
}

const OverviewMemo = React.memo(Overview);

export default OverviewMemo;
