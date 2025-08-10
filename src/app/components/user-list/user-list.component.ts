import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { UsersState } from 'src/app/store/reducers/users.reducer';
import * as UserActions from 'src/app/store/actions/users.actions';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  @Input() users: Map<string, User[]> | null = null;
  @Input() selectedUser: User | null = null;
  @Input() tabName: string = '';
  @Output() select: EventEmitter<User> = new EventEmitter<User>();

  constructor(
    private store: Store<UsersState>,
  ) { }

  selectUser(user: User): void {
    this.store.dispatch(UserActions.selectUser({ userId: user.id }));
    this.select.emit(user);
  }
}