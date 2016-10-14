import { Component }  from '@angular/core';
import { Router }     from '@angular/router';
import { FormsModule }     from '@angular/forms';

import * as io from 'socket.io';

import { User } from './user';
import { UserService } from './user.service';
 
@Component({
    selector: 'user-registration',
    templateUrl: 'templates/user-registration.component.html',
    styleUrls: ['templates/user-registration.component.css'],
    providers: [UserService]
})
export class UserRegistrationComponent {
    userName = '';
    socket = null;
 
    constructor( 
        private router: Router,
        private userService: UserService
    ){}
 
    ngOnInit() {
        this.socket = io();
    }
 
    login() {
        //prevent empty user name
        this.userName = this.userName.trim();
        if (this.userName !== null){
            if (this.userName == '') {
                alert('Username cannot be empty.');
                return;
            }

            //store user name in session
            sessionStorage.setItem('userName', this.userName);

            //add new user, store uid in session, then go to chat
            this.userService.add(this.userName)
                .then(user => {
                sessionStorage.setItem('uid', user._id);
                this.router.navigate(['chat']);
            });            
        }
    }
 
    //enter key binding
    keypressHandler(event) {
        if (event.keyCode  === 13){
            this.login();
        }
    } 
}