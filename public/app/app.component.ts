import { Component, HostListener } from '@angular/core';
import * as io from 'socket.io';

import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'my-app',
  template: '<router-outlet></router-outlet>',
  providers: [UserService]
})
export class AppComponent { 
	socket = null;

	constructor(private userService: UserService) { }

	ngOnInit() {
       this.socket = io();
       //delete user from db on disconnect
       this.socket.on('deleteUser', function(uid) {
            this.userService.delete(uid);
        }.bind(this));
    }

    //delete last user from db on window close
    @HostListener('window:beforeunload')
  	deleteUser() {
  		this.userService.delete(sessionStorage.getItem("uid"));
  	}
}
