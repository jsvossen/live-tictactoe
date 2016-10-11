import { Component }  from '@angular/core';
import { Router }     from '@angular/router';
import { FormsModule }     from '@angular/forms';

import * as io from 'socket.io';
 
@Component({
    selector: 'user-registration',
    templateUrl: 'templates/user-registration.component.html',
    styleUrls: ['templates/user-registration.component.css']
})
export class UserRegistrationComponent {
    userName = '';
    socket = null;
 
    constructor( private router: Router){}
 
    ngOnInit() {
        this.socket = io();
    }
 
    login() {
        if (this.userName !== null){
            if (this.userName == '') {
                alert('Username cannot be empty.');
                return;
            }
            sessionStorage.setItem('userName', this.userName);
            this.router.navigate(['chat']);
            this.socket.emit('newUser', this.userName);
        }
    }
 
    keypressHandler(event) {
        if (event.keyCode  === 13){
            this.login();
        }
    } 
}