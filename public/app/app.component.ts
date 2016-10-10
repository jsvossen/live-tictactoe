import { Component } from '@angular/core';
import * as io from 'socket.io';
//import { Router }	 from '@angular/router';

@Component({
  selector: 'my-app',
  template: '<h1>My SECOND Angular App</h1>'
})
export class AppComponent { 
	socket = null;

	//constructor(private router: Router){}

	ngOnInit() {
       this.socket = io();
       this.socket.emit('alert','Hello from Angular!');
    }
}
