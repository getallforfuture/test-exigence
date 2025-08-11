import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const getUsersList = createAction('[Users] Get Users List');
export const getUsersListSuccess = createAction('[Users] Get Users List Success', props<{ users: User[] }>());
export const getUsersListFailure = createAction('[Counter] Get Users List Failure', props<{ error: any }>());

export const selectUser = createAction('[Users] Select User', props<{ userId: string }>());
export const updateUser = createAction('[Users] Update User', props<{ user: {firstName: string, lastName: string, role: string, email: string} }>());