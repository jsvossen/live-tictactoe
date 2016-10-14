import { Component, OnInit } from '@angular/core';

import * as io from 'socket.io';

// import { User } from './user';
// import { UserService } from './user.service';
 
@Component({
    selector: 'tic-tac-toe',
    templateUrl: 'templates/tictactoe.component.html',
    styleUrls: ['templates/tictactoe.component.css']
})
export class TicTacToeComponent implements OnInit {

	socket = null;

    board = [["","",""],
             ["","",""],
             ["","",""]];

    mark = "X";

    waiting = false;

    inProgress = true;

	//constructor(private userService: UserService) { }

	ngOnInit() {
        this.socket = io();

        this.socket.on('processGameTurn', function(mark, coord) {
            this.board[coord[1]][coord[0]] = mark;
            if (this.boardFull()) { this.inProgress = false; }
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

    resetGame() {
        this.board = [["","",""],
                     ["","",""],
                     ["","",""]];
        this.inProgress = true;
    }

}