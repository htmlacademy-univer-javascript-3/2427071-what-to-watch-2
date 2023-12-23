import {combineReducers} from '@reduxjs/toolkit';
import {userProcessSlice} from './user-process/user-process.slice.ts';
import {NameSpace} from '../constants/namespaces.ts';
import {filmProcessSlice} from './film-process/film-process.slice.ts';
import {filmsProcessSlice} from './films-process/films-process.slice.ts';

export const rootReducer = combineReducers({
  [NameSpace.Film]: filmProcessSlice.reducer,
  [NameSpace.Films]: filmsProcessSlice.reducer,
  [NameSpace.User]: userProcessSlice.reducer,
});
