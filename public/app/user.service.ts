import { Injectable } from '@angular/core';

import { User } from './user';
import { USERS } from './users';

@Injectable()
export class UserService {

	getUsers(): User[] {
		return USERS;
	}

	addUser(user): void {
		USERS.push(user);
	}

}