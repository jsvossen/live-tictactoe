"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var io = require('socket.io');
var ChatComponent = (function () {
    function ChatComponent(router) {
        this.router = router;
        this.message = '';
        this.conversation = [];
        this.socket = null;
    }
    ChatComponent.prototype.ngOnInit = function () {
        if (sessionStorage.getItem("userName") === null) {
            this.router.navigate(['registration']);
            return;
        }
        this.socket = io();
        this.socket.emit('connectedToChat', sessionStorage.getItem("userName"));
        this.socket.on('chatUpdate', function (data) {
            this.conversation.push(data);
            this.autoScroll(this.container.nativeElement);
        }.bind(this));
    };
    ChatComponent.prototype.send = function () {
        this.socket.emit('newMessage', {
            'userName': sessionStorage.getItem("userName"),
            'text': this.message
        });
        this.message = '';
    };
    ChatComponent.prototype.keypressHandler = function (event) {
        if (event.keyCode === 13) {
            this.send();
        }
    };
    ChatComponent.prototype.isNewUserAlert = function (data) {
        return data.userName === '';
    };
    ChatComponent.prototype.autoScroll = function (element) {
        setTimeout(function () {
            element.scrollTop = element.scrollHeight;
        }, 10);
    };
    __decorate([
        core_1.ViewChild('container'), 
        __metadata('design:type', Object)
    ], ChatComponent.prototype, "container", void 0);
    ChatComponent = __decorate([
        core_1.Component({
            selector: 'chat',
            templateUrl: 'templates/chat.component.html',
            styleUrls: ['templates/chat.compontent.css'],
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map