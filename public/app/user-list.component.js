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
var io = require('socket.io');
var user_service_1 = require('./user.service');
var UserListComponent = (function () {
    function UserListComponent(userService) {
        this.userService = userService;
        this.socket = null;
        this.init = false;
    }
    UserListComponent.prototype.ngOnInit = function () {
        if (sessionStorage.getItem("userName") === null) {
            return;
        }
        this.socket = io();
        this.socket.on('updateUserList', function (data) {
            this.userService.addUser({ 'id': 'test', 'name': data });
        }.bind(this));
        this.getUsers();
    };
    UserListComponent.prototype.getUsers = function () {
        this.users = this.userService.getUsers();
    };
    UserListComponent = __decorate([
        core_1.Component({
            selector: 'user-list',
            templateUrl: 'templates/user-list.component.html',
            providers: [user_service_1.UserService]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService])
    ], UserListComponent);
    return UserListComponent;
}());
exports.UserListComponent = UserListComponent;
//# sourceMappingURL=user-list.component.js.map