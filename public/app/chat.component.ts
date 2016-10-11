import { Component } from '@angular/core';
import { Router }    from '@angular/router';

import * as io from 'socket.io';
 
@Component({
    selector: 'chat',
    templateUrl: 'templates/chat.component.html'
})
export class ChatComponent {
    message = '';
    conversation = [];
    socket = null;
 
    constructor(private router: Router){}
 
    ngOnInit() {
        if (sessionStorage.getItem("userName") === null){
            this.router.navigate(['registration']);
        }
        this.socket = io();
        this.socket.on('chatUpdate', function(data) {
            this.conversation.push(data);
        }.bind(this));
    }
 
    send() {
        this.socket.emit('newMessage', {
            'userName': sessionStorage.getItem("userName"),
            'text': this.message
        });
        this.message = '';
    }
 
    keypressHandler(event) {
        if (event.keyCode === 13){
            this.send();
        }
    } 
 
    isNewUserAlert(data){
        return data.userName === '';
    }
}