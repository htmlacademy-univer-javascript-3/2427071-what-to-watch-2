import {Navigate} from 'react-router-dom';
import {AppRoute} from '../../enums/app-route.ts';
import React from 'react';
import {useAppSelector} from '../../hooks/store.ts';
import {AuthStatus} from '../../enums/auth-status.ts';
import {getAuthStatus} from '../../store/user-process/user-process.selectors.ts';

type PrivateRouteProps = {
  children: React.JSX.Element;
};

function PrivateRoute(props: PrivateRouteProps): React.JSX.Element {
  const {children} = props;

  const authStatus = useAppSelector(getAuthStatus);
  const isAuth = authStatus === AuthStatus.Auth;

  return isAuth ? children : <Navigate to={AppRoute.Login}/>;
}

export default PrivateRoute;
