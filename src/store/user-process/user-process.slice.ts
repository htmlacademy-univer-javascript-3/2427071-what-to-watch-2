import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../enums/namespace';
import {UserProcessState} from '../../types/state';
import {AuthStatus} from '../../enums/auth-status';
import {checkAuthStatusAction, loginAction, logoutAction} from '../api-actions';
import {removeToken, setToken} from '../../services/token';

const initialState: UserProcessState = {
  authorizationStatus: AuthStatus.Unknown,
  user: null,
};

export const userProcessSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setAuthStatus: (state, action) => {
      state.authorizationStatus = action.payload as AuthStatus;
    }
  },
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
      .addCase(checkAuthStatusAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthStatus.Auth;
      })
      .addCase(checkAuthStatusAction.rejected, (state) => {
        // removeToken();
        state.user = null;
        state.authorizationStatus = AuthStatus.NoAuth;
      });
  }
});

export const {setAuthStatus} = userProcessSlice.actions;
