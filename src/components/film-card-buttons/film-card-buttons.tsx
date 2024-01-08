import React, { FormEvent, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppRoute } from '../../enums/app-route';
import {ButtonSize} from '../../enums/buttons.ts';
import { FavoriteStatus } from '../../enums/favorite-status';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { changeFavoriteStatusAction, fetchFavoriteFilmsAction, fetchFilmByIdAction, fetchFilmReviewsAction, fetchSimilarFilmsAction } from '../../store/api-actions';
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
      changeFavoriteStatusAction({
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
    let isMounted = true;

    if (isMounted) {
      if (!id && params.id) {
        dispatch(fetchFilmByIdAction(params.id));
        dispatch(fetchSimilarFilmsAction(params.id));
        dispatch(fetchFilmReviewsAction(params.id));
      }
    }
    return () => {
      isMounted = false;
    };
  }, [params.id, dispatch, id]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchFavoriteFilmsAction());
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return (
    <div className="film-card__buttons">
      <Link
        className="btn btn--play film-card__button"
        type="button"
        to={`${AppRoute.Player}/${id}`}
      >
        <svg viewBox="0 0 19 19" width={ButtonSize.WIDTH} height={ButtonSize.HEIGHT}>
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
          <svg viewBox="0 0 18 14" width={ButtonSize.WIDTH} height={ButtonSize.HEIGHT}>
            <use xlinkHref="#in-list"></use>
          </svg>
        ) : (
          <svg viewBox="0 0 19 20" width={ButtonSize.WIDTH} height={ButtonSize.HEIGHT}>
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
