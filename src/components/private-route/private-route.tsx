import {Navigate} from 'react-router-dom';
import {AppRoute} from '../../enums/app-route';
import React from 'react';
import {AuthStatus} from '../../enums/auth-status';

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
