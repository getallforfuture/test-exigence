import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, takeUntil, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { UsersState } from './store/reducers/users.reducer';
import * as UserActions from './store/actions/users.actions';
import * as UserSelectors from './store/selectors/users.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements  OnInit, OnDestroy {
  title = 'test';
  users$ = this.store.select(UserSelectors.selectUsers).pipe(
    tap(users => console.log('Users from store:', users))
  );
  user: boolean = false;
  isMobile = false;

  takeUntilDestroyed = new Subject<void>();

  constructor(
    private store: Store<UsersState>,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset]).pipe(
      takeUntil(this.takeUntilDestroyed)
    )
    .subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.getUsersList());
  }

  ngOnDestroy() {
    this.takeUntilDestroyed.next();
    this.takeUntilDestroyed.complete();
  }
}
