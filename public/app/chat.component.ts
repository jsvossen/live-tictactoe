import { Component, OnInit, ViewChild } from '@angular/core';
import { Router }    from '@angular/router';

import * as io from 'socket.io';
 
@Component({
    selector: 'chat',
    templateUrl: 'templates/chat.component.html',
    styleUrls:['templates/chat.compontent.css'],
})
export class ChatComponent implements OnInit {
    message = '';
    conversation = [];
    socket = null;

    @ViewChild('container') container;
 
    constructor(
        private router: Router,
    ){}
 
    ngOnInit() {
        if (sessionStorage.getItem("userName") === null){
            this.router.navigate(['registration']);
            return;
        }
        this.socket = io();

        this.socket.emit('connectedToChat', sessionStorage.getItem("userName"));
        this.socket.on('chatUpdate', function(data) {
            this.conversation.push(data);
            this.autoScroll(this.container.nativeElement);
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

    autoScroll(element) {
        setTimeout(function () {
            element.scrollTop = element.scrollHeight;
        }, 10);
    }
}