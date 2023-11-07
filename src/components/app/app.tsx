import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from '../../pages/main/main-page';
import MyList from '../../pages/my-list/my-list';
import PageNotFound from '../../pages/page-not-found/page-not-found';
import AddReview from '../../pages/add-review/add-review';
import SignIn from '../../pages/login/login';
import MoviePage from '../../pages/movie-page/movie-page';
import Player from '../../pages/player/player';
import {AppRoute} from '../../enums/app-route';
import PrivateRoute from '../private-route/private-route';
import {IFilmExtended} from '../../types/film-types';

interface MainPageProps {
  films: IFilmExtended[];
}

function App({films}: MainPageProps): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main}>
          <Route
            index
            element={
              <MainPage films={films}/>
            }
          />
          <Route path={AppRoute.Login} element={<SignIn/>}/>
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute>
                <MyList films={films}/>
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Films}>
            <Route path=":id" element={<MoviePage films={films}/>}/>
            <Route
              path={`:id${AppRoute.Review}`}
              element={
                <PrivateRoute>
                  <AddReview films={films}/>
                </PrivateRoute>
              }
            />
          </Route>
          <Route path={`${AppRoute.Player}/:id`} element={<Player/>}/>
        </Route>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
