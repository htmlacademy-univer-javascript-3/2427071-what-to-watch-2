import React from 'react';
import {HelmetProvider} from 'react-helmet-async';
import {Routes, Route} from 'react-router-dom';
import {useAppSelector} from '../../hooks/store.ts';
import MainPage from '../../pages/main-page/main-page';
import MyList from '../../pages/my-list/my-list';
import PageNotFound from '../../pages/page-not-found/page-not-found';
import AddReview from '../../pages/add-review/add-review';
import SignIn from '../../pages/login/login';
import FilmPage from '../../pages/film-page/film-page.tsx';
import Player from '../../pages/player/player';
import {AppRoute} from '../../enums/app-route';
import {getAuthStatus} from '../../store/user-process/user-process.selectors.ts';
import PrivateRoute from '../private-route/private-route';
import ScrollTop from '../scroll-top/scroll-top.tsx';

function App(): React.JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);

  return (
    <HelmetProvider>
      <ScrollTop/>
      <Routes>
        <Route path={AppRoute.Main}>
          <Route
            index
            element={
              <MainPage />
            }
          />
          <Route path={AppRoute.Login} element={<SignIn/>}/>
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute authStatus={authStatus}>
                <MyList/>
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Films}>
            <Route path=":id" element={<FilmPage />}/>
            <Route
              path={`:id${AppRoute.Review}`}
              element={
                <PrivateRoute authStatus={authStatus}>
                  <AddReview />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path={`${AppRoute.Player}/:id`} element={<Player/>}/>
        </Route>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
