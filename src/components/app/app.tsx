import React from 'react';
import {Routes, Route} from 'react-router-dom';
import MainPage from '../../pages/main/main-page';
import MyList from '../../pages/my-list/my-list';
import PageNotFound from '../../pages/page-not-found/page-not-found';
import AddReview from '../../pages/add-review/add-review';
import SignIn from '../../pages/login/login';
import MoviePage from '../../pages/movie-page/movie-page';
import Player from '../../pages/player/player';
import {AppRoute} from '../../enums/app-route';
import PrivateRoute from '../private-route/private-route';
import HistoryRouter from '../history-router/history-router.tsx';
import browserHistory from '../../browser-history.ts';
import ScrollTop from '../scroll-top/scroll-top.tsx';

function App(): React.JSX.Element {

  return (
    <HistoryRouter history={browserHistory}>
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
              <PrivateRoute>
                <MyList/>
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Films}>
            <Route path=":id" element={<MoviePage />}/>
            <Route
              path={`:id${AppRoute.Review}`}
              element={
                <PrivateRoute>
                  <AddReview />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path={`${AppRoute.Player}/:id`} element={<Player/>}/>
        </Route>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
