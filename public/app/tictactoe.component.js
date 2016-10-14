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
// import { User } from './user';
// import { UserService } from './user.service';
var TicTacToeComponent = (function () {
    function TicTacToeComponent() {
        this.socket = null;
        this.board = [["x", "x", "x"],
            ["x", "x", "x"],
            ["x", "x", "x"]];
        this.mark = "X";
        this.waiting = false;
        this.inProgress = true;
    }
    //constructor(private userService: UserService) { }
    TicTacToeComponent.prototype.ngOnInit = function () {
        this.socket = io();
        this.socket.on('processGameTurn', function (mark, coord) {
            this.board[coord[1]][coord[0]] = mark;
            if (this.boardFull()) {
                this.inProgress = false;
            }
        }.bind(this));
        this.socket.on('resetGame', this.resetGame.bind(this));
    };
    TicTacToeComponent.prototype.placeMark = function (x, y) {
        if (this.waiting) {
            alert("Please wait for your turn.");
            return;
        }
        if (this.board[y][x] != '') {
            alert("That squre is not empty.");
            return;
        }
        this.socket.emit('placeMark', this.mark, [x, y]);
    };
    TicTacToeComponent.prototype.boardFull = function () {
        for (var _i = 0, _a = this.board; _i < _a.length; _i++) {
            var row = _a[_i];
            for (var _b = 0, row_1 = row; _b < row_1.length; _b++) {
                var box = row_1[_b];
                if (box == '') {
                    return false;
                }
            }
        }
        return true;
    };
    TicTacToeComponent.prototype.emitReset = function () {
        this.socket.emit('emitReset');
    };
    TicTacToeComponent.prototype.resetGame = function () {
        this.board = [["", "", ""],
            ["", "", ""],
            ["", "", ""]];
        this.inProgress = true;
    };
    TicTacToeComponent = __decorate([
        core_1.Component({
            selector: 'tic-tac-toe',
            templateUrl: 'templates/tictactoe.component.html',
            styleUrls: ['templates/tictactoe.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], TicTacToeComponent);
    return TicTacToeComponent;
}());
exports.TicTacToeComponent = TicTacToeComponent;
//# sourceMappingURL=tictactoe.component.js.map