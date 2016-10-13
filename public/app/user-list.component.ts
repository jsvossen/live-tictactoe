import { Component, OnInit } from '@angular/core';

import * as io from 'socket.io';

import { User } from './user';
import { UserService } from './user.service';
 
@Component({
    selector: 'user-list',
    templateUrl: 'templates/user-list.component.html',
    providers: [UserService]
})
export class UserListComponent implements OnInit {

	socket = null;
	users: User[];
	init = false;

	constructor(private userService: UserService) { }

	ngOnInit() {
        if (sessionStorage.getItem("userName") === null){
            return;
        }
        this.socket = io();
        this.socket.on('updateUserList', function(data) {
        	this.userService.addUser({'id':'test', 'name':data});
        }.bind(this));

        this.getUsers();
    }

	getUsers() {
		this.users = this.userService.getUsers();
	}

}