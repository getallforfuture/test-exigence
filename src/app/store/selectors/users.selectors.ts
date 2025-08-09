import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UsersState } from "../reducers/users.reducer";
export const selectUserState = createFeatureSelector<UsersState>('usersState');

// Select users array
export const selectUsers = createSelector(
  selectUserState,
  (state: UsersState) => state.users
);

// Select loading flag
export const selectLoading = createSelector(
  selectUserState,
  (state: UsersState) => state.loading
);

// Select error
export const selectError = createSelector(
  selectUserState,
  (state: UsersState) => state.error
);