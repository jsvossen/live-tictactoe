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

    //chat window element
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

        //new user event
        this.socket.emit('connectedToChat', {'id':sessionStorage.getItem("uid"),'name':sessionStorage.getItem("userName")});
        
        //update chat listener
        this.socket.on('chatUpdate', function(data) {
            this.conversation.push(data);
            this.autoScroll(this.container.nativeElement);
        }.bind(this));
    }
 
    //send chat message
    send() {
        this.socket.emit('newMessage', {
            'userName': sessionStorage.getItem("userName"),
            'text': this.message
        });
        this.message = '';
    }
 
    //enter key binding
    keypressHandler(event) {
        if (event.keyCode === 13){
            this.send();
        }
    } 
 
    //system messages
    isNewUserAlert(data){
        return data.userName === '';
    }

    //scroll chat window 
    autoScroll(element) {
        setTimeout(function () {
            element.scrollTop = element.scrollHeight;
        }, 10);
    }
}