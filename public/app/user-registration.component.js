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
var user_service_1 = require('./user.service');
var UserRegistrationComponent = (function () {
    function UserRegistrationComponent(router, userService) {
        this.router = router;
        this.userService = userService;
        this.userName = '';
        this.socket = null;
    }
    UserRegistrationComponent.prototype.ngOnInit = function () {
        this.socket = io();
    };
    UserRegistrationComponent.prototype.login = function () {
        var _this = this;
        //prevent empty user name
        this.userName = this.userName.trim();
        if (this.userName !== null) {
            if (this.userName == '') {
                alert('Username cannot be empty.');
                return;
            }
            //store user name in session
            sessionStorage.setItem('userName', this.userName);
            //add new user, store uid in session, then go to chat
            this.userService.add(this.userName)
                .then(function (user) {
                sessionStorage.setItem('uid', user._id);
                _this.router.navigate(['chat']);
            });
        }
    };
    //enter key binding
    UserRegistrationComponent.prototype.keypressHandler = function (event) {
        if (event.keyCode === 13) {
            this.login();
        }
    };
    UserRegistrationComponent = __decorate([
        core_1.Component({
            selector: 'user-registration',
            templateUrl: 'templates/user-registration.component.html',
            styleUrls: ['templates/user-registration.component.css'],
            providers: [user_service_1.UserService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, user_service_1.UserService])
    ], UserRegistrationComponent);
    return UserRegistrationComponent;
}());
exports.UserRegistrationComponent = UserRegistrationComponent;
//# sourceMappingURL=user-registration.component.js.map