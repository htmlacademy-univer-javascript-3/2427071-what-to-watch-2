import {Navigate} from 'react-router-dom';
import {AppRoute} from '../../enums/app-route.ts';
import React from 'react';

type PrivateRouteProps = {
  children: React.FunctionComponent;
};

function PrivateRoute(props: PrivateRouteProps): React.FunctionComponent {
  const {children} = props;

  const isAuth = true;

  return isAuth ? children : <Navigate to={AppRoute.Login}/>;
}

export default PrivateRoute;
