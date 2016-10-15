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
    players: Player[];
    player: Player;

    board = [["","",""],
             ["","",""],
             ["","",""]];

    mark = "";

    waiting = true;

    inProgress = true;

    constructor( private playerService: PlayerService){}

	ngOnInit() {
        this.socket = io();

        this.socket.on('processGameTurn', function(mark, coord) {
            this.board[coord[1]][coord[0]] = mark;
            if (this.boardFull()) { this.inProgress = false; }
        }.bind(this));

        this.socket.on('resetGame', this.resetGame.bind(this));

        this.socket.on('addPlayer', function(uid){
            this.playerService.getPlayers().then(players => {
                for (let player of players) {
                    if (player.uid == sessionStorage.getItem('uid')) { return; }
                    if (player.uid == "") {
                        this.playerService.updateByMark({mark: player.mark, uid: sessionStorage.getItem('uid')})
                            .then((data) => {
                                this.player = data.player
                                this.mark = data.player.mark;
                                this.startGame();
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
        this.socket.emit('placeMark', this.mark, [x,y]);
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
        this.playerService.getPlayers().then(players => {
            this.players = players;
            if (this.players[0].uid != "" && this.players[1].uid != "" && this.player.active) {
            this.waiting = false;
            return;
        }
        });
    }

    getPlayers() {
        this.playerService.getPlayers().then(players => {
            this.players = players;
        });
    }
}