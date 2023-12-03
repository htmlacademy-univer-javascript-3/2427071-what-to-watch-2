import { Link } from 'react-router-dom';
import './user-block.css';
import React, {useCallback} from 'react';
import {logoutAction} from '../../store/api-actions.ts';
import {useAppDispatch, useAppSelector} from '../../hooks/store.ts';
import {AuthStatus} from '../../enums/auth-status.ts';
import {AppRoute} from '../../enums/app-route.ts';

function UserBlock(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const authStatus = useAppSelector((state) => state.authStatus);
  const isAuth = authStatus === AuthStatus.Auth;

  const handleClick = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src="img/avatar.jpg" alt="User avatar" />
        </div>
      </li>
      <li className="user-block__item">
        {isAuth ? (
          <Link
            to={`${AppRoute.Main}`}
            className="user-block__link"
            onClick={handleClick}
          >
            Sign out
          </Link>
        ) : (
          <Link to={`${AppRoute.Login}`} className="user-block__link">
        Sign in
          </Link>
        )}
      </li>
    </ul>
  );
}

export default UserBlock;