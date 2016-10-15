import { Component, OnInit } from '@angular/core';

import * as io from 'socket.io';

import { Player } from './player';
import { PlayerService } from './player.service';
 
@Component({
    selector: 'tic-tac-toe',
    templateUrl: 'templates/tictactoe.component.html',
    styleUrls: ['templates/tictactoe.component.css'],
    providers: [PlayerService]
})
export class TicTacToeComponent implements OnInit {

	socket = null;

    player: Player = null;
    otherPlayer: Player = null;

    board = [["","",""],
             ["","",""],
             ["","",""]];

    waiting = true;
    inProgress = true;

    constructor( private playerService: PlayerService){}

	ngOnInit() {
        this.socket = io();

        this.socket.on('processGameTurn', function(mark, coord) {
            this.board[coord[1]][coord[0]] = mark;
            if (this.player) { this.switchActive(); }
            if (this.boardFull()) { this.inProgress = false; }
        }.bind(this));

        this.socket.on('resetGame', this.resetGame.bind(this));

        this.socket.on('startGame', this.startGame.bind(this));

        this.socket.on('addPlayer', function(uid){
            var _self = this
            this.getPlayers(function(players){
                if (players[0].uid != "" && players[1].uid != "") { 
                    if (!_self.player) { alert("game is full"); } 
                    return; 
                }
                for (let p of players) {
                    if (p.uid == "" && !_self.player) {
                        _self.playerService.updateByMark(p.mark, {uid: sessionStorage.getItem('uid')})
                            .then(() => {
                                _self.socket.emit('emitStartReq');
                            });
                        return;
                    }
                }
            });
        }.bind(this));
    }

    placeMark(x,y) {
        if (this.waiting) {
            alert("Please wait for your turn.");
            return;
        }
        if (this.board[y][x] != '') {
            alert("That squre is not empty.");
            return;
        }
        this.socket.emit('placeMark', this.player.mark, [x,y]);
    }

    boardFull() {
        for (let row of this.board) {
            for (let box of row) {
                if (box == '') { return false; }
            }
        }
        return true;
    }

    emitReset() {
        this.socket.emit('emitReset');
    }

    resetGame() {
        this.board = [["","",""],
                     ["","",""],
                     ["","",""]];
        this.inProgress = true;
    }

    startGame() {
        var _self = this
        this.getPlayers(function(){
            if (_self.player && _self.otherPlayer && _self.player.active) {
                _self.waiting = false;
            }
        });
    }

    switchActive() {
        this.playerService.updateByUid(this.player.uid, {active: !this.player.active})
                .then(() => {
                     this.player.active = !this.player.active;
                     this.otherPlayer.active = !this.otherPlayer.active;
                     this.player.active ? this.waiting = false : this.waiting = true;
                });
    }

    getPlayers(callback) {
        this.playerService.getPlayers().then(players => {
            for (let player of players) {
                if (player.uid == '') { break; }
                if (player.uid == sessionStorage.getItem('uid') ) {
                    this.player = player;
                }
                else if ( player.uid != sessionStorage.getItem('uid') ) {
                    this.otherPlayer = player;
                }
            }
            callback(players);
        });
    }
}