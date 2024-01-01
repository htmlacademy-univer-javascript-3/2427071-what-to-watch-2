import React, { FormEvent, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppRoute } from '../../enums/app-route';
import { FavoriteStatus } from '../../enums/favorite-status';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { changeFavoriteStatus, fetchFavoriteFilmsAction, fetchFilmByIdAction, fetchFilmReviewsAction, fetchSimilarFilmsAction } from '../../store/api-actions';
import { getFavoriteFilmsLength } from '../../store/films-process/films-process.selectors';

type FilmCardButtonsProps = {
  isAuth?: boolean;
  isFavorite?: boolean;
  id?: string;
  isReviewButtonVisible?: boolean;
};

function FilmCardButtons({
  isAuth = false,
  isFavorite = false,
  id = '',
  isReviewButtonVisible = false,
}: FilmCardButtonsProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const favoriteFilmsCount = useAppSelector(getFavoriteFilmsLength);

  const handleChangeFavorite = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!isAuth) {
      navigate(AppRoute.Login);
    }

    dispatch(
      changeFavoriteStatus({
        status: isFavorite
          ? FavoriteStatus.NoFavorite
          : FavoriteStatus.Favorite,
        filmId: String(id),
      })
    ).then(() => {
      dispatch(fetchFavoriteFilmsAction());
    });
  };

  useEffect(() => {
    if (!id && params.id) {
      dispatch(fetchFilmByIdAction(params.id));
      dispatch(fetchSimilarFilmsAction(params.id));
      dispatch(fetchFilmReviewsAction(params.id));
    }
  }, [params.id, dispatch, id]);

  return (
    <div className="film-card__buttons">
      <Link
        className="btn btn--play film-card__button"
        type="button"
        to={`${AppRoute.Player}/${id}`}
      >
        <svg viewBox="0 0 19 19" width={19} height={19}>
          <use xlinkHref="#play-s" />
        </svg>
        <span>Play</span>
      </Link>
      <button
        className="btn btn--list film-card__button"
        type="button"
        onClick={handleChangeFavorite}
      >
        {isFavorite ? (
          <svg viewBox="0 0 18 14" width="18" height="14">
            <use xlinkHref="#in-list"></use>
          </svg>
        ) : (
          <svg viewBox="0 0 19 20" width={19} height={20}>
            <use xlinkHref="#add"></use>
          </svg>
        )}
        {isAuth ? (
          <Link
            to={`${AppRoute.MyList}`}
            className="film-card__link"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            My list
          </Link>
        ) : (
          <span>My list</span>
        )}
        <span className="film-card__count">{favoriteFilmsCount}</span>
      </button>
      {isAuth && isReviewButtonVisible && (
        <Link
          to={`${AppRoute.Films}/${id}${AppRoute.Review}`}
          className="btn film-card__button"
        >
          Add review
        </Link>
      )}
    </div>
  );
}

export default FilmCardButtons;
