import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../constants/namespaces.ts';
import {UserProcessState} from '../../types/state.ts';
import {AuthStatus} from '../../enums/auth-status.ts';
import {checkAuthStatus, loginAction, logoutAction} from '../api-actions.ts';
import {removeToken, setToken} from '../../services/token.ts';

const initialState: UserProcessState = {
  authorizationStatus: AuthStatus.Unknown,
  user: null,
};

export const userProcessSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutAction.fulfilled, (state) => {
        removeToken();
        state.user = null;
        state.authorizationStatus = AuthStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        setToken(action.payload.token);
        state.user = action.payload;
        state.authorizationStatus = AuthStatus.Auth;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        setToken(action.payload.token);
        state.user = action.payload;
        state.authorizationStatus = AuthStatus.Auth;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        removeToken();
        state.user = null;
        state.authorizationStatus = AuthStatus.NoAuth;
      });
  }
});
