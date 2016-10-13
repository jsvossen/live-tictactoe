import { Injectable } from '@angular/core';

import { User } from './user';
import { USERS } from './users';

@Injectable()
export class UserService {

	getUsers(): User[] {
		return USERS;
	}

	add(user): void {
		USERS.push(user);
	}

	delete(user): void {
		var index = USERS.findIndex( function(u) {
			return u.id == user.id;
		});
		if (index > -1) {
		   USERS.splice(index, 1);
		}
	}

}