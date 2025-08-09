import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from '../actions/users.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User, UsersResponse } from 'src/app/models/user.model';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUsersList),
      tap(() => console.log('Loading users...')),
      mergeMap(() =>
        this.http.get<UsersResponse>('https://dummyjson.com/users').pipe(
          map(res => UserActions.getUsersListSuccess({ users: res.users })),
          catchError(error => of(UserActions.getUsersListFailure({ error })))
        )
      )
    )
  );
}