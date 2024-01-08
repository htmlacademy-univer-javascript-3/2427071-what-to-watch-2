import {State} from '../../types/state.ts';
import {CheckUserData, UserData} from '../../types/auth.ts';
import {NameSpace} from '../../enums/namespace.ts';
import {AuthStatus} from '../../enums/auth-status.ts';

export const getAuthStatus = (state: Pick<State, NameSpace.User>): AuthStatus => state[NameSpace.User].authorizationStatus;
export const getUser = (state: Pick<State, NameSpace.User>): UserData | CheckUserData | null => state[NameSpace.User].user;
