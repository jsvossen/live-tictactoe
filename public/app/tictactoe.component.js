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
var player_service_1 = require('./player.service');
var TicTacToeComponent = (function () {
    function TicTacToeComponent(playerService) {
        this.playerService = playerService;
        this.socket = null;
        this.player = null;
        this.otherPlayer = null;
        this.board = [["", "", ""],
            ["", "", ""],
            ["", "", ""]];
        this.waiting = true;
        this.inProgress = true;
    }
    TicTacToeComponent.prototype.ngOnInit = function () {
        this.socket = io();
        this.socket.on('processGameTurn', function (mark, coord) {
            this.board[coord[1]][coord[0]] = mark;
            if (this.player) {
                this.switchActive();
            }
            if (this.boardFull()) {
                this.inProgress = false;
            }
        }.bind(this));
        this.socket.on('resetGame', this.resetGame.bind(this));
        this.socket.on('startGame', this.startGame.bind(this));
        this.socket.on('addPlayer', function (uid) {
            var _self = this;
            this.getPlayers(function (players) {
                if (players[0].uid != "" && players[1].uid != "") {
                    if (!_self.player) {
                        alert("game is full");
                    }
                    return;
                }
                for (var _i = 0, players_1 = players; _i < players_1.length; _i++) {
                    var p = players_1[_i];
                    if (p.uid == "" && !_self.player) {
                        _self.playerService.updateByMark(p.mark, { uid: sessionStorage.getItem('uid') })
                            .then(function () {
                            _self.socket.emit('emitStartReq');
                        });
                        return;
                    }
                }
            });
        }.bind(this));
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
        this.socket.emit('placeMark', this.player.mark, [x, y]);
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
    TicTacToeComponent.prototype.startGame = function () {
        var _self = this;
        this.getPlayers(function () {
            if (_self.player && _self.otherPlayer && _self.player.active) {
                _self.waiting = false;
            }
        });
    };
    TicTacToeComponent.prototype.switchActive = function () {
        var _this = this;
        this.playerService.updateByUid(this.player.uid, { active: !this.player.active })
            .then(function () {
            _this.player.active = !_this.player.active;
            _this.otherPlayer.active = !_this.otherPlayer.active;
            _this.player.active ? _this.waiting = false : _this.waiting = true;
        });
    };
    TicTacToeComponent.prototype.getPlayers = function (callback) {
        var _this = this;
        this.playerService.getPlayers().then(function (players) {
            for (var _i = 0, players_2 = players; _i < players_2.length; _i++) {
                var player = players_2[_i];
                if (player.uid == '') {
                    break;
                }
                if (player.uid == sessionStorage.getItem('uid')) {
                    _this.player = player;
                }
                else if (player.uid != sessionStorage.getItem('uid')) {
                    _this.otherPlayer = player;
                }
            }
            callback(players);
        });
    };
    TicTacToeComponent = __decorate([
        core_1.Component({
            selector: 'tic-tac-toe',
            templateUrl: 'templates/tictactoe.component.html',
            styleUrls: ['templates/tictactoe.component.css'],
            providers: [player_service_1.PlayerService]
        }), 
        __metadata('design:paramtypes', [player_service_1.PlayerService])
    ], TicTacToeComponent);
    return TicTacToeComponent;
}());
exports.TicTacToeComponent = TicTacToeComponent;
//# sourceMappingURL=tictactoe.component.js.map