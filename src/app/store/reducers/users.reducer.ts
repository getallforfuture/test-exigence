import * as UserActions from '../actions/users.actions';
import { User } from '../../models/user.model';
import { createReducer, on } from '@ngrx/store';
export interface UsersState {
  users: User[];
  loading: boolean;
  error: any;
  selectedUser?: User;
}

export const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,

};

export const usersReducer = createReducer(
  initialState,
  on(UserActions.getUsersListSuccess, (state, { users }) => ({ ...state, users, loading: false })),
  on(UserActions.getUsersListFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(UserActions.selectUser, (state, { userId }) => {
    const selectedUser = state.users.find(user => user.id === userId);
    return { ...state, selectedUser };
  }),
  on(UserActions.updateUser, (state, { user }) => {
    const selectedUser = state.selectedUser;
    if (!selectedUser) return state;
    const updatedUser: User = { ...selectedUser, ...user };
    const updatedUsers = state.users.map(u => u.id === selectedUser.id ? updatedUser : u);
    return { ...state, users: updatedUsers, selectedUser: updatedUser };
  })
);