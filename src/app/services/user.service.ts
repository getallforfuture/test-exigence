import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersMap: Map<string,User[]> = new Map<string, User[]>();
  constructor() { }

  splitUsersByGender(users: User[]): Map<string, User[]> {
    const femaleUsers: User[] = users.filter(user => user.gender === 'female');
    const maleUsers: User[] = users.filter(user => user.gender === 'male');
    this.usersMap.set('female', femaleUsers);
    this.usersMap.set('male', maleUsers);
    return this.usersMap;
  }
  
  searchForUser(users: User[], searchTerm: string): Map<string, User[]> {
    const filteredUsers: User[] = users.filter(user => 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return this.splitUsersByGender(filteredUsers);
  }
}
