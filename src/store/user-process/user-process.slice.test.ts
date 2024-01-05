import {AuthStatus} from '../../enums/auth-status.ts';
import {createUser} from '../../mocks/mocks.ts';
import {UserProcessState} from '../../types/state.ts';
import { checkAuthStatusAction, loginAction, logoutAction } from '../api-actions';
import { userProcessSlice } from './user-process.slice';

describe('User process slice', () => {
  const initialState: UserProcessState = {
    user: null,
    authorizationStatus: AuthStatus.NoAuth
  };
  it('should return initial state', () => {
    const emptyAction = {type: ''};
    const expectedState = initialState;

    const result = userProcessSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state', () => {
    const emptyAction = {type: ''};
    const expectedState = initialState;

    const result = userProcessSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  describe('set loginAction test', () => {
    const user = createUser;
    const expectedState = {
      user,
      authorizationStatus: AuthStatus.Auth,
    };

    it('should login and set user in state', () => {
      expect(userProcessSlice.reducer(initialState, { type: loginAction.fulfilled.type, payload: user }))
        .toEqual(expectedState);
    });
  });

  describe('logoutUser test', () => {
    const user = createUser;
    const state: UserProcessState = {
      user,
      authorizationStatus: AuthStatus.Auth,
    };

    it('should logout, change status and remove user in state', () => {
      expect(userProcessSlice.reducer(state, logoutAction.fulfilled))
        .toEqual(initialState);
    });
  });
  describe('checkASuthStatus test', () => {
    const user = createUser;
    const expectedState = {
      user,
      authorizationStatus: AuthStatus.Auth,
    };

    it('should set user and auth status in state', () => {
      expect(userProcessSlice.reducer(initialState, { type: checkAuthStatusAction.fulfilled.type, payload: user }))
        .toEqual(expectedState);
    });
    it('should set user and auth status in state', () => {
      expect(userProcessSlice.reducer(initialState, { type: checkAuthStatusAction.rejected.type, payload: user }))
        .toEqual(initialState);
    });
  });
});
