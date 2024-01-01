import {State} from '../../types/state.ts';
import { UserData } from '../../types/auth.ts';
import {NameSpace} from '../../constants/namespaces.ts';
import {AuthStatus} from '../../enums/auth-status.ts';

export const getAuthStatus = (state: State): AuthStatus => state[NameSpace.User].authorizationStatus;
export const getUser = (state: State): UserData | null => state[NameSpace.User].user;
