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
        if (this.userName !== null){
            if (this.userName == '') {
                alert('Username cannot be empty.');
                return;
            }
            //this.uid = this.userName.toLowerCase().replace(/\W/g, '')+Math.floor((Math.random() * 1000) + 100);
            sessionStorage.setItem('userName', this.userName);

            this.userService.add(this.userName)
                .then(user => {
                sessionStorage.setItem('uid', user._id);
                this.router.navigate(['chat']);
            });            
        }
    }
 
    keypressHandler(event) {
        if (event.keyCode  === 13){
            this.login();
        }
    } 
}