import {Navigate} from 'react-router-dom';
import {AppRoute} from '../../enums/app-route.ts';
import React from 'react';
import {AuthStatus} from '../../enums/auth-status.ts';

type PrivateRouteProps = {
  authStatus: AuthStatus;
  children: React.JSX.Element;
};

function PrivateRoute(props: PrivateRouteProps): React.JSX.Element {
  const {authStatus, children} = props;

  const isAuth = authStatus === AuthStatus.Auth;

  return isAuth ? children : <Navigate to={AppRoute.Login}/>;
}

export default PrivateRoute;
