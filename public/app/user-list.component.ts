import { Component, OnInit } from '@angular/core';

import * as io from 'socket.io';

import { User } from './user';
import { UserService } from './user.service';
 
@Component({
    selector: 'user-list',
    templateUrl: 'templates/user-list.component.html',
    styleUrls: ['templates/user-list.component.css'],
    providers: [UserService]
})
export class UserListComponent implements OnInit {

	socket = null;
	users: User[];
	init = false;

	constructor(private userService: UserService) { }

	ngOnInit() {
        this.socket = io();

        this.socket.on('updateUserList', function() {
            this.getUsers();
        }.bind(this));
    }

	getUsers() {
		this.userService.getUsers().then(users => this.users = users);
	}

}