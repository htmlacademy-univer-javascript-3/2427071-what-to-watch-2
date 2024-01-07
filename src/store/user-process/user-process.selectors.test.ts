import { NameSpace } from '../../constants/namespaces';
import {AuthStatus} from '../../enums/auth-status.ts';
import {createUser} from '../../mocks/mocks.ts';
import {getAuthStatus, getUser} from './user-process.selectors.ts';

describe('User process selectors Test', () => {
  const state = {
    [NameSpace.User]: {
      user: createUser,
      authorizationStatus: AuthStatus.Unknown,
    }
  };

  it('should return user from state', () => {
    const { user } = state[NameSpace.User];
    const result = getUser(state);
    expect(result).toEqual(user);
  });
  it('should return authorization status from state', () => {
    const { authorizationStatus } = state[NameSpace.User];
    const result = getAuthStatus(state);
    expect(result).toEqual(authorizationStatus);
  });
});
