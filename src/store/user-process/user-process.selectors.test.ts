import { NameSpace } from '../../enums/namespace';
import {AuthStatus} from '../../enums/auth-status';
import {createUser} from '../../utils/mocks';
import {getAuthStatus, getUser} from './user-process.selectors';

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
