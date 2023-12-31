import {AuthStatus} from '../../enums/auth-status';
import {createUser} from '../../utils/mocks';
import {UserProcessState} from '../../types/state';
import { checkAuthStatusAction, loginAction, logoutAction } from '../api-actions';
import { userProcessSlice } from './user-process.slice';

describe('User process slice', () => {
  const initialState: UserProcessState = {
    user: null,
    authorizationStatus: AuthStatus.NoAuth,
    hasError: false
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
      hasError: false,
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
      hasError: false
    };

    it('should logout, change status and remove user in state', () => {
      expect(userProcessSlice.reducer(state, logoutAction.fulfilled))
        .toEqual(initialState);
    });
  });

  describe('checkAuthStatus test', () => {
    const user = createUser;
    const expectedState = {
      user,
      authorizationStatus: AuthStatus.Auth,
      hasError: false
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
