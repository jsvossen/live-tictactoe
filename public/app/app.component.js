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
var AppComponent = (function () {
    function AppComponent(userService) {
        this.userService = userService;
        this.socket = null;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.socket = io();
        this.socket.on('deleteUser', function (uid) {
            this.userService.delete(uid);
        }.bind(this));
    };
    AppComponent.prototype.deleteUser = function () {
        this.userService.delete(sessionStorage.getItem("uid"));
    };
    __decorate([
        core_1.HostListener('window:beforeunload'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], AppComponent.prototype, "deleteUser", null);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: '<router-outlet></router-outlet>',
            providers: [user_service_1.UserService]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map