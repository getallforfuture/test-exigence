import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { UsersState } from 'src/app/store/reducers/users.reducer';
import * as UserSelectors from 'src/app/store/selectors/users.selectors';

@Component({
  selector: 'app-user-description',
  templateUrl: './user-description.component.html',
  styleUrls: ['./user-description.component.scss']
})
export class UserDescriptionComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  selectedUser$ = this.store.select(UserSelectors.selectSelectedUser);
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<UsersState>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
   }

  ngOnInit(): void {

    this.selectedUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        if (user) {
          this.form.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            email: user.email
          });
        }
      });
  }

  onSave() {
    if (this.form.valid) {
      console.log('Updated user data:', this.form.value);
      // this.store.dispatch(UserActions.updateUser({ user: this.form.value }));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
