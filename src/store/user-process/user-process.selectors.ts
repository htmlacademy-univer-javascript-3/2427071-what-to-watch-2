import {State} from '../../types/state.ts';
import {UserData} from '../../types/auth.ts';
import {NameSpace} from '../../enums/namespace.ts';
import {AuthStatus} from '../../enums/auth-status.ts';

export const getAuthStatus = (state: Pick<State, NameSpace.User>): AuthStatus => state[NameSpace.User].authorizationStatus;
export const getUser = (state: Pick<State, NameSpace.User>): UserData | null => state[NameSpace.User].user;
export const getAuthHasError = (state: Pick<State, NameSpace.User>): boolean => state[NameSpace.User].hasError;
