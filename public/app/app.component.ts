import { Component } from '@angular/core';
import * as io from 'socket.io';

@Component({
  selector: 'my-app',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent { 
	socket = null;

	ngOnInit() {
       this.socket = io();
       this.socket.emit('alert','Hello from Angular!');
    }
}
