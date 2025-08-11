import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { UsersState } from 'src/app/store/reducers/users.reducer';
import * as UserSelectors from 'src/app/store/selectors/users.selectors';
import * as UserActions from 'src/app/store/actions/users.actions';

@Component({
  selector: 'app-user-description',
  templateUrl: './user-description.component.html',
  styleUrls: ['./user-description.component.scss']
})
export class UserDescriptionComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  selectedUser$ = this.store.select(UserSelectors.selectSelectedUser);
  private destroy$ = new Subject<void>();
  saving = false;
  saveComplete = false;

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

          this.form.markAsPristine();
          this.form.markAsUntouched();
        }
      });
  }

  onSave() {
    if (this.form.invalid) return;

    this.saving = true;

    setTimeout(() => {
      this.saving = false;
      this.saveComplete = true;
      this.store.dispatch(UserActions.updateUser({ user: this.form.value }));
    }, 2000);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
