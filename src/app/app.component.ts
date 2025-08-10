import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject, takeUntil, tap, map, shareReplay, combineLatest, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { UsersState } from './store/reducers/users.reducer';
import * as UserActions from './store/actions/users.actions';
import * as UserSelectors from './store/selectors/users.selectors';
import { User } from './models/user.model';
import { MatSidenav } from '@angular/material/sidenav';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements  OnInit, OnDestroy {

  @ViewChild('sidenav') sidenav!: MatSidenav;
  searchTerm$ = new BehaviorSubject<string>('');
  users$: Observable<Map<string, User[]>>  = combineLatest([this.store.select(UserSelectors.selectUsers), this.searchTerm$]).pipe(
    map(([users, searchTerm]) => searchTerm.length > 0 ? this.userService.searchForUser(users, searchTerm) : this.userService.splitUsersByGender(users)),
  );
  selectedUser$: Observable<User | null> = this.store.select(UserSelectors.selectSelectedUser)

  isMobile$: Observable<boolean>;
  takeUntilDestroyed = new Subject<void>();

  constructor(
    private store: Store<UsersState>,
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
  ) {
    this.isMobile$ = this.breakpointObserver.observe([Breakpoints.Handset])
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.getUsersList());
  }

  onSelectedUser(user: User): void  {
    this.isMobile$
    .pipe(
      takeUntil(this.takeUntilDestroyed),
    )
    .subscribe(isMobile => {
      if (isMobile) {
        this.sidenav.close();
      }
    });
  }

  ngOnDestroy() {
    this.takeUntilDestroyed.next();
    this.takeUntilDestroyed.complete();
  }

 search(term: string) {
  this.searchTerm$.next(term);
  }

  onInput(event: EventTarget | null): void {
    if (!event) return;
    const value = (event as HTMLInputElement).value;
    this.search(value);
  }
}
